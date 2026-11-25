import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser, fail } from "@/lib/api";
import { generateJson, reviewSchema, SYSTEM_BASE, clip } from "@/lib/ai/gemini";
import { assertAllowance, recordUsage } from "@/lib/usage";

export const maxDuration = 120;
const body = z.object({ contractId: z.string().uuid(), playbookId: z.string().uuid().nullable().optional(), perspective: z.string().max(80).optional() });

export async function POST(req: Request) {
  try {
    const { sb, user } = await requireUser();
    const p = body.safeParse(await req.json().catch(() => null));
    if (!p.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const { data: c } = await sb.from("contracts").select("id,title,content").eq("id", p.data.contractId).single();
    if (!c) return NextResponse.json({ error: "Contract not found." }, { status: 404 });

    let rules = "No playbook selected. Use general commercial best practice for the party named as the reviewer's side.";
    if (p.data.playbookId) {
      const { data: pb } = await sb.from("playbooks").select("name,rules").eq("id", p.data.playbookId).single();
      if (pb) rules = `Playbook "${pb.name}". Test the contract against EACH rule and report deviations (set playbook_rule to the rule title):\n${JSON.stringify(pb.rules)}`;
    }
    await assertAllowance(user.id, "review");
    const system = `${SYSTEM_BASE}
Task: review the contract. Reviewer's side: ${p.data.perspective || "the party receiving this paper (customer / counterparty)"}.
${rules}
JSON shape: {"summary":string,"contract_type":string,"risk_score":0-100 (higher = riskier),"findings":[{"clause":string,"quote":string (verbatim from contract),"severity":"high"|"medium"|"low","issue":string,"why_it_matters":string,"suggested_redline":string (replacement wording),"playbook_rule":string|null}],"missing_protections":[string],"key_terms":[{"label":string,"value":string}]}
Order findings from highest to lowest severity. Include renewal, term, fees, liability, indemnity, termination in key_terms when present.`;
    const { data, tokens } = await generateJson(system, `CONTRACT TITLE: ${c.title}\n\nCONTRACT TEXT:\n${clip(c.content)}`, reviewSchema);

    const { data: row, error } = await sb.from("reviews").insert({ user_id: user.id, contract_id: c.id, playbook_id: p.data.playbookId ?? null, result: data }).select("id").single();
    if (error) throw error;
    await sb.from("contracts").update({ status: "reviewed", risk_score: Math.round(data.risk_score) }).eq("id", c.id);
    await recordUsage(user.id, "review", tokens);
    await sb.from("notifications").insert({ user_id: user.id, title: `Review complete: ${c.title}`, body: `${data.findings.length} findings, risk score ${Math.round(data.risk_score)}.` });
    return NextResponse.json({ id: row.id, result: data });
  } catch (e) { return fail(e); }
}

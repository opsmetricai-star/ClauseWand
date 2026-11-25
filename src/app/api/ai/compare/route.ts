import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser, fail } from "@/lib/api";
import { generateJson, compareSchema, SYSTEM_BASE, clip } from "@/lib/ai/gemini";
import { assertAllowance, recordUsage } from "@/lib/usage";

export const maxDuration = 120;
const body = z.object({ contractId: z.string().uuid(), position: z.enum(["customer", "supplier", "neutral"]), industry: z.string().max(80).optional() });

export async function POST(req: Request) {
  try {
    const { sb, user } = await requireUser();
    const p = body.safeParse(await req.json().catch(() => null));
    if (!p.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const { data: c } = await sb.from("contracts").select("id,title,content").eq("id", p.data.contractId).single();
    if (!c) return NextResponse.json({ error: "Contract not found." }, { status: 404 });
    await assertAllowance(user.id, "compare");
    const system = `${SYSTEM_BASE}
Task: benchmark the key clauses of this contract against what is typical in the market for this contract type${p.data.industry ? ` in the ${p.data.industry} sector` : ""}, from the ${p.data.position}'s point of view.
State clearly that benchmarks are the model's general knowledge, not a dataset. Cover liability, indemnity, termination, term/renewal, payment, confidentiality, governing law, IP and data where present; use verdict "missing" when a usual clause is absent.
JSON shape: {"overall":string,"clauses":[{"clause":string,"verdict":"favorable"|"standard"|"aggressive"|"missing","rationale":string,"suggested_alternative":string}]}`;
    const { data, tokens } = await generateJson(system, `CONTRACT TEXT:\n${clip(c.content)}`, compareSchema);
    const { data: row, error } = await sb.from("comparisons").insert({ user_id: user.id, contract_id: c.id, position: p.data.position, result: data }).select("id").single();
    if (error) throw error;
    await recordUsage(user.id, "compare", tokens);
    return NextResponse.json({ id: row.id, result: data });
  } catch (e) { return fail(e); }
}

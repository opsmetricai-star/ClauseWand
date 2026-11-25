import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser, fail } from "@/lib/api";
import { generateJson, askSchema, SYSTEM_BASE, clip } from "@/lib/ai/gemini";
import { assertAllowance, recordUsage } from "@/lib/usage";

export const maxDuration = 60;
const body = z.object({ contractId: z.string().uuid(), question: z.string().min(3).max(1000) });

export async function POST(req: Request) {
  try {
    const { sb, user } = await requireUser();
    const p = body.safeParse(await req.json().catch(() => null));
    if (!p.success) return NextResponse.json({ error: "Ask a question of at least a few characters." }, { status: 400 });
    const { data: c } = await sb.from("contracts").select("id,title,content").eq("id", p.data.contractId).single();
    if (!c) return NextResponse.json({ error: "Contract not found." }, { status: 404 });
    await assertAllowance(user.id, "ask");
    const system = `${SYSTEM_BASE}
Task: answer the user's question using ONLY the contract. If the contract does not address it, set addressed_in_contract=false and say so plainly.
JSON shape: {"answer":string,"confidence":"high"|"medium"|"low","addressed_in_contract":boolean,"citations":[{"clause":string,"quote":string (verbatim)}]}`;
    const { data, tokens } = await generateJson(system, `CONTRACT TEXT:\n${clip(c.content)}\n\nQUESTION: ${p.data.question}`, askSchema);
    const { data: row, error } = await sb.from("qa_messages").insert({ user_id: user.id, contract_id: c.id, question: p.data.question, answer: data }).select("id").single();
    if (error) throw error;
    await recordUsage(user.id, "ask", tokens);
    return NextResponse.json({ id: row.id, answer: data });
  } catch (e) { return fail(e); }
}

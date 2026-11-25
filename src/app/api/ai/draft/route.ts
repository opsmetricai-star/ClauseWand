import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser, fail } from "@/lib/api";
import { generateText, SYSTEM_BASE, clip } from "@/lib/ai/gemini";
import { assertAllowance, recordUsage } from "@/lib/usage";

export const maxDuration = 120;
const body = z.object({
  title: z.string().min(1).max(200),
  instructions: z.string().min(10, "Describe the deal in at least a sentence.").max(6000),
  precedentId: z.string().uuid().nullable().optional(),
  language: z.string().max(40).optional(),
});

export async function POST(req: Request) {
  try {
    const { sb, user } = await requireUser();
    const p = body.safeParse(await req.json().catch(() => null));
    if (!p.success) return NextResponse.json({ error: p.error.issues[0].message }, { status: 400 });
    let precedent = "";
    if (p.data.precedentId) {
      const { data: c } = await sb.from("contracts").select("title,content").eq("id", p.data.precedentId).single();
      if (c) precedent = `\n\nPRECEDENT TO ADAPT ("${c.title}"):\n${clip(c.content)}`;
    }
    await assertAllowance(user.id, "draft");
    const system = `${SYSTEM_BASE}
Task: draft the requested agreement or clause in ${p.data.language || "English"}. Use numbered clauses and consistent defined terms. Where a fact is unknown, insert a bracketed placeholder like [PARTY NAME] rather than inventing it. Output plain text only, no commentary, then end with a short "Drafting notes" section listing assumptions.`;
    const { text, tokens } = await generateText(system, `INSTRUCTIONS:\n${p.data.instructions}${precedent}`);
    const { data: row, error } = await sb.from("drafts").insert({ user_id: user.id, title: p.data.title, instructions: p.data.instructions, content: text }).select("id").single();
    if (error) throw error;
    await recordUsage(user.id, "draft", tokens);
    return NextResponse.json({ id: row.id, content: text });
  } catch (e) { return fail(e); }
}

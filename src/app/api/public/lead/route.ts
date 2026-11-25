import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdmin } from "@/lib/supabase/server";

const schema = z.object({
  kind: z.enum(["newsletter", "demo", "contact", "acm_access"]),
  email: z.string().email().max(200),
  name: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
  role: z.string().max(200).optional(),
  message: z.string().max(4000).optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  try {
    const { error } = await createAdmin().from("leads").insert(parsed.data);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("lead insert failed", e);
    return NextResponse.json({ error: "We could not save your request right now. Please email us instead." }, { status: 503 });
  }
}

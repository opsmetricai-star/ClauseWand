import { NextResponse } from "next/server";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { AiError } from "@/lib/ai/gemini";

export async function requireUser() {
  if (!supabaseConfigured()) throw Object.assign(new Error("The backend is not configured."), { status: 503 });
  const sb = await createClient();
  const { data } = await sb.auth.getUser();
  if (!data.user) throw Object.assign(new Error("Please log in."), { status: 401 });
  return { sb, user: data.user };
}

export function fail(e: unknown) {
  const status = e instanceof AiError ? e.status : (e as { status?: number })?.status ?? 500;
  const message = e instanceof Error ? e.message : "Unexpected error";
  if (status >= 500 && !(e instanceof AiError)) console.error(e);
  return NextResponse.json({ error: status >= 500 && !(e instanceof AiError) && status !== 503 ? "Something went wrong." : message }, { status });
}

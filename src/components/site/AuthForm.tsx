"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup" | "forgot" | "reset";
const COPY: Record<Mode, { t: string; b: string }> = {
  login: { t: "Welcome back", b: "Log in" }, signup: { t: "Create your account", b: "Create account" },
  forgot: { t: "Reset your password", b: "Send reset link" }, reset: { t: "Choose a new password", b: "Update password" },
};

export default function AuthForm({ mode, configured }: { mode: Mode; configured: boolean }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(sp.get("error") === "not_configured" ? "Authentication is not configured yet. Add the Supabase environment variables." : "");
  const [ok, setOk] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setOk("");
    if (!configured) return setErr("Authentication is not configured yet. Add the Supabase environment variables.");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? ""); const password = String(fd.get("password") ?? "");
    const sb = createClient(); setBusy(true);
    const origin = window.location.origin;
    try {
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(sp.get("next") || "/app"); router.refresh();
      } else if (mode === "signup") {
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: fd.get("name") }, emailRedirectTo: `${origin}/auth/callback?next=/app` } });
        if (error) throw error;
        if (data.session) { router.push("/app"); router.refresh(); } else setOk("Check your email to confirm your account, then log in.");
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
        if (error) throw error; setOk("If that email exists, a reset link is on its way.");
      } else {
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error; router.push("/app");
      }
    } catch (x) { setErr(x instanceof Error ? x.message : "Something went wrong."); }
    finally { setBusy(false); }
  }

  const c = COPY[mode];
  return (
    <form onSubmit={submit} className="w-full max-w-[420px] space-y-4 rounded bg-white p-8 text-ink shadow-2xl">
      <h1 className="h-display t-3">{c.t}</h1>
      {mode === "signup" && <div><label className="lbl">Full name</label><input name="name" className="field" required autoComplete="name" /></div>}
      {mode !== "reset" && <div><label className="lbl">Work email</label><input name="email" type="email" className="field" required autoComplete="email" /></div>}
      {mode !== "forgot" && <div><label className="lbl">{mode === "reset" ? "New password" : "Password"}</label><input name="password" type="password" className="field" required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} /></div>}
      <button className="btn btn-dark w-full" disabled={busy}>{busy ? "Please wait…" : c.b}</button>
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      {ok && <p role="status" className="text-sm text-emerald-700">{ok}</p>}
      <div className="flex justify-between text-sm text-muted">
        {mode === "login" && <><Link href="/forgot-password" className="underline">Forgot password?</Link><Link href="/signup" className="underline">Create account</Link></>}
        {mode === "signup" && <Link href="/login" className="underline">Already have an account? Log in</Link>}
        {mode === "forgot" && <Link href="/login" className="underline">Back to login</Link>}
      </div>
    </form>
  );
}

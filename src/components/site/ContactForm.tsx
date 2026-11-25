"use client";
import { useState } from "react";

export function ContactForm({ kind = "contact", button = "Send message" }: { kind?: "contact" | "acm_access"; button?: string }) {
  const [s, setS] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = e.currentTarget; const fd = new FormData(f); setS("busy");
    const r = await fetch("/api/public/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, ...Object.fromEntries(fd) }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok) { setS("ok"); f.reset(); } else { setS("err"); setErr(j.error ?? "Could not send."); }
  }
  if (s === "ok") return <div className="rounded border border-line p-10"><h3 className="h-display t-3">Message received.</h3><p className="mt-2 text-muted">Thank you. We will reply shortly.</p></div>;
  return (
    <form onSubmit={submit} className="space-y-4 rounded border border-line p-8">
      <div className="grid gap-4 sm:grid-cols-2"><div><label className="lbl">Name</label><input name="name" className="field" required /></div><div><label className="lbl">Work email</label><input type="email" name="email" className="field" required /></div></div>
      <div><label className="lbl">Company</label><input name="company" className="field" /></div>
      <div><label className="lbl">How can we help?</label><textarea name="message" rows={5} className="field" /></div>
      <button className="btn btn-dark" disabled={s === "busy"}>{s === "busy" ? "Sending…" : button}</button>
      {s === "err" && <p role="alert" className="text-sm text-red-600">{err}</p>}
    </form>
  );
}

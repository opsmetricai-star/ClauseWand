"use client";
import { useState } from "react";

export default function Newsletter() {
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("busy");
    const r = await fetch("/api/public/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "newsletter", email: fd.get("email") }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok) { setState("ok"); setMsg("You are subscribed. Watch your inbox."); (e.target as HTMLFormElement).reset(); }
    else { setState("err"); setMsg(j.error ?? "Something went wrong."); }
  }
  return (
    <section className="mode-light-accent py-20">
      <div className="container-x grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <span className="eyebrow">The Wand Letter</span>
          <h2 className="h-display t-2 mt-4">The morning paper for lawyers who love AI</h2>
          <p className="mt-4 max-w-[480px] text-muted">Legal AI news, playbook ideas and negotiation tactics, straight to your inbox. One short email, no spam.</p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <input name="email" type="email" required placeholder="you@firm.com" className="field flex-1" aria-label="Email" />
          <button className="btn btn-dark" disabled={state === "busy"}>{state === "busy" ? "Subscribing…" : "Subscribe for free"}</button>
          {state !== "idle" && state !== "busy" && <p className={`text-sm sm:absolute sm:mt-14 ${state === "ok" ? "text-emerald-700" : "text-red-600"}`} role="status">{msg}</p>}
        </form>
      </div>
    </section>
  );
}

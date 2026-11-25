"use client";
import { useActionState, useState } from "react";
import { Plus, Trash2, Copy, Save } from "lucide-react";
import { savePlaybook, saveClause, saveProfile, adminActivate } from "@/app/app/actions";

type Rule = { title: string; preferred: string; fallback: string; escalate: string };
type State = { error?: string; ok?: boolean | string } | null;
const Msg = ({ s }: { s: State }) => s?.error ? <p role="alert" className="text-sm text-red-600">{s.error}</p> : s?.ok ? <p role="status" className="text-sm text-emerald-700">{typeof s.ok === "string" ? s.ok : "Saved."}</p> : null;

export function PlaybookEditor({ initial }: { initial?: { id: string; name: string; description: string | null; rules: Rule[] } }) {
  const [state, action, pending] = useActionState(savePlaybook, null as State);
  const [rules, setRules] = useState<Rule[]>(initial?.rules?.length ? initial.rules : [{ title: "", preferred: "", fallback: "", escalate: "" }]);
  const set = (i: number, k: keyof Rule, v: string) => setRules(rules.map((r, n) => (n === i ? { ...r, [k]: v } : r)));
  return (
    <form action={action} className="card space-y-4 p-6">
      {initial && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="rules" value={JSON.stringify(rules.filter((r) => r.title.trim()))} />
      <div className="grid gap-4 md:grid-cols-2"><div><label className="lbl">Playbook name</label><input name="name" className="field" defaultValue={initial?.name} required placeholder="Vendor MSA — buyer side" /></div><div><label className="lbl">Description</label><input name="description" className="field" defaultValue={initial?.description ?? ""} /></div></div>
      {rules.map((r, i) => (
        <div key={i} className="space-y-3 rounded border border-line bg-accent-light p-4">
          <div className="flex gap-2"><input className="field" placeholder="Rule title, e.g. Limitation of liability" value={r.title} onChange={(e) => set(i, "title", e.target.value)} />
            <button type="button" aria-label="Remove rule" className="btn btn-ghost btn-sm" onClick={() => setRules(rules.filter((_, n) => n !== i))}><Trash2 size={16} /></button></div>
          <div className="grid gap-3 md:grid-cols-3">
            <textarea className="field" rows={3} placeholder="Preferred position" value={r.preferred} onChange={(e) => set(i, "preferred", e.target.value)} />
            <textarea className="field" rows={3} placeholder="Acceptable fallback" value={r.fallback} onChange={(e) => set(i, "fallback", e.target.value)} />
            <textarea className="field" rows={3} placeholder="Escalate when…" value={r.escalate} onChange={(e) => set(i, "escalate", e.target.value)} />
          </div>
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRules([...rules, { title: "", preferred: "", fallback: "", escalate: "" }])}><Plus size={16} /> Add rule</button>
        <button className="btn btn-dark btn-sm" disabled={pending}><Save size={16} /> {pending ? "Saving…" : "Save playbook"}</button><Msg s={state} />
      </div>
    </form>
  );
}

export function ClauseForm() {
  const [s, a, p] = useActionState(saveClause, null as State);
  return (
    <form action={a} className="card space-y-3 p-6">
      <div className="grid gap-3 md:grid-cols-2"><input name="title" className="field" placeholder="Clause title" required /><input name="contract_type" className="field" placeholder="Contract type (optional)" /></div>
      <textarea name="body" rows={5} className="field" placeholder="Approved clause text" required />
      <div className="flex items-center gap-3"><button className="btn btn-dark btn-sm" disabled={p}>{p ? "Saving…" : "Save clause"}</button><Msg s={s} /></div>
    </form>
  );
}

export function ProfileForm({ name, org, email }: { name: string; org: string; email: string }) {
  const [s, a, p] = useActionState(saveProfile, null as State);
  return (
    <form action={a} className="card max-w-[560px] space-y-4 p-6">
      <div><label className="lbl">Email</label><input className="field bg-accent-light" value={email} disabled /></div>
      <div><label className="lbl">Full name</label><input name="full_name" className="field" defaultValue={name} /></div>
      <div><label className="lbl">Organisation</label><input name="organization" className="field" defaultValue={org} /></div>
      <div className="flex items-center gap-3"><button className="btn btn-dark btn-sm" disabled={p}>{p ? "Saving…" : "Save changes"}</button><Msg s={s} /></div>
    </form>
  );
}

export function AdminForm() {
  const [s, a, p] = useActionState(adminActivate, null as State);
  return (
    <form action={a} className="card flex max-w-[640px] flex-wrap items-end gap-3 p-6">
      <div className="min-w-[220px] flex-1"><label className="lbl">Customer email</label><input name="email" type="email" className="field" required /></div>
      <div><label className="lbl">Plan</label><select name="plan" className="field"><option value="solo">Solo</option><option value="team">Team</option><option value="firm">Firm</option><option value="free">Free (downgrade)</option></select></div>
      <button className="btn btn-dark" disabled={p}>{p ? "Applying…" : "Set plan"}</button><div className="w-full"><Msg s={s} /></div>
    </form>
  );
}

export function DraftStudio({ precedents }: { precedents: { id: string; title: string }[] }) {
  const [busy, setBusy] = useState(false); const [err, setErr] = useState(""); const [out, setOut] = useState(""); const [copied, setCopied] = useState(false);
  async function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const fd = new FormData(e.currentTarget); setBusy(true); setErr("");
    const r = await fetch("/api/ai/draft", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: fd.get("title"), instructions: fd.get("instructions"), precedentId: fd.get("precedentId") || null, language: fd.get("language") || undefined }) });
    const j = await r.json().catch(() => ({})); setBusy(false);
    if (r.ok) setOut(j.content); else setErr(j.error ?? "Drafting failed.");
  }
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <form onSubmit={go} className="card space-y-4 p-6">
        <div><label className="lbl">Title</label><input name="title" className="field" required placeholder="Mutual NDA — Acme / Globex" /></div>
        <div><label className="lbl">Describe the deal</label><textarea name="instructions" rows={7} className="field" required placeholder="Parties, term, governing law, key commercial terms, must-have protections…" /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div><label className="lbl">Base on a precedent</label><select name="precedentId" className="field"><option value="">From scratch</option>{precedents.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select></div>
          <div><label className="lbl">Language</label><input name="language" className="field" placeholder="English" /></div>
        </div>
        <button className="btn btn-dark" disabled={busy}>{busy ? "Drafting…" : "Generate draft"}</button>
        {err && <p role="alert" className="text-sm text-red-600">{err} {err.includes("Upgrade") && <a href="/app/billing" className="underline">See plans</a>}</p>}
      </form>
      <div className="card p-6">
        <div className="mb-3 flex items-center justify-between"><h2 className="font-serif text-[24px]">Draft</h2>{out && <button className="btn btn-ghost btn-sm" onClick={() => { navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); }}><Copy size={14} /> {copied ? "Copied" : "Copy"}</button>}</div>
        {out ? <pre className="max-h-[640px] overflow-auto whitespace-pre-wrap font-sans text-[14px] leading-relaxed">{out}</pre> : <p className="text-muted">Your draft will appear here and is saved to your account.</p>}
      </div>
    </div>
  );
}

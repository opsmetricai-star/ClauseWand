"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReviewView, AnswerView, CompareView, Panel } from "./Views";
import type { Review, Answer, Comparison } from "@/lib/ai/gemini";

type PB = { id: string; name: string };
type QA = { id: string; question: string; answer: Answer };

async function post<T>(url: string, body: unknown): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  return r.ok ? { ok: true, data: j } : { ok: false, error: j.error ?? "Request failed." };
}

export default function ContractTools({ contractId, playbooks, review, qa, comparison }: { contractId: string; playbooks: PB[]; review: Review | null; qa: QA[]; comparison: Comparison | null }) {
  const router = useRouter();
  const [tab, setTab] = useState<"review" | "ask" | "compare">("review");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [pb, setPb] = useState("");
  const [rev, setRev] = useState(review);
  const [cmp, setCmp] = useState(comparison);
  const [list, setList] = useState(qa);
  const [q, setQ] = useState("");
  const [pos, setPos] = useState<"customer" | "supplier" | "neutral">("customer");

  async function run<T>(fn: () => Promise<{ ok: true; data: T } | { ok: false; error: string }>, ok: (d: T) => void) {
    setBusy(true); setErr(""); const r = await fn(); setBusy(false);
    if (r.ok) { ok(r.data); router.refresh(); } else setErr(r.error);
  }

  return (
    <div>
      <div className="mb-5 flex gap-2">{(["review", "ask", "compare"] as const).map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-[14px] capitalize ${tab === t ? "bg-ink text-white" : "border border-line bg-white"}`}>{t}</button>)}</div>
      {err && <div role="alert" className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}{err.includes("Upgrade") && <> <a className="underline" href="/app/billing">See plans</a></>}</div>}

      {tab === "review" && (
        <div className="space-y-5">
          <Panel className="flex flex-wrap items-end gap-3">
            <div className="min-w-[220px] flex-1"><label className="lbl">Playbook</label><select className="field" value={pb} onChange={(e) => setPb(e.target.value)}><option value="">No playbook (general best practice)</option>{playbooks.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
            <button className="btn btn-dark" disabled={busy} onClick={() => run<{ result: Review }>(() => post("/api/ai/review", { contractId, playbookId: pb || null }), (d) => setRev(d.result))}>{busy ? "Reviewing… (up to a minute)" : rev ? "Run review again" : "Run review"}</button>
          </Panel>
          {rev ? <ReviewView r={rev} /> : <p className="text-muted">No review yet. Choose a playbook and run one.</p>}
        </div>
      )}

      {tab === "ask" && (
        <div className="space-y-4">
          <Panel>
            <form onSubmit={(e) => { e.preventDefault(); if (q.trim().length < 3) return; run<{ id: string; answer: Answer }>(() => post("/api/ai/ask", { contractId, question: q }), (d) => { setList([{ id: d.id, question: q, answer: d.answer }, ...list]); setQ(""); }); }} className="flex gap-3">
              <input className="field" placeholder="e.g. Can they terminate for convenience?" value={q} onChange={(e) => setQ(e.target.value)} />
              <button className="btn btn-dark" disabled={busy}>{busy ? "Thinking…" : "Ask"}</button>
            </form>
          </Panel>
          {list.map((m) => <Panel key={m.id}><p className="mb-3 font-medium">{m.question}</p><AnswerView a={m.answer} /></Panel>)}
          {list.length === 0 && <p className="text-muted">Ask anything about this contract.</p>}
        </div>
      )}

      {tab === "compare" && (
        <div className="space-y-5">
          <Panel className="flex flex-wrap items-end gap-3">
            <div><label className="lbl">Your position</label><select className="field" value={pos} onChange={(e) => setPos(e.target.value as typeof pos)}><option value="customer">Customer / buyer</option><option value="supplier">Supplier / seller</option><option value="neutral">Neutral</option></select></div>
            <button className="btn btn-dark" disabled={busy} onClick={() => run<{ result: Comparison }>(() => post("/api/ai/compare", { contractId, position: pos }), (d) => setCmp(d.result))}>{busy ? "Benchmarking…" : cmp ? "Run again" : "Compare to market"}</button>
          </Panel>
          {cmp ? <Panel><CompareView c={cmp} /></Panel> : <p className="text-muted">No comparison yet.</p>}
        </div>
      )}
    </div>
  );
}

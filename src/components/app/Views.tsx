import type { Review, Answer, Comparison } from "@/lib/ai/gemini";

export function Title({ t, sub, children }: { t: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="h-display text-[40px]">{t}</h1>{sub && <p className="mt-1 text-muted">{sub}</p>}</div>{children}
    </div>
  );
}
export const Panel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`card p-6 ${className}`}>{children}</div>;

const SEV = { high: "bg-red-100 text-red-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" } as const;

export function ReviewView({ r }: { r: Review }) {
  const score = Math.round(r.risk_score);
  return (
    <div className="space-y-5">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-[720px]"><div className="text-[13px] text-muted">{r.contract_type}</div><p className="mt-1 text-[17px]">{r.summary}</p></div>
          <div className="text-center"><div className={`font-serif text-[52px] leading-none ${score > 66 ? "text-red-600" : score > 33 ? "text-amber-600" : "text-emerald-600"}`}>{score}</div><div className="text-[12px] text-muted">risk score</div></div>
        </div>
        {r.key_terms.length > 0 && <dl className="mt-5 grid gap-3 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-3">{r.key_terms.map((k) => <div key={k.label}><dt className="text-[12px] uppercase tracking-wider text-muted">{k.label}</dt><dd className="text-[15px]">{k.value}</dd></div>)}</dl>}
      </Panel>
      <h2 className="font-serif text-[26px]">{r.findings.length} findings</h2>
      {r.findings.map((f, i) => (
        <Panel key={i}>
          <div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${SEV[f.severity]}`}>{f.severity}</span><h3 className="font-medium">{f.clause}</h3>{f.playbook_rule && <span className="rounded-full bg-ink px-2.5 py-0.5 text-[12px] text-white">Playbook: {f.playbook_rule}</span>}</div>
          <blockquote className="mt-3 border-l-2 border-line pl-3 text-[14px] italic text-muted">“{f.quote}”</blockquote>
          <p className="mt-3"><b>Issue.</b> {f.issue}</p>
          <p className="mt-1 text-muted"><b className="text-ink">Why it matters.</b> {f.why_it_matters}</p>
          <div className="mt-3 rounded bg-accent-light p-3 text-[14px]"><b>Suggested redline.</b> {f.suggested_redline}</div>
        </Panel>
      ))}
      {r.missing_protections.length > 0 && <Panel><h3 className="font-serif text-[22px]">Missing protections</h3><ul className="mt-2 list-disc space-y-1 pl-5">{r.missing_protections.map((m) => <li key={m}>{m}</li>)}</ul></Panel>}
    </div>
  );
}

export function AnswerView({ a }: { a: Answer }) {
  return (
    <div className="space-y-3">
      <p className="text-[16px]">{a.answer}</p>
      <div className="flex gap-2 text-[12px]"><span className="rounded-full bg-accent-light px-2.5 py-0.5">confidence: {a.confidence}</span>{!a.addressed_in_contract && <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-800">not addressed in contract</span>}</div>
      {a.citations.map((c, i) => <blockquote key={i} className="border-l-2 border-line pl-3 text-[14px] text-muted"><b className="not-italic text-ink">{c.clause}</b> “{c.quote}”</blockquote>)}
    </div>
  );
}

const VERDICT = { favourable: "bg-emerald-100 text-emerald-800", standard: "bg-sky-100 text-sky-800", aggressive: "bg-red-100 text-red-800", missing: "bg-amber-100 text-amber-800" } as const;
export function CompareView({ c }: { c: Comparison }) {
  return (
    <div className="space-y-3">
      <p>{c.overall}</p>
      <p className="text-[12px] text-muted">Benchmarks reflect the AI model’s general knowledge of market practice, not a licensed dataset. Verify before relying on them.</p>
      {c.clauses.map((x, i) => (
        <div key={i} className="rounded border border-line p-4"><div className="flex items-center gap-2"><span className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${VERDICT[x.verdict]}`}>{x.verdict}</span><b>{x.clause}</b></div><p className="mt-2 text-muted">{x.rationale}</p><p className="mt-2 rounded bg-accent-light p-3 text-[14px]"><b>Alternative.</b> {x.suggested_alternative}</p></div>
      ))}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const TABS = [
  { k: "Intake", d: "Contracts are pulled in automatically from email and Slack with a full first-pass review run against your standards", items: ["Vendor MSA received from procurement@", "Classified as: Master Services Agreement", "First-pass review queued"] },
  { k: "Draft", d: "Generate agreements from your own precedents with deal terms filled in and defined terms kept consistent", items: ["Precedent: Mutual NDA v4", "Parties and term inserted", "Draft ready for your edits"] },
  { k: "Review", d: "Every clause is checked against your playbook, with severity, reasoning and suggested replacement language", items: ["12 clauses checked", "3 deviations found", "2 redlines ready to accept"] },
  { k: "Playbooks", d: "One set of rules, applied on every contract by everyone, with fallbacks and escalation guidance", items: ["Liability: mutual cap, 12 months", "Fallback: 24 months", "Escalate: uncapped IP indemnity"] },
  { k: "Repository", d: "Every reviewed contract is filed, searchable and ready to answer questions about itself", items: ["Searchable by clause and risk", "Renewal dates extracted", "Ask any contract a question"] },
];

export function AcmTabs() {
  const [i, setI] = useState(0);
  const [prog, setProg] = useState(0);
  useEffect(() => {
    setProg(0);
    const id = setInterval(() => setProg((p) => { if (p >= 100) { setI((x) => (x + 1) % TABS.length); return 0; } return p + 2; }), 100);
    return () => clearInterval(id);
  }, [i]);
  const t = TABS[i];
  return (
    <div className="mt-12 grid items-stretch overflow-hidden rounded border border-line bg-white md:grid-cols-2">
      <div className="flex flex-col justify-between p-8">
        <div>
          <div className="text-[14px] text-muted">{t.k}</div>
          <p className="mt-3 max-w-[420px] text-[22px] leading-snug">{t.d}</p>
          <Link href="/acm" className="btn btn-dark btn-sm mt-8">Learn about ACM</Link>
        </div>
        <div className="mt-10">
          <div className="mb-3 flex flex-wrap gap-2">
            {TABS.map((x, n) => (
              <button key={x.k} onClick={() => setI(n)} className={`rounded-full px-3.5 py-1.5 text-[14px] ${n === i ? "bg-ink text-white" : "border border-line hover:bg-accent-light"}`}>{x.k}</button>
            ))}
          </div>
          <div className="h-[2px] w-full bg-line"><div className="h-full bg-ink transition-[width] duration-100 ease-linear" style={{ width: `${prog}%` }} /></div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-sky-200 to-teal-100 p-8">
        <div className="rounded bg-white/90 p-5 shadow-lg backdrop-blur">
          <div className="mb-3 text-[12px] uppercase tracking-wider text-muted">{t.k} · live view</div>
          <ul className="space-y-2.5">
            {t.items.map((x) => <li key={x} className="flex items-center justify-between rounded bg-accent-light px-3 py-2.5 text-[14px]">{x}<span className="h-2 w-2 rounded-full bg-emerald-500" /></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}


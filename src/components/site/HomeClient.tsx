"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { STORIES } from "@/lib/content";

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

export function StoryCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * 700, behavior: "smooth" });
  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <h2 className="h-display t-2 max-w-[760px]">Designed for in-house teams and law firms</h2>
        <div className="flex gap-3">
          <button aria-label="Previous" onClick={() => go(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-line hover:bg-accent-light"><ArrowLeft size={18} /></button>
          <button aria-label="Next" onClick={() => go(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-line hover:bg-accent-light"><ArrowRight size={18} /></button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar -mr-[52px] flex snap-x gap-6 overflow-x-auto pr-[52px]">
        {STORIES.map((s) => (
          <Link key={s.slug} href={`/stories/${s.slug}`} className={`group relative flex h-[520px] w-[88vw] flex-none snap-start flex-col justify-between overflow-hidden rounded-sm bg-gradient-to-br ${s.img} p-8 text-white md:w-[calc(50%-12px)] lg:w-[calc(60%-12px)]`}>
            <div className="font-serif text-[28px] tracking-tight">{s.co}</div>
            <div className="max-w-[420px]">
              <p className="text-[24px] font-medium leading-snug">“{s.q}”</p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[14px] backdrop-blur group-hover:bg-white/25"><Play size={14} fill="currentColor" /> Watch Video</span>
            </div>
            <div className="absolute right-8 top-8 text-right"><div className="font-serif text-[56px] leading-none">{s.metric}</div><div className="text-[13px] text-white/80">{s.ml}</div></div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function LeadForm() {
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget; const fd = new FormData(f);
    setState("busy");
    const r = await fetch("/api/public/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "demo", ...Object.fromEntries(fd) }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok) { setState("ok"); f.reset(); } else { setState("err"); setErr(j.error ?? "Could not send. Please try again."); }
  }
  if (state === "ok") return <div className="rounded bg-white p-10 text-ink"><h3 className="h-display t-3">Thank you.</h3><p className="mt-2 text-muted">We will be in touch within one business day.</p></div>;
  return (
    <form onSubmit={submit} className="space-y-4 rounded bg-white p-8 text-ink">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="lbl">Name</label><input className="field" name="name" required /></div>
        <div><label className="lbl">Work email</label><input className="field" type="email" name="email" required /></div>
      </div>
      <div><label className="lbl">Company</label><input className="field" name="company" /></div>
      <fieldset>
        <legend className="lbl">Are you a legal professional?*</legend>
        {["Yes, transactional law at a firm", "Yes, in-house legal", "Yes, litigation", "No, I work with legal tech", "No, but I’d love to try it"].map((o, n) => (
          <label key={o} className="flex items-center gap-2 py-1 text-[15px]"><input type="radio" name="role" value={o} required defaultChecked={n === 1} /> {o}</label>
        ))}
      </fieldset>
      <button className="btn btn-dark w-full" disabled={state === "busy"}>{state === "busy" ? "Sending…" : "Book a Demo"}</button>
      {state === "err" && <p className="text-sm text-red-600" role="alert">{err}</p>}
    </form>
  );
}

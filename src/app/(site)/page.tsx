import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ReviewMock } from "@/components/site/Mocks";
import { AcmTabs } from "@/components/site/HomeClient";
import { NAV } from "@/lib/brand";

const ENGINE = [
  ["Analyzes", "Reads every clause in context and tests it against your playbook."],
  ["Predicts", "Scores contract risk so you see exposure before you sign."],
  ["Decides", "Recommends the action and drafts the fallback wording."],
  ["Automates", "Captures, reviews and routes agreements without manual handling."],
];
const OUTCOMES = [
  ["Revenue", "Shorter paper cycles", "The engine returns a reviewed redline while the buyer is still engaged, so deals stop stalling in legal."],
  ["Cost", "Less outside counsel spend", "Routine agreements are analyzed and drafted in-house, and outside counsel is reserved for matters that need it."],
  ["Speed", "Minutes, not days", "Findings, risk score and suggested language arrive before the first internal meeting."],
  ["Risk", "One standard on every deal", "Playbooks are enforced on every agreement, whether or not a lawyer is in the room."],
];
const STEPS = [
  ["01", "Ingest", "Upload a PDF, DOCX or text. The engine extracts and stores the full agreement."],
  ["02", "Reason", "Large language models analyze each clause against your playbook and return structured, validated findings."],
  ["03", "Act", "Accept redlines, ask follow-up questions, benchmark against market practice or generate the replacement draft."],
];

export default function Home() {
  return (
    <>
      <section className="mode-dark relative overflow-hidden pb-0 pt-24 md:pt-36">
        <div className="container-x relative">
          <span className="eyebrow reveal">AI-native contract intelligence for business teams</span>
          <h1 className="h-display t-1 reveal mt-9 max-w-[900px]" style={{ animationDelay: ".05s" }}>The AI engine that runs your contract operations</h1>
          <div className="mt-8 flex flex-col justify-between gap-8 md:mt-10 md:flex-row md:items-end">
            <p className="reveal max-w-[560px] text-[19px] leading-snug" style={{ animationDelay: ".1s" }}>ClauseWand reads every agreement, scores the risk against your playbook, drafts the fix and routes the decision. Deal cycles shorten and exposure shrinks.</p>
            <div className="reveal flex gap-3"><Link href="/signup" className="btn btn-light !px-6 !py-[17px]">Sign up</Link><Link href="/login" className="btn btn-ghost !px-6 !py-[17px] text-white">Log in</Link></div>
          </div>
          <div className="relative mt-16 md:mt-24 md:px-16 reveal" style={{ animationDelay: ".2s" }}>
            <div aria-hidden className="absolute -inset-x-10 top-10 h-72 rounded-[50%] bg-gradient-to-b from-teal-700/30 to-transparent blur-3xl" />
            <ReviewMock dark className="relative" />
          </div>
        </div>
        <div className="relative mt-[-60px] bg-gradient-to-b from-transparent to-black/30 pt-24">
          <div className="container-x grid gap-6 border-t border-white/15 pb-10 pt-6 md:grid-cols-4">
            {ENGINE.map(([t, d]) => <div key={t}><p className="border-l border-white pl-4 text-[15px] font-medium">{t}</p><p className="mt-2 pl-4 text-[14px] text-white/70">{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <h2 className="h-display t-2 max-w-[820px]">An AI system that powers contracts end to end</h2>
          <AcmTabs />
        </div>
      </section>

      <section className="mode-light-accent py-24 md:py-32">
        <div className="container-x">
          <h2 className="h-display t-2 max-w-[820px]">Outcomes the business measures</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded bg-line md:grid-cols-2">
            {OUTCOMES.map(([k, t, d]) => (
              <div key={k} className="bg-white p-8"><div className="font-mono text-[13px] uppercase tracking-wider text-muted">{k}</div><h3 className="h-display t-3 mt-3">{t}</h3><p className="mt-3 max-w-[460px] text-muted">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <h2 className="h-display t-2 max-w-[820px]">How the engine works</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map(([n, t, d]) => <div key={n} className="border-t border-ink pt-6"><div className="font-mono text-[13px] text-muted">{n}</div><h3 className="h-display t-3 mt-3">{t}</h3><p className="mt-3 text-muted">{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mode-dark py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h-display t-2">Security built into the core</h2>
            <p className="mt-6 max-w-[520px] text-[18px]">Every table is isolated with row-level security, every AI call runs server-side, and your documents are never used to train models.</p>
            <Link href="/security" className="link-arrow mt-8">Read the security model <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Row-level isolation", "Server-side AI calls", "Encrypted in transit", "Audit trail per review"].map((b) => (
              <div key={b} className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded border border-white/15 text-center"><ShieldCheck size={34} strokeWidth={1.2} /><span className="px-3 font-medium">{b}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <h2 className="h-display t-2">Built for the way your industry contracts</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NAV.industries.map((s, n) => (
              <Link key={s.h} href={s.h} className="group flex h-56 flex-col justify-between rounded-sm bg-ink p-6 text-white transition-transform hover:-translate-y-1">
                <span className="font-mono text-[13px] text-white/50">0{n + 1}</span>
                <span className="flex items-end justify-between font-serif text-[30px] tracking-tight">{s.t}<ArrowRight className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { PageHero } from "@/components/site/Blocks";
import { FAQ_ACM } from "@/lib/content";
import { AcmTabs } from "@/components/site/HomeClient";

export const metadata = { title: "Autonomous Contract Management" };
const BLOCKS = [
  ["Automated intake", "Contracts arrive from uploads (and, via integrations, email and chat) and are classified and queued without anyone touching them."],
  ["First-pass review", "Each contract is reviewed against your playbook before a human opens it, with findings ranked by severity."],
  ["Collaborate with AI & humans", "Route exceptions to the right reviewer, discuss in context and keep a record of every decision."],
  ["Intelligent repository", "Everything is filed, searchable and ready for questions, with key dates and terms extracted."],
];
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Autonomous Contract Management" title="The CLM replacement for modern legal teams" sub="Run contracts from intake to insight with AI doing the repetitive work.">
        <Link href="/acm-access" className="btn btn-light">Get early access</Link>
      </PageHero>
      <section className="py-24"><div className="container-x"><h2 className="h-display t-2 max-w-[760px]">Run contracts from intake to insight with AI</h2><AcmTabs /></div></section>
      <section className="mode-light-accent py-24"><div className="container-x grid gap-6 md:grid-cols-2">
        {BLOCKS.map(([t, d]) => <div key={t} className="rounded bg-white p-8"><h3 className="h-display t-3">{t}</h3><p className="mt-3 text-muted">{d}</p></div>)}
      </div></section>
      <section className="py-24"><div className="container-x grid gap-12 lg:grid-cols-2">
        <h2 className="h-display t-2">More than just a CLM</h2>
        <p className="text-[18px] text-muted">A conventional CLM is a filing cabinet with reminders. ClauseWand reads, reviews and routes the contract first, then files it, so the repository stays accurate without data entry.</p>
      </div></section>
      <section className="mode-light-accent py-24"><div className="container-x max-w-[860px]">
        <h2 className="h-display t-2">Frequently asked questions</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {FAQ_ACM.map(([q, a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between text-[20px] font-medium">{q}<span className="text-[24px] transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 text-muted">{a}</p></details>)}
        </div>
      </div></section>
    </>
  );
}

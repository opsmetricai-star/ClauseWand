import Link from "next/link";
import { PageHero } from "@/components/site/Blocks";
import { FAQ_ACM } from "@/lib/content";
import { AcmTabs } from "@/components/site/HomeClient";

export const metadata = { title: "Autonomous Contract Management" };
const BLOCKS = [
  ["Automated intake", "Each agreement is extracted, classified and stored the moment it enters the system."],
  ["First-pass review", "The engine reviews every contract against your playbook before a person opens it, with findings ranked by severity."],
  ["Decision routing", "Exceptions surface with a recommended action, so approvers spend time only where judgment is required."],
  ["Intelligent repository", "Every contract is filed, searchable and ready to answer questions about itself."],
];
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Autonomous Contract Management" title="Replace contract storage with a system that does the work" sub="ClauseWand captures, reviews and routes agreements with AI, then files the result. The repository stays accurate without manual data entry.">
        <Link href="/signup" className="btn btn-light">Sign up</Link>
        <Link href="/login" className="btn btn-ghost text-white">Log in</Link>
      </PageHero>
      <section className="py-24"><div className="container-x"><h2 className="h-display t-2 max-w-[760px]">From intake to insight, run by AI</h2><AcmTabs /></div></section>
      <section className="mode-light-accent py-24"><div className="container-x grid gap-6 md:grid-cols-2">
        {BLOCKS.map(([t, d]) => <div key={t} className="rounded bg-white p-8"><h3 className="h-display t-3">{t}</h3><p className="mt-3 text-muted">{d}</p></div>)}
      </div></section>
      <section className="py-24"><div className="container-x grid gap-12 lg:grid-cols-2">
        <h2 className="h-display t-2">More than a contract lifecycle tool</h2>
        <p className="text-[18px] text-muted">A conventional CLM is a filing cabinet with reminders. ClauseWand reads, reviews and routes the contract first, then files it.</p>
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

import { PageHero } from "@/components/site/Blocks";
import { ShieldCheck } from "lucide-react";
import { FAQ_SEC } from "@/lib/content";

export const metadata = { title: "Security & Compliance" };
const CARDS = [["Row level isolation", "Every table is protected by row level security. Users can only read and write their own records."], ["Zero data retention", "Documents are processed without being retained or used for model training by the AI provider."], ["Encrypted in transit and at rest", "All traffic uses TLS, and storage and database are encrypted at rest by the platform."], ["Audit trail", "Every review, draft and question is logged with a timestamp and the user who ran it."], ["Server-side secrets", "API keys never reach the browser. All AI calls are made from the server."], ["Minimal data handling", "Only the documents and account details you provide are stored, and you can delete a contract and its file at any time."]];
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Security" title="Enterprise-grade security for law firms and in-house teams" sub="Confidentiality is the starting requirement, not a feature." />
      <section className="py-24"><div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map(([t, d]) => <div key={t} className="rounded border border-line p-8"><ShieldCheck strokeWidth={1.3} size={34} /><h2 className="mt-5 font-serif text-[26px]">{t}</h2><p className="mt-2 text-muted">{d}</p></div>)}
      </div></section>
      <section className="mode-light-accent py-24"><div className="container-x max-w-[860px]">
        <h2 className="h-display t-2">Security FAQ</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">{FAQ_SEC.map(([q, a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between text-[20px] font-medium">{q}<span className="text-[24px] transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 text-muted">{a}</p></details>)}</div>
      </div></section>
    </>
  );
}

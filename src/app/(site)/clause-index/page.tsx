import { PageHero } from "@/components/site/Blocks";
import { CLAUSES } from "@/lib/content";
export const metadata = { title: "Clause Index" };
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Clause Index" sub="A plain-language guide to the clauses that matter and what to look for in each." />
      <section className="py-24"><div className="container-x grid gap-4 md:grid-cols-2">
        {CLAUSES.map((c) => <div key={c.n} className="rounded border border-line p-8"><h2 className="font-serif text-[28px] tracking-tight">{c.n}</h2><p className="mt-2 text-muted">{c.d}</p><p className="mt-4 rounded bg-accent-light p-3 text-[14px]"><b>Watch for:</b> {c.risk}</p></div>)}
      </div></section>
    </>
  );
}

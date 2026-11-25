import Link from "next/link";
import { notFound } from "next/navigation";
import { SOLUTIONS } from "@/lib/content";
import { PageHero } from "@/components/site/Blocks";
import { ReviewMock } from "@/components/site/Mocks";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(SOLUTIONS).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; return { title: SOLUTIONS[slug]?.name ?? "Solutions" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = SOLUTIONS[slug];
  if (!d) notFound();
  return (
    <>
      <PageHero eyebrow={d.kind === "industry" ? `Solutions · ${d.name}` : `Solutions · ${d.name}`} title={d.title} sub={d.sub}>
        <Link href="/signup" className="btn btn-light">Get started for free</Link>
        <Link href="/contact" className="btn btn-ghost text-white">Talk to us</Link>
      </PageHero>
      <section className="py-24">
        <div className="container-x grid gap-10 md:grid-cols-3">
          {d.points.map((p, n) => (
            <div key={p.t} className="border-t border-ink pt-6"><div className="font-mono text-[13px] text-muted">0{n + 1}</div><h3 className="h-display t-3 mt-3">{p.t}</h3><p className="mt-3 text-muted">{p.d}</p></div>
          ))}
        </div>
      </section>
      <section className="mode-light-accent py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <ReviewMock />
          <div><h2 className="h-display text-[96px] leading-none">{d.stat.n}</h2><p className="mt-3 text-[18px] text-muted">{d.stat.l}</p>
            <blockquote className="h-display t-3 mt-10">“{d.quote.q}”</blockquote><p className="mt-3 text-muted">{d.quote.a}</p></div>
        </div>
      </section>
      <section className="py-24">
        <div className="container-x">
          <h2 className="h-display t-3">What to expect in your first days</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[["Day 1", "Create your account and upload a few real contracts."], ["Day 2", "Write your first playbook from the clauses you negotiate most."], ["Day 3", "Review against it, refine the rules and invite your team."]].map(([a, b]) => (
              <li key={a} className="rounded border border-line p-6"><div className="font-serif text-[28px]">{a}</div><p className="mt-2 text-muted">{b}</p></li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

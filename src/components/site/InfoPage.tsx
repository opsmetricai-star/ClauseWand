import Link from "next/link";
import { PageHero } from "./Blocks";

export type Info = { eyebrow: string; title: string; sub: string; cta?: [string, string]; cards: { t: string; d: string; href?: string }[]; cardsTitle?: string };

export function InfoPage({ d }: { d: Info }) {
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} sub={d.sub}>
        {d.cta && <Link href={d.cta[1]} className="btn btn-light">{d.cta[0]}</Link>}
      </PageHero>
      <section className="py-24"><div className="container-x">
        {d.cardsTitle && <h2 className="h-display t-3 mb-8">{d.cardsTitle}</h2>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.cards.map((c) => {
            const inner = <><h3 className="font-serif text-[26px] tracking-tight">{c.t}</h3><p className="mt-2 text-muted">{c.d}</p></>;
            return c.href ? <Link key={c.t} href={c.href} className="rounded border border-line p-8 hover:bg-accent-light">{inner}</Link> : <div key={c.t} className="rounded border border-line p-8">{inner}</div>;
          })}
        </div>
      </div></section>
    </>
  );
}

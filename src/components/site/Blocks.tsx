import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FEATURES, type FeaturePageData } from "@/lib/content";
import { ReviewMock, StepMock } from "./Mocks";

export function PageHero({ eyebrow, title, sub, children }: { eyebrow?: string; title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <section className="mode-dark pb-20 pt-20 md:pb-28 md:pt-32">
      <div className="container-x">
        {eyebrow && <span className="eyebrow reveal">{eyebrow}</span>}
        <h1 className="h-display t-1 reveal mt-8 max-w-[900px]">{title}</h1>
        {sub && <p className="reveal mt-8 max-w-[560px] text-[19px] leading-snug">{sub}</p>}
        {children && <div className="reveal mt-10 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <section className="py-20"><div className="container-x"><div className="max-w-[760px] space-y-5 text-[18px] leading-relaxed text-ink/85 [&_h2]:font-serif [&_h2]:text-[32px] [&_h2]:font-light [&_h2]:tracking-tight [&_h2]:text-ink [&_h2]:pt-6 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6">{children}</div></div></section>;
}

export function FeaturePage({ d }: { d: FeaturePageData }) {
  return (
    <>
      <PageHero eyebrow={d.badge} title={d.title} sub={d.sub}>
        <Link href="/signup" className="btn btn-light">Sign up</Link>
        <Link href="/login" className="btn btn-ghost text-white">Log in</Link>
      </PageHero>
      <section className="mode-light-accent pb-24 pt-0">
        <div className="container-x -mt-10 md:-mt-16"><ReviewMock /></div>
      </section>
      <section className="py-24">
        <div className="container-x grid gap-10 md:grid-cols-3">
          {d.steps.map((s, n) => (
            <div key={s.t} className="border-t border-ink pt-6">
              <div className="font-mono text-[13px] text-muted">0{n + 1}</div>
              <h3 className="h-display t-3 mt-3">{s.t}</h3>
              <p className="mt-3 text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      {d.blocks.map((b, n) => (
        <section key={b.t} className={n % 2 === 0 ? "mode-light-accent py-24" : "py-24"}>
          <div className={`container-x grid items-center gap-12 lg:grid-cols-2 ${n % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <StepMock title={b.t} items={b.list ?? [b.d.split(".")[0], "Applied to your document", "Ready to use"]} />
            <div>
              <h2 className="h-display t-2">{b.t}</h2>
              <p className="mt-5 max-w-[480px] text-[18px] text-muted">{b.d}</p>
              {b.list && <ul className="mt-6 space-y-2">{b.list.map((l) => <li key={l} className="flex items-center gap-2"><Check size={18} className="text-teal-600" />{l}</li>)}</ul>}
            </div>
          </div>
        </section>
      ))}
      <section className="py-24">
        <div className="container-x">
          <h2 className="h-display t-3">More features to explore</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.more.map((k) => { const f = FEATURES[k]; return (
              <Link key={k} href={f.href} className="group rounded border border-line p-6 hover:bg-accent-light">
                <div className="font-serif text-[28px] tracking-tight capitalize">{k}</div>
                <p className="mt-2 text-[14px] text-muted">{f.title}</p>
                <ArrowRight className="mt-6 transition-transform group-hover:translate-x-1" size={18} />
              </Link>); })}
          </div>
        </div>
      </section>
    </>
  );
}

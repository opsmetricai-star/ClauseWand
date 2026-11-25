import Link from "next/link";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { ReviewMock } from "@/components/site/Mocks";
import { AcmTabs, StoryCarousel, LeadForm } from "@/components/site/HomeClient";
import { INTEGRATIONS } from "@/lib/content";
import { NAV } from "@/lib/brand";

const HERO_LINES = ["Reviews supplier MSAs across multiple countries.", "Applies standard playbooks across contract reviews.", "Catches non-standard terms across vendor agreements.", "Reduces time spent on repetitive contract drafting."];
const TEAMS = ["Northwind Legal", "Halden Cloud", "Orsa Industries", "Meridian Foundation", "Alder & Pike", "Brightwater"];
const VOICES = [
  ["Change and adoption was very straightforward for us, which is not always the case. People found it intuitive.", "Alice B.", "Senior Legal Director, Technology"],
  ["Something that would have taken at best about three weeks, I was able to put together in four days.", "Cicely R.", "Legal Operations Manager"],
  ["We will be able to get through more contracts and make sure legal really is not a bottleneck.", "Cassidy S.", "Legal Operations Manager"],
  ["I especially appreciate an extra set of eyes late at night on long, complex agreements.", "Tzipi Z.", "Legal Associate"],
  ["It provides about a 30% lift in my efficiency, if not higher.", "Abhi V.", "Senior Legal Counsel"],
];

export default function Home() {
  return (
    <>
      {/* 1 hero */}
      <section className="mode-dark relative overflow-hidden pb-0 pt-24 md:pt-36">
        <div className="container-x relative">
          <span className="eyebrow reveal">AI Contract Review &amp; Drafting</span>
          <h1 className="h-display t-1 reveal mt-9 max-w-[760px]" style={{ animationDelay: ".05s" }}>The complete contract AI suite</h1>
          <div className="mt-8 flex flex-col justify-between gap-8 md:mt-10 md:flex-row md:items-end">
            <p className="reveal max-w-[420px] text-[19px] leading-snug" style={{ animationDelay: ".1s" }}>Automate reviews, streamline negotiations, and keep every deal on track 24/7.</p>
            <Link href="/signup" className="btn btn-light reveal !px-6 !py-[17px]">Book a Demo</Link>
          </div>
          <div className="relative mt-16 md:mt-24 md:px-16 reveal" style={{ animationDelay: ".2s" }}>
            <div aria-hidden className="absolute -inset-x-10 top-10 h-72 rounded-[50%] bg-gradient-to-b from-teal-700/30 to-transparent blur-3xl" />
            <ReviewMock dark className="relative" />
          </div>
        </div>
        <div className="relative mt-[-60px] bg-gradient-to-b from-transparent to-black/30 pt-24">
          <div className="container-x grid gap-px border-t border-white/15 pb-10 pt-6 md:grid-cols-[1.2fr_repeat(4,1fr)] md:gap-6">
            <div>
              <p className="border-l border-white pl-4 text-[15px]">Trusted by legal teams worldwide.</p>
              <div className="mt-3 flex items-center gap-2 pl-4 text-[14px]"><Star size={14} className="fill-amber-400 text-amber-400" /> 4.7 <span className="text-white/60">sample rating</span></div>
            </div>
            {HERO_LINES.map((l) => <p key={l} className="hidden text-[14px] text-white/70 md:block">{l}</p>)}
          </div>
        </div>
      </section>

      {/* 2 trust bar */}
      <section className="mode-light-accent py-14">
        <div className="container-x flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <p className="text-[18px]">Trusted by in-house teams and law firms.<br /><Link href="/stories" className="link-arrow mt-2 text-[16px]">Read Customer Stories <ArrowRight size={16} /></Link></p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 font-serif text-[24px] text-ink/60">{TEAMS.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
      </section>

      {/* 3 ACM */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <h2 className="h-display t-2 max-w-[820px]">The first AI system that powers contracts end-to-end</h2>
          <AcmTabs />
        </div>
      </section>

      {/* 4 stories */}
      <section className="pb-24 md:pb-32"><div className="container-x"><StoryCarousel /></div></section>

      {/* 5 integrations + stats */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="h-display t-2">Works with your existing tools</h2>
              <p className="mt-6 max-w-[520px] text-[18px] text-muted">Legal teams should not have to change how they work to use AI. Connect ClauseWand to the tools your team already uses every day.</p>
              <Link href="/integrations" className="btn btn-dark btn-sm mt-8">Explore integrations</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {INTEGRATIONS.map(([n]) => <div key={n} className="flex aspect-square items-center justify-center rounded border border-line p-3 text-center text-[14px] font-medium hover:bg-accent-light">{n}</div>)}
            </div>
          </div>
          <div className="mt-20 grid gap-8 border-t border-line pt-12 md:grid-cols-2">
            {[["75%", "Time saved on contract work"], ["2x", "Throughput without adding headcount"]].map(([n, l]) => (
              <div key={n}><h3 className="h-display text-[88px] leading-none">{n}</h3><p className="mt-3 text-[18px] text-muted">{l} <span className="text-[12px]">(sample figure)</span></p></div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 report banner */}
      <section className="mode-light-accent py-14">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="h-display t-3">See how AI is reshaping deals in 2026</p>
          <Link href="/state-of-legal-contracts" className="btn btn-dark">Download State of Contracts Report <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* 7 security */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h-display t-2">Enterprise-grade security and privacy.</h2>
            <p className="mt-6 max-w-[520px] text-[18px] text-muted">Zero data retention means our model providers never learn from, train on, or store your data. Built for legal-grade confidentiality with authenticated access, row level isolation and audit trails.</p>
            <Link href="/security" className="link-arrow mt-8">Learn about Security <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["SOC 2 aligned", "HIPAA aware", "GDPR aware", "EU AI Act aware"].map((b) => (
              <div key={b} className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded border border-line"><ShieldCheck size={36} strokeWidth={1.2} /><span className="font-medium">{b}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 newsletter promo */}
      <section className="mode-dark py-20">
        <div className="container-x grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div><span className="eyebrow">The Wand Letter</span><h3 className="h-display t-2 mt-4">Get legal AI news and tactics straight to your inbox.</h3><p className="mt-3 text-white/70">Read by lawyers who want to move faster without cutting corners.</p></div>
          <Link href="/newsletter" className="btn btn-light">Subscribe for free</Link>
        </div>
      </section>

      {/* 9 testimonials */}
      <section className="mode-light-accent py-24 md:py-32">
        <div className="container-x">
          <h2 className="h-display t-2">Powering legal teams worldwide</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded bg-line md:grid-cols-3">
            {VOICES.map(([q, n, r]) => (
              <figure key={n} className="flex flex-col justify-between bg-white p-8">
                <blockquote className="text-[19px] leading-snug">“{q}”</blockquote>
                <figcaption className="mt-8"><div className="font-medium">{n}</div><div className="text-[14px] text-muted">{r}</div></figcaption>
              </figure>
            ))}
            <div className="flex items-center bg-ink p-8 text-white"><p className="text-[14px] text-white/70">Quotes shown are sample placeholders. Replace with permissioned customer testimonials before launch.</p></div>
          </div>
        </div>
      </section>

      {/* 10 solutions */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <h2 className="h-display t-2">Find solutions that fit your organization</h2>
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

      {/* 11 lead form */}
      <section className="mode-dark py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h-display t-2">Join legal teams already using ClauseWand</h2>
            <p className="mt-6 text-[18px]">Need to discuss your use case? <Link href="/contact" className="underline underline-offset-4">Contact us.</Link></p>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}

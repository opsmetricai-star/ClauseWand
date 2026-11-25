import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/Blocks";
import { PLANS, FREE_LIMITS } from "@/lib/brand";

export const metadata = { title: "Pricing" };
const FAQ = [
  ["How do I pay?", "Choose a plan, complete checkout on our payment partner, and use the same email as your account. Your plan activates once the payment is confirmed."],
  ["Can I change plans?", "Yes. Pick a different plan at any time from Billing. Contact us for a prorated adjustment."],
  ["What counts as a review?", "One contract analysed against a playbook. Questions, drafts and comparisons have their own allowances."],
  ["Do unused credits roll over?", "No. Allowances reset at the start of each monthly period."],
];
export default function Page() {
  return (
    <>
      <PageHero eyebrow="ClauseWand Pricing" title="Flexible pricing for teams of all sizes" sub="Start free. Upgrade when your volume grows." />
      <section className="py-24">
        <div className="container-x grid gap-6 lg:grid-cols-4">
          <div className="flex flex-col rounded border border-line p-8">
            <h2 className="font-serif text-[30px]">Free</h2><p className="mt-1 text-muted">Try it on real contracts.</p>
            <div className="mt-6 font-serif text-[56px] leading-none">$0</div>
            <ul className="mt-6 flex-1 space-y-3 text-[15px]">{[`${FREE_LIMITS.reviews} contract reviews`, `${FREE_LIMITS.drafts} AI drafts`, `${FREE_LIMITS.asks} Ask questions`, `${FREE_LIMITS.playbooks} playbook`].map((f) => <li key={f} className="flex gap-2"><Check size={18} className="mt-0.5 flex-none text-teal-600" />{f}</li>)}</ul>
            <Link href="/signup" className="btn btn-ghost mt-8">Get started</Link>
          </div>
          {PLANS.map((p) => (
            <div key={p.id} className={`flex flex-col rounded border p-8 ${"popular" in p && p.popular ? "border-ink bg-ink text-white" : "border-line"}`}>
              <div className="flex items-center justify-between"><h2 className="font-serif text-[30px]">{p.name}</h2>{"popular" in p && p.popular && <span className="rounded-full bg-wand px-3 py-0.5 text-[12px] font-medium text-ink">Most popular</span>}</div>
              <p className={`mt-1 ${"popular" in p && p.popular ? "text-white/70" : "text-muted"}`}>{p.blurb}</p>
              <div className="mt-6 font-serif text-[56px] leading-none">${p.price}<span className="ml-1 font-sans text-[15px] opacity-60">{p.cadence}</span></div>
              <ul className="mt-6 flex-1 space-y-3 text-[15px]">{p.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="mt-0.5 flex-none text-teal-500" />{f}</li>)}</ul>
              <Link href={`/app/billing?plan=${p.id}`} className={`btn mt-8 ${"popular" in p && p.popular ? "btn-light" : "btn-dark"}`}>Upgrade to {p.name}</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="mode-light-accent py-24"><div className="container-x grid gap-12 lg:grid-cols-2">
        <div><h2 className="h-display t-2">Custom pricing for modern legal teams</h2><p className="mt-5 max-w-[480px] text-[18px] text-muted">Need SSO, custom retention, volume above the Firm plan or a security review? Talk to us.</p><Link href="/contact" className="btn btn-dark mt-8">Contact sales</Link></div>
        <div className="divide-y divide-line border-y border-line">{FAQ.map(([q, a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between text-[18px] font-medium">{q}<span className="text-[22px] transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 text-muted">{a}</p></details>)}</div>
      </div></section>
    </>
  );
}

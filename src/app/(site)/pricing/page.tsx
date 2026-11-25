import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/Blocks";
import { PLANS, FREE_LIMITS } from "@/lib/brand";
import { getUser } from "@/lib/supabase/server";

export const metadata = { title: "Pricing" };
const FAQ = [
  ["How does payment work?", "Create an account, choose a plan and complete checkout with the same email. The plan activates once the payment is confirmed."],
  ["Can I change plans?", "Yes. Choose a different plan at any time from Billing in your workspace."],
  ["What counts as a review?", "One contract analyzed against a playbook. Comparisons count toward the review allowance. Questions and drafts have their own allowances."],
  ["Do unused allowances roll over?", "No. Allowances reset at the start of each calendar month."],
];
export default async function Page() {
  const user = await getUser();
  const href = (id: string) => (user ? `/app/billing?plan=${id}` : `/signup?plan=${id}`);
  const label = user ? "Dashboard" : "Create account";
  return (
    <>
      <PageHero eyebrow="Pricing" title="Pricing that scales with your contract volume" sub="Start on the free tier. Move up when the engine is handling more of your pipeline." />
      <section className="py-24">
        <div className="container-x grid gap-6 lg:grid-cols-4">
          <div className="flex flex-col rounded border border-line p-8">
            <h2 className="font-serif text-[30px]">Free</h2><p className="mt-1 text-muted">Evaluate the engine on real agreements.</p>
            <div className="mt-6 font-serif text-[56px] leading-none">$0</div>
            <ul className="mt-6 flex-1 space-y-3 text-[15px]">{[`${FREE_LIMITS.reviews} contract reviews`, `${FREE_LIMITS.drafts} AI drafts`, `${FREE_LIMITS.asks} contract questions`, `${FREE_LIMITS.playbooks} playbook`].map((f) => <li key={f} className="flex gap-2"><Check size={18} className="mt-0.5 flex-none text-teal-600" />{f}</li>)}</ul>
            <Link href={user ? "/app" : "/signup"} className="btn btn-ghost mt-8">{label}</Link>
          </div>
          {PLANS.map((p) => {
            const pop = "popular" in p && p.popular;
            return (
              <div key={p.id} className={`flex flex-col rounded border p-8 ${pop ? "border-ink bg-ink text-white" : "border-line"}`}>
                <div className="flex items-center justify-between"><h2 className="font-serif text-[30px]">{p.name}</h2>{pop && <span className="rounded-full bg-wand px-3 py-0.5 text-[12px] font-medium text-ink">Most popular</span>}</div>
                <p className={`mt-1 ${pop ? "text-white/70" : "text-muted"}`}>{p.blurb}</p>
                <div className="mt-6 font-serif text-[56px] leading-none">${p.price}<span className="ml-1 font-sans text-[15px] opacity-60">{p.cadence}</span></div>
                <ul className="mt-6 flex-1 space-y-3 text-[15px]">{p.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="mt-0.5 flex-none text-teal-500" />{f}</li>)}</ul>
                <Link href={href(p.id)} className={`btn mt-8 ${pop ? "btn-light" : "btn-dark"}`}>{label}</Link>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mode-light-accent py-24"><div className="container-x max-w-[860px]">
        <h2 className="h-display t-2">Pricing questions</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">{FAQ.map(([q, a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between text-[18px] font-medium">{q}<span className="text-[22px] transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 text-muted">{a}</p></details>)}</div>
      </div></section>
    </>
  );
}

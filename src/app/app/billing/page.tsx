import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Title, Panel } from "@/components/app/Views";
import { PLANS } from "@/lib/brand";
import { getUsage } from "@/lib/usage";

export const metadata = { title: "Billing" };
export default async function Page({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan: want } = await searchParams;
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const { data: profile } = await sb.from("profiles").select("plan,plan_status,plan_renews_at").eq("id", user!.id).single();
  const { data: pays } = await sb.from("payments").select("reference,plan,amount,currency,status,created_at").order("created_at", { ascending: false });
  let usage: Awaited<ReturnType<typeof getUsage>> | null = null;
  try { usage = await getUsage(user!.id); } catch { /* service role missing */ }
  return (
    <>
      <Title t="Billing" sub="Your plan, allowances and payment history." />
      <Panel className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><div className="text-[13px] uppercase tracking-wider text-muted">Current plan</div><div className="font-serif text-[40px] capitalize">{profile?.plan ?? "free"}</div>{profile?.plan_renews_at && <div className="text-muted">Current period ends {new Date(profile.plan_renews_at).toLocaleDateString()}</div>}</div>
          {usage && <dl className="grid grid-cols-3 gap-6 text-center">{([["Reviews", usage.used.reviews, usage.limits.reviews], ["Drafts", usage.used.drafts, usage.limits.drafts], ["Questions", usage.used.asks, usage.limits.asks]] as const).map(([l, u, m]) => <div key={l}><dd className="font-serif text-[30px]">{u}<span className="text-[16px] text-muted">/{m}</span></dd><dt className="text-[13px] text-muted">{l}</dt></div>)}</dl>}
        </div>
      </Panel>
      <div className="mb-4 rounded border border-line bg-white p-4 text-[14px] text-muted"><b className="text-ink">How upgrading works.</b> Click a plan to open checkout. <b className="text-ink">Use the same email as this account ({user!.email}).</b> Your plan activates after the payment is confirmed by our payment partner, which can take a few minutes. Returning from checkout does not activate a plan by itself.</div>
      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div key={p.id} className={`card flex flex-col p-6 ${want === p.id ? "ring-2 ring-ink" : ""}`}>
            <div className="flex items-baseline justify-between"><h2 className="font-serif text-[28px]">{p.name}</h2><span className="font-serif text-[28px]">${p.price}<span className="text-[13px] text-muted">/mo</span></span></div>
            <ul className="my-4 flex-1 space-y-2 text-[14px]">{p.features.map((f) => <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 flex-none text-teal-600" />{f}</li>)}</ul>
            {profile?.plan === p.id ? <span className="btn btn-ghost cursor-default">Current plan</span> : <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Pay ${p.price} for {p.name}</a>}
          </div>
        ))}
      </div>
      <h2 className="mb-3 mt-10 font-serif text-[24px]">Payment history</h2>
      <div className="card divide-y divide-line">
        {(pays ?? []).length === 0 && <div className="p-6 text-muted">No payments recorded yet.</div>}
        {(pays ?? []).map((p) => <div key={p.reference} className="flex flex-wrap justify-between gap-2 p-4 text-[14px]"><span className="capitalize">{p.plan}</span><span>{p.amount ? `${p.amount} ${p.currency ?? ""}` : "—"}</span><span className="text-muted">{p.status} · {new Date(p.created_at).toLocaleDateString()}</span></div>)}
      </div>
    </>
  );
}

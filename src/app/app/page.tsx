import Link from "next/link";
import { FileText, ShieldAlert, Sparkles, BookMarked } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Title, Panel } from "@/components/app/Views";

export const metadata = { title: "Dashboard" };
export default async function Page() {
  const sb = await createClient();
  const [{ count: total }, { count: reviewed }, { count: pbs }, { data: recent }, { count: highRisk }] = await Promise.all([
    sb.from("contracts").select("id", { count: "exact", head: true }),
    sb.from("contracts").select("id", { count: "exact", head: true }).eq("status", "reviewed"),
    sb.from("playbooks").select("id", { count: "exact", head: true }),
    sb.from("contracts").select("id,title,status,risk_score,created_at").order("created_at", { ascending: false }).limit(6),
    sb.from("contracts").select("id", { count: "exact", head: true }).gte("risk_score", 67),
  ]);
  const stats = [
    { l: "Contracts", v: total ?? 0, i: FileText }, { l: "Reviewed", v: reviewed ?? 0, i: Sparkles },
    { l: "High risk", v: highRisk ?? 0, i: ShieldAlert }, { l: "Playbooks", v: pbs ?? 0, i: BookMarked },
  ];
  return (
    <>
      <Title t="Dashboard" sub="Your contract workload at a glance."><Link href="/app/contracts" className="btn btn-dark">Add a contract</Link></Title>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => <Panel key={s.l}><s.i size={20} strokeWidth={1.4} className="text-muted" /><div className="mt-3 font-serif text-[44px] leading-none">{s.v}</div><div className="text-muted">{s.l}</div></Panel>)}
      </div>
      <h2 className="mb-3 mt-10 font-serif text-[26px]">Recent contracts</h2>
      <div className="card divide-y divide-line">
        {(recent ?? []).length === 0 && <div className="p-8 text-center text-muted">No contracts yet. <Link href="/app/contracts" className="underline">Upload your first one</Link> to see a review in under a minute.</div>}
        {(recent ?? []).map((c) => (
          <Link key={c.id} href={`/app/contracts/${c.id}`} className="flex items-center justify-between gap-4 p-4 hover:bg-accent-light">
            <div><div className="font-medium">{c.title}</div><div className="text-[13px] text-muted">{new Date(c.created_at).toLocaleDateString()}</div></div>
            <div className="flex items-center gap-3 text-[13px]"><span className="rounded-full bg-accent-light px-2.5 py-0.5">{c.status}</span>{c.risk_score != null && <span className="font-medium">Risk {c.risk_score}</span>}</div>
          </Link>
        ))}
      </div>
    </>
  );
}

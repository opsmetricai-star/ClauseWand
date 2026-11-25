import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NewContract from "@/components/app/NewContract";
import { Title } from "@/components/app/Views";

export const metadata = { title: "Contracts" };
export default async function Page() {
  const sb = await createClient();
  const { data } = await sb.from("contracts").select("id,title,status,risk_score,source,created_at").order("created_at", { ascending: false });
  return (
    <>
      <Title t="Contracts" sub="Your repository. Add a contract, then review it, ask it questions or benchmark it." />
      <NewContract />
      <div className="card mt-8 divide-y divide-line">
        {(data ?? []).length === 0 && <div className="p-8 text-center text-muted">Nothing here yet.</div>}
        {(data ?? []).map((c) => (
          <Link key={c.id} href={`/app/contracts/${c.id}`} className="flex items-center justify-between gap-4 p-4 hover:bg-accent-light">
            <div><div className="font-medium">{c.title}</div><div className="text-[13px] text-muted">{c.source} · {new Date(c.created_at).toLocaleDateString()}</div></div>
            <div className="flex items-center gap-3 text-[13px]"><span className="rounded-full bg-accent-light px-2.5 py-0.5">{c.status}</span>{c.risk_score != null && <span className={`font-medium ${c.risk_score > 66 ? "text-red-600" : c.risk_score > 33 ? "text-amber-600" : "text-emerald-600"}`}>Risk {c.risk_score}</span>}</div>
          </Link>
        ))}
      </div>
    </>
  );
}

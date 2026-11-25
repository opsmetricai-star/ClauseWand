import { createClient } from "@/lib/supabase/server";
import { Title } from "@/components/app/Views";
import { DraftStudio } from "@/components/app/Forms";

export const metadata = { title: "Draft" };
export default async function Page() {
  const sb = await createClient();
  const [{ data: pre }, { data: drafts }] = await Promise.all([
    sb.from("contracts").select("id,title").order("created_at", { ascending: false }).limit(50),
    sb.from("drafts").select("id,title,created_at").order("created_at", { ascending: false }).limit(8),
  ]);
  return (
    <>
      <Title t="Draft" sub="Generate agreements and clauses from your instructions or an existing precedent." />
      <DraftStudio precedents={pre ?? []} />
      {(drafts ?? []).length > 0 && <><h2 className="mb-3 mt-10 font-serif text-[24px]">Recent drafts</h2><div className="card divide-y divide-line">{drafts!.map((d) => <div key={d.id} className="flex justify-between p-4"><span>{d.title}</span><span className="text-[13px] text-muted">{new Date(d.created_at).toLocaleDateString()}</span></div>)}</div></>}
    </>
  );
}

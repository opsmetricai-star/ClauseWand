import { createClient } from "@/lib/supabase/server";
import { Title } from "@/components/app/Views";
import { ClauseForm } from "@/components/app/Forms";
import { deleteClause } from "../actions";

export const metadata = { title: "Clause library" };
export default async function Page() {
  const sb = await createClient();
  const { data } = await sb.from("clause_library").select("*").order("created_at", { ascending: false });
  return (
    <>
      <Title t="Clause library" sub="Approved language you can reuse and paste into any draft." />
      <ClauseForm />
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {(data ?? []).map((c) => (
          <div key={c.id} className="card p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-medium">{c.title}</h3>{c.contract_type && <div className="text-[12px] text-muted">{c.contract_type}</div>}</div>
            <form action={deleteClause}><input type="hidden" name="id" value={c.id} /><button className="text-[13px] text-red-600 underline">Delete</button></form></div>
            <p className="mt-3 whitespace-pre-wrap text-[14px] text-muted">{c.body}</p></div>
        ))}
        {(data ?? []).length === 0 && <p className="text-muted">No saved clauses yet.</p>}
      </div>
    </>
  );
}

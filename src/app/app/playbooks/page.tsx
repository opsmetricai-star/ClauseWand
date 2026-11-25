import { createClient } from "@/lib/supabase/server";
import { Title } from "@/components/app/Views";
import { PlaybookEditor } from "@/components/app/Forms";
import { deletePlaybook } from "../actions";

export const metadata = { title: "Playbooks" };
export default async function Page() {
  const sb = await createClient();
  const { data } = await sb.from("playbooks").select("id,name,description,rules").order("created_at", { ascending: false });
  return (
    <>
      <Title t="Playbooks" sub="Encode your standards. Select a playbook when you review a contract." />
      <h2 className="mb-3 font-serif text-[24px]">New playbook</h2>
      <PlaybookEditor />
      <h2 className="mb-3 mt-10 font-serif text-[24px]">Your playbooks</h2>
      <div className="space-y-6">
        {(data ?? []).length === 0 && <p className="text-muted">None yet.</p>}
        {(data ?? []).map((p) => (
          <details key={p.id} className="group">
            <summary className="card flex cursor-pointer list-none items-center justify-between p-4"><span><b>{p.name}</b> <span className="text-muted">· {(p.rules as unknown[]).length} rules</span></span><span className="text-[13px] text-muted group-open:hidden">Edit</span></summary>
            <div className="mt-3 space-y-3">
              <PlaybookEditor initial={p as never} />
              <form action={deletePlaybook}><input type="hidden" name="id" value={p.id} /><button className="text-sm text-red-600 underline">Delete this playbook</button></form>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}

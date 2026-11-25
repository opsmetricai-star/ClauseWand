import { notFound } from "next/navigation";
import { Trash2, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Title, Panel } from "@/components/app/Views";
import ContractTools from "@/components/app/ContractTools";
import { deleteContract } from "../../actions";
import type { Review, Answer, Comparison } from "@/lib/ai/gemini";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const sb = await createClient();
  const { data: c } = await sb.from("contracts").select("*").eq("id", id).maybeSingle();
  if (!c) notFound();
  const [{ data: pbs }, { data: rev }, { data: qa }, { data: cmp }] = await Promise.all([
    sb.from("playbooks").select("id,name").order("name"),
    sb.from("reviews").select("result").eq("contract_id", id).order("created_at", { ascending: false }).limit(1),
    sb.from("qa_messages").select("id,question,answer").eq("contract_id", id).order("created_at", { ascending: false }),
    sb.from("comparisons").select("result").eq("contract_id", id).order("created_at", { ascending: false }).limit(1),
  ]);
  let url: string | null = null;
  if (c.file_path) url = (await sb.storage.from("contracts").createSignedUrl(c.file_path, 300)).data?.signedUrl ?? null;
  return (
    <>
      <Title t={c.title} sub={`${c.source} · added ${new Date(c.created_at).toLocaleDateString()} · ${c.content.length.toLocaleString()} characters`}>
        <div className="flex gap-2">
          {url && <a href={url} className="btn btn-ghost btn-sm"><Download size={14} /> Original file</a>}
          <form action={deleteContract}><input type="hidden" name="id" value={c.id} /><button className="btn btn-ghost btn-sm text-red-600"><Trash2 size={14} /> Delete</button></form>
        </div>
      </Title>
      <div className="grid gap-6 2xl:grid-cols-[1fr_420px]">
        <ContractTools contractId={c.id} playbooks={pbs ?? []} review={(rev?.[0]?.result as Review) ?? null} qa={(qa ?? []) as { id: string; question: string; answer: Answer }[]} comparison={(cmp?.[0]?.result as Comparison) ?? null} />
        <Panel className="max-h-[720px] overflow-auto 2xl:sticky 2xl:top-6"><h2 className="mb-3 font-serif text-[22px]">Contract text</h2><pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-muted">{c.content}</pre></Panel>
      </div>
    </>
  );
}

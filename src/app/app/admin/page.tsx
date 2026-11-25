import { notFound } from "next/navigation";
import { createClient, createAdmin } from "@/lib/supabase/server";
import { Title } from "@/components/app/Views";
import { AdminForm } from "@/components/app/Forms";

export const metadata = { title: "Admin" };
export default async function Page() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!user?.email || !admins.includes(user.email.toLowerCase())) notFound();
  const admin = createAdmin();
  const [{ data: pays }, { data: leads }] = await Promise.all([
    admin.from("payments").select("reference,email,plan,amount,status,source,created_at").order("created_at", { ascending: false }).limit(25),
    admin.from("leads").select("kind,email,name,company,created_at").order("created_at", { ascending: false }).limit(25),
  ]);
  return (
    <>
      <Title t="Admin" sub="Trusted plan activation, payments and leads." />
      <h2 className="mb-3 font-serif text-[24px]">Activate a plan manually</h2><AdminForm />
      <h2 className="mb-3 mt-10 font-serif text-[24px]">Recent payments</h2>
      <div className="card divide-y divide-line text-[14px]">{(pays ?? []).map((p) => <div key={p.reference} className="flex flex-wrap justify-between gap-2 p-3"><span>{p.email}</span><span className="capitalize">{p.plan}</span><span>{p.status}/{p.source}</span><span className="text-muted">{new Date(p.created_at).toLocaleString()}</span></div>)}{(pays ?? []).length === 0 && <div className="p-4 text-muted">None.</div>}</div>
      <h2 className="mb-3 mt-10 font-serif text-[24px]">Recent leads</h2>
      <div className="card divide-y divide-line text-[14px]">{(leads ?? []).map((l, i) => <div key={i} className="flex flex-wrap justify-between gap-2 p-3"><span>{l.email}</span><span>{l.kind}</span><span>{l.name} {l.company}</span><span className="text-muted">{new Date(l.created_at).toLocaleString()}</span></div>)}{(leads ?? []).length === 0 && <div className="p-4 text-muted">None.</div>}</div>
    </>
  );
}

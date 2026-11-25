import { createClient } from "@/lib/supabase/server";
import { Title } from "@/components/app/Views";
import { markNotificationsRead } from "../actions";

export const metadata = { title: "Notifications" };
export default async function Page() {
  const sb = await createClient();
  const { data } = await sb.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
  return (
    <>
      <Title t="Notifications"><form action={markNotificationsRead}><button className="btn btn-ghost btn-sm">Mark all read</button></form></Title>
      <div className="card divide-y divide-line">
        {(data ?? []).length === 0 && <div className="p-8 text-center text-muted">You are all caught up.</div>}
        {(data ?? []).map((n) => <div key={n.id} className="p-4"><div className="flex items-center gap-2 font-medium">{!n.read && <span className="h-2 w-2 rounded-full bg-teal-500" />}{n.title}</div>{n.body && <p className="text-muted">{n.body}</p>}<div className="text-[12px] text-muted">{new Date(n.created_at).toLocaleString()}</div></div>)}
      </div>
    </>
  );
}

import { redirect } from "next/navigation";
import Sidebar from "@/components/app/Sidebar";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { summarize, periodStart } from "@/lib/usage";

export const metadata = { title: { default: "Workspace", template: "%s | ClauseWand" } };
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured()) redirect("/login?error=not_configured");
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");
  const [{ data: profile }, { count }, { data: events }] = await Promise.all([
    sb.from("profiles").select("full_name,plan,plan_status").eq("id", user.id).maybeSingle(),
    sb.from("notifications").select("id", { count: "exact", head: true }).eq("read", false),
    sb.from("usage_events").select("kind").gte("created_at", periodStart()),
  ]);
  const u = summarize(profile, events);
  const plan = u.plan;
  const usage = [{ l: "Reviews", u: u.used.reviews, m: u.limits.reviews }, { l: "Drafts", u: u.used.drafts, m: u.limits.drafts }, { l: "Questions", u: u.used.asks, m: u.limits.asks }];
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase());
  return (
    <div className="flex min-h-screen flex-col bg-accent-light lg:flex-row">
      <Sidebar name={profile?.full_name || user.email || "Account"} plan={plan} unread={count ?? 0} usage={usage} admin={!!user.email && admins.includes(user.email.toLowerCase())} />
      <main className="min-w-0 flex-1 p-5 md:p-10">{children}</main>
    </div>
  );
}

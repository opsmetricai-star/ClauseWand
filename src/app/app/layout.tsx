import { redirect } from "next/navigation";
import Sidebar from "@/components/app/Sidebar";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { getUsage } from "@/lib/usage";

export const metadata = { title: { default: "Workspace", template: "%s | ClauseWand" } };
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured()) redirect("/login?error=not_configured");
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");
  const [{ data: profile }, { count }] = await Promise.all([
    sb.from("profiles").select("full_name,plan").eq("id", user.id).maybeSingle(),
    sb.from("notifications").select("id", { count: "exact", head: true }).eq("read", false),
  ]);
  let usage = [{ l: "Reviews", u: 0, m: 3 }, { l: "Drafts", u: 0, m: 3 }, { l: "Questions", u: 0, m: 10 }];
  let plan = profile?.plan ?? "free";
  try {
    const u = await getUsage(user.id); plan = u.plan;
    usage = [{ l: "Reviews", u: u.used.reviews, m: u.limits.reviews }, { l: "Drafts", u: u.used.drafts, m: u.limits.drafts }, { l: "Questions", u: u.used.asks, m: u.limits.asks }];
  } catch { /* service role not configured: show defaults */ }
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase());
  return (
    <div className="flex min-h-screen flex-col bg-accent-light lg:flex-row">
      <Sidebar name={profile?.full_name || user.email || "Account"} plan={plan} unread={count ?? 0} usage={usage} admin={!!user.email && admins.includes(user.email.toLowerCase())} />
      <main className="min-w-0 flex-1 p-5 md:p-10">{children}</main>
    </div>
  );
}

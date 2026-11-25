"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient, createAdmin } from "@/lib/supabase/server";
import { FREE_LIMITS, PLANS } from "@/lib/brand";

async function me() {
  const sb = await createClient();
  const { data } = await sb.auth.getUser();
  if (!data.user) redirect("/login");
  return { sb, user: data.user };
}

const ruleSchema = z.object({ title: z.string().min(1).max(200), preferred: z.string().max(2000), fallback: z.string().max(2000), escalate: z.string().max(2000) });

export async function savePlaybook(_: unknown, fd: FormData): Promise<{ error?: string; ok?: boolean }> {
  const { sb, user } = await me();
  const name = String(fd.get("name") ?? "").trim();
  if (!name) return { error: "Give the playbook a name." };
  let rules: z.infer<typeof ruleSchema>[] = [];
  try { rules = z.array(ruleSchema).min(1, "Add at least one rule.").parse(JSON.parse(String(fd.get("rules") ?? "[]"))); }
  catch (e) { return { error: e instanceof z.ZodError ? e.issues[0].message : "Invalid rules." }; }
  const id = String(fd.get("id") ?? "");
  if (id) {
    const { error } = await sb.from("playbooks").update({ name, description: String(fd.get("description") ?? ""), rules }).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { data: prof } = await sb.from("profiles").select("plan").eq("id", user.id).single();
    const cap = (PLANS.find((p) => p.id === prof?.plan)?.limits.playbooks) ?? FREE_LIMITS.playbooks;
    const { count } = await sb.from("playbooks").select("id", { count: "exact", head: true });
    if ((count ?? 0) >= cap) return { error: `Your plan allows ${cap} playbook${cap > 1 ? "s" : ""}. Upgrade for more.` };
    const { error } = await sb.from("playbooks").insert({ user_id: user.id, name, description: String(fd.get("description") ?? ""), rules });
    if (error) return { error: error.message };
  }
  revalidatePath("/app/playbooks");
  return { ok: true };
}

export async function deletePlaybook(fd: FormData) {
  const { sb } = await me();
  await sb.from("playbooks").delete().eq("id", String(fd.get("id")));
  revalidatePath("/app/playbooks");
}

export async function deleteContract(fd: FormData) {
  const { sb } = await me();
  const id = String(fd.get("id"));
  const { data: c } = await sb.from("contracts").select("file_path").eq("id", id).single();
  if (c?.file_path) await sb.storage.from("contracts").remove([c.file_path]);
  await sb.from("contracts").delete().eq("id", id);
  revalidatePath("/app/contracts");
  redirect("/app/contracts");
}

export async function saveClause(_: unknown, fd: FormData): Promise<{ error?: string; ok?: boolean }> {
  const { sb, user } = await me();
  const title = String(fd.get("title") ?? "").trim(); const body = String(fd.get("body") ?? "").trim();
  if (!title || !body) return { error: "Title and clause text are required." };
  const { error } = await sb.from("clause_library").insert({ user_id: user.id, title, body, contract_type: String(fd.get("contract_type") ?? "") || null });
  if (error) return { error: error.message };
  revalidatePath("/app/library");
  return { ok: true };
}
export async function deleteClause(fd: FormData) {
  const { sb } = await me();
  await sb.from("clause_library").delete().eq("id", String(fd.get("id")));
  revalidatePath("/app/library");
}

export async function saveProfile(_: unknown, fd: FormData): Promise<{ error?: string; ok?: boolean }> {
  const { sb, user } = await me();
  const { error } = await sb.from("profiles").update({ full_name: String(fd.get("full_name") ?? "").slice(0, 120), organization: String(fd.get("organization") ?? "").slice(0, 160) }).eq("id", user.id);
  if (error) return { error: error.message };
  revalidatePath("/app/settings");
  return { ok: true };
}

export async function markNotificationsRead() {
  const { sb, user } = await me();
  await sb.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
  revalidatePath("/app", "layout");
}

/** Trusted administrative activation. Only emails listed in ADMIN_EMAILS may use it. */
export async function adminActivate(_: unknown, fd: FormData): Promise<{ error?: string; ok?: string }> {
  const { user } = await me();
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!user.email || !admins.includes(user.email.toLowerCase())) return { error: "Not authorised." };
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const plan = String(fd.get("plan"));
  if (!["free", "solo", "team", "firm"].includes(plan)) return { error: "Unknown plan." };
  const admin = createAdmin();
  const { data: p } = await admin.from("profiles").select("id").ilike("email", email).maybeSingle();
  if (!p) return { error: "No account with that email." };
  const renews = new Date(); renews.setMonth(renews.getMonth() + 1);
  await admin.from("profiles").update({ plan, plan_status: "active", plan_renews_at: plan === "free" ? null : renews.toISOString() }).eq("id", p.id);
  await admin.from("payments").insert({ reference: `admin-${Date.now()}`, email, user_id: p.id, plan, status: "confirmed", source: "admin" });
  return { ok: `Set ${email} to ${plan}.` };
}

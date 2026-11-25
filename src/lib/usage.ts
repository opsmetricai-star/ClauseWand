import { createAdmin } from "@/lib/supabase/server";
import { FREE_LIMITS, PLANS, type PlanId } from "@/lib/brand";

export type Kind = "review" | "draft" | "ask" | "compare";
export type Limits = { reviews: number; drafts: number; asks: number; playbooks: number };

export function limitsFor(plan: PlanId): Limits {
  const p = PLANS.find((x) => x.id === plan);
  return p ? { ...p.limits } : FREE_LIMITS;
}
// Compare shares the "reviews" allowance so every metered action maps to one counter.
const KEY: Record<Kind, keyof Limits> = { review: "reviews", compare: "reviews", draft: "drafts", ask: "asks" };

export const periodStart = () => { const d = new Date(); return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString(); };

type Prof = { plan?: string | null; plan_status?: string | null } | null;
export function summarize(profile: Prof, events: { kind: string }[] | null) {
  const plan = ((profile?.plan_status ?? "active") === "active" ? profile?.plan : "free") as PlanId | undefined ?? "free";
  const used = { reviews: 0, drafts: 0, asks: 0 };
  for (const e of events ?? []) used[KEY[e.kind as Kind] as "reviews" | "drafts" | "asks"]++;
  return { plan, limits: limitsFor(plan), used };
}

export async function getUsage(userId: string) {
  const admin = createAdmin();
  const [{ data: profile }, { data: events }] = await Promise.all([
    admin.from("profiles").select("plan, plan_status").eq("id", userId).single(),
    admin.from("usage_events").select("kind").eq("user_id", userId).gte("created_at", periodStart()),
  ]);
  return summarize(profile, events);
}

/** Throws a 402-style error if the allowance is exhausted. */
export async function assertAllowance(userId: string, kind: Kind) {
  const { limits, used, plan } = await getUsage(userId);
  const k = KEY[kind] as "reviews" | "drafts" | "asks";
  if (used[k] >= limits[k]) {
    const err = new Error(`You have used all ${limits[k]} ${k} on the ${plan} plan this month. Upgrade to continue.`);
    (err as Error & { status?: number }).status = 402;
    throw err;
  }
}

export async function recordUsage(userId: string, kind: Kind, tokens: number) {
  await createAdmin().from("usage_events").insert({ user_id: userId, kind, tokens });
}

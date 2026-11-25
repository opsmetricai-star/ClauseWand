import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { createAdmin } from "@/lib/supabase/server";
import { PLANS } from "@/lib/brand";

/**
 * Payment confirmation endpoint. Configure your payment provider (Selar) to POST sale notifications here:
 *   https://YOUR_DOMAIN/api/billing/webhook?token=BILLING_WEBHOOK_SECRET
 * A redirect back from checkout NEVER activates a plan. Only this authenticated callback (or an admin) does.
 * The payload parser is deliberately tolerant; verify the exact field names against Selar's webhook docs
 * and a real test purchase, then tighten it. Unknown plans are recorded as 'unmatched' and not activated.
 */
function safeEq(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
const pick = (o: Record<string, unknown>, keys: string[]) => {
  for (const k of keys) { const v = k.split(".").reduce<unknown>((a, p) => (a && typeof a === "object" ? (a as Record<string, unknown>)[p] : undefined), o); if (v != null && v !== "") return v; }
};

export async function POST(req: Request) {
  const secret = process.env.BILLING_WEBHOOK_SECRET;
  const token = new URL(req.url).searchParams.get("token") ?? req.headers.get("x-webhook-token") ?? "";
  if (!secret || !safeEq(token, secret)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const raw = await req.json().catch(() => null) as Record<string, unknown> | null;
  if (!raw) return NextResponse.json({ error: "Bad payload" }, { status: 400 });

  const email = String(pick(raw, ["customer.email", "buyer.email", "email", "data.customer.email", "data.email"]) ?? "").toLowerCase();
  const amount = Number(pick(raw, ["amount", "total", "price", "data.amount", "data.total"]));
  const reference = String(pick(raw, ["reference", "order_id", "id", "transaction_id", "data.reference", "data.id"]) ?? "");
  const currency = String(pick(raw, ["currency", "data.currency"]) ?? "USD");
  const status = String(pick(raw, ["status", "data.status"]) ?? "success").toLowerCase();
  if (!email || !reference) return NextResponse.json({ error: "Missing email or reference" }, { status: 400 });
  if (!["success", "successful", "paid", "completed", "confirmed"].includes(status)) return NextResponse.json({ ok: true, ignored: status });

  const plan = PLANS.find((p) => p.price === Math.round(amount));
  const admin = createAdmin();
  const { data: profile } = await admin.from("profiles").select("id").ilike("email", email).maybeSingle();

  const ins = await admin.from("payments").insert({ reference, email, user_id: profile?.id ?? null, plan: plan?.id ?? "unmatched", amount, currency, status: plan ? "confirmed" : "unmatched", raw });
  if (ins.error?.code === "23505") return NextResponse.json({ ok: true, duplicate: true }); // idempotent
  if (ins.error) return NextResponse.json({ error: "Could not record payment" }, { status: 500 });

  if (plan && profile) {
    const renews = new Date(); renews.setMonth(renews.getMonth() + 1);
    await admin.from("profiles").update({ plan: plan.id, plan_status: "active", plan_renews_at: renews.toISOString() }).eq("id", profile.id);
    await admin.from("notifications").insert({ user_id: profile.id, title: `${plan.name} plan activated`, body: "Thank you. Your new allowances are live." });
  }
  // If no profile matches yet, the payment is stored and applied when an admin matches it (or the user signs up with that email and an admin re-runs activation).
  return NextResponse.json({ ok: true, activated: Boolean(plan && profile) });
}

# ClauseWand

AI contract review, drafting and Q&A for in-house teams and law firms. Next.js 16 · React 19 · TypeScript · Tailwind 4 · Supabase · Gemini.

## Setup
1. `npm install`
2. Create a Supabase project, run `supabase/schema.sql` in the SQL editor (tables, RLS, storage bucket).
3. Copy `.env.example` to `.env.local` and fill every value.
4. Supabase > Auth > URL Configuration: add `http://localhost:3000/auth/callback` and your production `/auth/callback`.
5. `npm run dev`

## Payments (Selar)
Pricing links live in `src/lib/brand.ts`. A redirect from checkout never activates a plan. Activation happens only via:
- `POST /api/billing/webhook?token=BILLING_WEBHOOK_SECRET` (configure in Selar; **verify field names against a real test sale** in `route.ts`), or
- the manual admin page `/app/admin` for emails in `ADMIN_EMAILS`.
Amounts of 47/57/97 map to Solo/Team/Firm. Customers must pay with the same email as their account.

## Deploy (Vercel)
Import the repo, set the env vars from `.env.example`, deploy. Set `BILLING_WEBHOOK_SECRET` before giving Selar the webhook URL.

## Known limitations
- Integrations (Word, Slack, email) are not built and are not advertised.
- Legal pages are templates and need review by counsel.
- Market comparison uses the model general knowledge, not a licensed dataset.
- Set NEXT_PUBLIC_SITE_URL and the Supabase Site URL to the production domain so email links never point at localhost.

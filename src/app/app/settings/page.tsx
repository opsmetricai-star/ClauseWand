import { createClient } from "@/lib/supabase/server";
import { Title } from "@/components/app/Views";
import { ProfileForm } from "@/components/app/Forms";

export const metadata = { title: "Settings" };
export default async function Page() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const { data: p } = await sb.from("profiles").select("full_name,organization").eq("id", user!.id).single();
  return (<><Title t="Settings" sub="Your account details." /><ProfileForm name={p?.full_name ?? ""} org={p?.organization ?? ""} email={user!.email ?? ""} />
    <p className="mt-6 max-w-[560px] text-[14px] text-muted">To change your password, log out and use “Forgot password?” on the login page.</p></>);
}

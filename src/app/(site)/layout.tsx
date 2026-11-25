import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { getUser } from "@/lib/supabase/server";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  return (
    <>
      <Header loggedIn={!!user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

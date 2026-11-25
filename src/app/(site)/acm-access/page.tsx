import { PageHero } from "@/components/site/Blocks";
import { ContactForm } from "@/components/site/ContactForm";
export const metadata = { title: "ACM early access" };
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Early access" title="Access the first autonomous contract management platform" sub="Join the waitlist. We are onboarding teams in small groups." />
      <section className="py-24"><div className="container-x max-w-[640px]"><ContactForm kind="acm_access" button="Request access" /></div></section>
    </>
  );
}

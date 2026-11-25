import { PageHero } from "@/components/site/Blocks";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata = { title: "Contact" };
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk about your contracts" sub="Questions, demos, partnerships or support. We reply within one business day." />
      <section className="py-24"><div className="container-x grid gap-12 lg:grid-cols-2"><div className="space-y-4 text-[18px] text-muted"><p>Prefer email? Write to the address on our company page and include your plan and account email for faster support.</p></div><ContactForm /></div></section>
    </>
  );
}

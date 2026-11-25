import { PageHero } from "@/components/site/Blocks";
import { ContactForm } from "@/components/site/ContactForm";
export const metadata = { title: "State of Legal Contracts" };
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Report" title="State of Legal Contracts 2026" sub="A report on how legal teams handle contract volume. The report is in preparation: register your interest to be notified on release." />
      <section className="py-24"><div className="container-x max-w-[640px]"><ContactForm kind="contact" button="Notify me" /></div></section>
    </>
  );
}

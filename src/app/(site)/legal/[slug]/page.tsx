import { notFound } from "next/navigation";
import { PageHero, Prose } from "@/components/site/Blocks";
import { BRAND } from "@/lib/brand";

const DOCS: Record<string, { t: string; s: [string, string][] }> = {
  "terms-of-service": { t: "Terms of Service", s: [["Acceptance", `By using ${BRAND.name} you agree to these terms.`], ["The service", "We provide AI-assisted contract review, drafting and analysis tools. Output is decision support and not legal advice."], ["Your content", "You retain ownership of the documents you upload. You grant us the limited right to process them to provide the service."], ["Acceptable use", "Do not upload content you have no right to use, attempt to breach security, or resell the service without agreement."], ["Billing", "Paid plans are billed through our payment partner and renew monthly unless cancelled."], ["Liability", "To the extent permitted by law, the service is provided as is."]] },
  "privacy-policy": { t: "Privacy Policy", s: [["What we collect", "Account details, documents you upload, usage data and billing status."], ["How we use it", "To operate the service, enforce usage limits and provide support. Documents are not used to train models."], ["Processors", "We use a database and storage provider and an AI model provider to process documents on our behalf."], ["Your rights", "You may access, export or delete your data at any time from your account or by contacting us."]] },
  "refund-policy": { t: "Refund Policy", s: [["Refunds", "If a paid plan is not the right fit, request a refund within 7 days of purchase through your payment receipt, subject to fair use."], ["How to request", "Include your account email and payment reference with the request."]] },
  "vulnerability-disclosure": { t: "Vulnerability Disclosure", s: [["Reporting", "If you believe you have found a security issue, report it to the account owner of this service with the subject 'Security'."], ["Our commitment", "We will acknowledge reports promptly, investigate in good faith and not pursue researchers acting responsibly."]] },
};
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(DOCS).map((slug) => ({ slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DOCS[slug];
  if (!d) notFound();
  return (<><PageHero eyebrow="Legal" title={d.t} sub="Last updated November 2026." /><Prose>{d.s.map(([h, b]) => <div key={h}><h2>{h}</h2><p>{b}</p></div>)}</Prose></>);
}

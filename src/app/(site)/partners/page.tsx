import { InfoPage } from "@/components/site/InfoPage";
export const metadata = { title: "Partners" };
export default function Page() {
  return <InfoPage d={{ eyebrow: "Community", title: "Partner with ClauseWand", sub: "Consultancies, legal-ops providers and technology vendors helping legal teams modernise.", cta: ["Become a partner", "/contact"], cards: [
    { t: "Referral partners", d: "Introduce clients and earn a share of subscription revenue." }, { t: "Implementation partners", d: "Help teams write playbooks and roll out to the business." }, { t: "Technology partners", d: "Build integrations for the tools legal teams use." },
  ] }} />;
}

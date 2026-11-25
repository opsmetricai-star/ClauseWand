import { InfoPage } from "@/components/site/InfoPage";
export const metadata = { title: "Guides & Reports" };
export default function Page() {
  return <InfoPage d={{ eyebrow: "Resources", title: "Guides & Reports", sub: "Practical playbooks and research for legal teams adopting AI.", cards: [
    { t: "State of Contracts 2026", d: "How legal teams are handling contract volume.", href: "/state-of-legal-contracts" }, { t: "First-pass review checklist", d: "Nine checks to run on every contract.", href: "/blog/first-pass-review-checklist" }, { t: "Writing your first playbook", d: "Ten rules, one fallback each.", href: "/blog/writing-your-first-playbook" },
  ] }} />;
}

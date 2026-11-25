import { InfoPage } from "@/components/site/InfoPage";
export const metadata = { title: "About" };
export default function Page() {
  return <InfoPage d={{ eyebrow: "About ClauseWand", title: "We are building the AI operating layer for contracts", sub: "Contract work should not depend on copy, paste and late nights. ClauseWand automates the analysis so people can focus on decisions.", cta: ["Sign up", "/signup"], cardsTitle: "Principles", cards: [
    { t: "AI at the core", d: "The engine is the product. Analysis, scoring, drafting and routing all run on it." },
    { t: "Judgment stays human", d: "AI does the first pass. People make the call, and every finding shows its reasoning." },
    { t: "Confidentiality first", d: "Documents are isolated per user and never used to train models." },
    { t: "Your standards, enforced", d: "Playbooks encode your positions, and the engine applies them consistently." },
    { t: "Grounded answers", d: "Answers quote the contract. When a document is silent, the engine says so." },
    { t: "Transparent pricing", d: "Three plans and a free tier, with allowances visible in your workspace." },
  ] }} />;
}

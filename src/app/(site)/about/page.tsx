import { InfoPage } from "@/components/site/InfoPage";
export const metadata = { title: "About" };
export default function Page() {
  return <InfoPage d={{ eyebrow: "About", title: "We help lawyers do more of the work they love", sub: "Contract work should not mean copy, paste and late nights. We build tools that take the repetition away and leave the judgment with you.", cta: ["Get started for free", "/signup"], cardsTitle: "What we believe", cards: [
    { t: "Judgment stays human", d: "AI does the first pass. Lawyers make the call, and every suggestion shows its reasoning." },
    { t: "Confidentiality first", d: "Client documents are never used for training, and access is isolated per user." },
    { t: "Your standards, not ours", d: "The product adapts to your playbooks instead of imposing a generic view of risk." },
    { t: "Built with practitioners", d: "Features start from real matters: diligence, vendor paper, NDAs and renewals." },
    { t: "Honest about limits", d: "We label what is live and what is planned, and we show when an answer is uncertain." },
    { t: "Plain-language pricing", d: "Three simple plans and a free tier, with allowances you can see in your dashboard." },
  ] }} />;
}

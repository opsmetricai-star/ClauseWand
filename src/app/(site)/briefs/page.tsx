import { InfoPage } from "@/components/site/InfoPage";
export const metadata = { title: "Briefs" };
export default function Page() {
  return <InfoPage d={{ eyebrow: "Resources", title: "Briefs", sub: "Short, practical write-ups on a single contract topic.", cards: [
    { t: "Limitation of liability in SaaS", d: "Caps, carve-outs and super-caps in two pages." }, { t: "Auto-renewal traps", d: "Notice windows and how to calendar them." }, { t: "Data processing addenda", d: "What to check before you sign." },
  ] }} />;
}

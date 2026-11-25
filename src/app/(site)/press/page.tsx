import { InfoPage } from "@/components/site/InfoPage";
export const metadata = { title: "Press" };
export default function Page() {
  return <InfoPage d={{ eyebrow: "Press", title: "ClauseWand in the news", sub: "Press enquiries, brand assets and media resources.", cta: ["Press enquiries", "/contact"], cards: [
    { t: "Brand kit", d: "Logo, colours and usage guidelines available on request." }, { t: "Company facts", d: "Founded to bring AI-assisted review to every legal team." }, { t: "Media contact", d: "Use the contact form and mention 'Press'." },
  ] }} />;
}

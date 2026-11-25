import { InfoPage } from "@/components/site/InfoPage";
export const metadata = { title: "Careers" };
export default function Page() {
  return <InfoPage d={{ eyebrow: "Careers", title: "Build the future of contract work", sub: "A small team shipping carefully for people whose work depends on precision.", cta: ["Say hello", "/contact"], cardsTitle: "Open roles (sample)", cards: [
    { t: "Senior Full-Stack Engineer", d: "Next.js, TypeScript, Postgres. Remote." }, { t: "Legal Content Engineer", d: "Turn legal expertise into playbooks and evaluations. Remote." }, { t: "Customer Success Manager", d: "Help legal teams adopt and measure. Remote." },
  ] }} />;
}

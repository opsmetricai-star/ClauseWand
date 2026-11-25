import { InfoPage } from "@/components/site/InfoPage";
export const metadata = { title: "Learn" };
export default function Page() {
  return <InfoPage d={{ eyebrow: "Resources", title: "Learn contract review with AI", sub: "Short lessons that take you from first upload to a team-wide playbook.", cards: [
    { t: "1. Your first review", d: "Upload a contract and read the findings." }, { t: "2. Build a playbook", d: "Turn your positions into rules.", href: "/features/playbooks" }, { t: "3. Draft with precedents", d: "Generate from approved language.", href: "/features/draft" }, { t: "4. Ask your contracts", d: "Query documents in plain language.", href: "/features/ask" }, { t: "5. Benchmark clauses", d: "Compare to market standards.", href: "/features/compare" }, { t: "6. Roll out to the team", d: "Share playbooks and track usage." },
  ] }} />;
}

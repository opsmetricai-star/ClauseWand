import { InfoPage } from "@/components/site/InfoPage";
export const metadata = { title: "Academic program" };
export default function Page() {
  return <InfoPage d={{ eyebrow: "Community", title: "Academic program", sub: "Give the next generation of lawyers hands-on experience with legal AI.", cta: ["Apply for access", "/contact"], cards: [
    { t: "Law schools", d: "Classroom access for clinics and contract drafting courses." }, { t: "Students", d: "Discounted access for students building a practice." }, { t: "Researchers", d: "Collaborate on evaluation of legal AI quality." },
  ] }} />;
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { STORIES } from "@/lib/content";
import { PageHero, Prose } from "@/components/site/Blocks";

export const dynamicParams = false;
export function generateStaticParams() { return STORIES.map((s) => ({ slug: s.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = STORIES.find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageHero eyebrow={`Customer story · ${s.tag}`} title={s.t} sub={`${s.co}: ${s.metric} ${s.ml}. (Sample story with a fictional company.)`} />
      <Prose>
        <h2>The challenge</h2><p>{s.co} needed to handle growing contract volume without growing headcount, and without lowering the standard of review.</p>
        <h2>The approach</h2><p>The team encoded its negotiating positions as playbooks, ran every inbound agreement through a first-pass review, and reserved lawyer time for the clauses that mattered.</p>
        <h2>The result</h2><p>“{s.q}”</p><p><b>{s.metric}</b> {s.ml}.</p>
        <p><Link href="/signup">Start your own pilot →</Link></p>
      </Prose>
    </>
  );
}

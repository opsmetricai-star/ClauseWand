import { notFound } from "next/navigation";
import { POSTS } from "@/lib/content";
import { PageHero, Prose } from "@/components/site/Blocks";

export const dynamicParams = false;
export function generateStaticParams() { return POSTS.map((p) => ({ slug: p.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();
  return (<><PageHero eyebrow={`${p.tag} · ${p.date}`} title={p.t} sub={p.d} /><Prose>{p.body.map((b) => <p key={b}>{b}</p>)}</Prose></>);
}

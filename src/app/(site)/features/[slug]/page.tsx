import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/content";
import { FeaturePage } from "@/components/site/Blocks";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(FEATURES).filter((k) => k !== "associate").map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const d = FEATURES[slug]; return { title: d ? `${d.title}` : "Feature" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = FEATURES[slug];
  if (!d || slug === "associate") notFound();
  return <FeaturePage d={d} />;
}

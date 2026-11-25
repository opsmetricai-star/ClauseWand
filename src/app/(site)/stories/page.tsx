import Link from "next/link";
import { STORIES } from "@/lib/content";
import { PageHero } from "@/components/site/Blocks";

export const metadata = { title: "Customer stories" };
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Customers" title="Legal teams getting more done" sub="Sample stories shown with fictional companies. Replace with real, permissioned customer stories before launch." />
      <section className="py-20"><div className="container-x grid gap-6 md:grid-cols-2">
        {STORIES.map((s) => (
          <Link key={s.slug} href={`/stories/${s.slug}`} className="group">
            <div className={`flex h-[360px] flex-col justify-between rounded-sm bg-gradient-to-br ${s.img} p-8 text-white`}>
              <span className="font-serif text-[28px]">{s.co}</span>
              <div className="flex items-end justify-between"><p className="max-w-[360px] text-[20px] leading-snug">“{s.q}”</p><div className="text-right"><div className="font-serif text-[48px] leading-none">{s.metric}</div><div className="text-[13px] text-white/80">{s.ml}</div></div></div>
            </div>
            <div className="mt-4 text-[13px] text-muted">{s.tag}</div>
            <h2 className="font-serif text-[28px] tracking-tight group-hover:underline">{s.t}</h2>
          </Link>
        ))}
      </div></section>
    </>
  );
}

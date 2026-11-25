import Link from "next/link";
import { PageHero } from "@/components/site/Blocks";
import { POSTS } from "@/lib/content";
export const metadata = { title: "Blog" };
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Blog" sub="Notes on contract practice, playbooks and legal AI." />
      <section className="py-24"><div className="container-x grid gap-8 md:grid-cols-2">
        {POSTS.map((p) => <Link key={p.slug} href={`/blog/${p.slug}`} className="group border-t border-ink pt-5"><div className="text-[13px] text-muted">{p.tag} · {p.date}</div><h2 className="mt-2 font-serif text-[32px] leading-tight tracking-tight group-hover:underline">{p.t}</h2><p className="mt-2 text-muted">{p.d}</p></Link>)}
      </div></section>
    </>
  );
}

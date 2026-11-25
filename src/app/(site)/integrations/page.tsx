import { PageHero } from "@/components/site/Blocks";
import { INTEGRATIONS } from "@/lib/content";

export const metadata = { title: "Integrations" };
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Platform" title="Works with your existing systems" sub="Connect ClauseWand to the tools your team already lives in. Integrations marked 'Planned' are on the roadmap and not yet live." />
      <section className="py-24"><div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INTEGRATIONS.map(([n, d], i) => (
          <div key={n} className="rounded border border-line p-6">
            <div className="flex items-center justify-between"><h2 className="font-serif text-[26px]">{n}</h2><span className="rounded-full bg-accent-light px-2.5 py-0.5 text-[12px]">{i === 3 ? "Upload via email: planned" : "Planned"}</span></div>
            <p className="mt-3 text-muted">{d}</p>
          </div>
        ))}
      </div></section>
    </>
  );
}

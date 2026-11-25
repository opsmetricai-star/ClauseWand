import Link from "next/link";
import { FOOTER, BRAND } from "@/lib/brand";
import { Logo } from "./Logo";

export function CtaBand({ title = "Put an AI engine in charge of your contract pipeline" }: { title?: string }) {
  return (
    <section className="mode-dark py-24">
      <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <h2 className="h-display t-2 max-w-[760px]">{title}</h2>
        <div className="flex gap-3">
          <Link href="/signup" className="btn btn-light">Sign up</Link>
          <Link href="/login" className="btn btn-ghost text-white">Log in</Link>
        </div>
      </div>
    </section>
  );
}

export default function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <>
      {cta && <CtaBand />}
      <footer className="mode-dark border-t border-white/10 pb-10 pt-16">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
            {FOOTER.map((c) => (
              <div key={c.h}>
                <h3 className="mb-4 text-[15px] font-medium text-white">{c.h}</h3>
                <ul className="space-y-2.5">
                  {c.l.map(([t, h]) => (
                    <li key={t}><Link href={h} className="text-[14px] text-white/65 hover:text-white">{t}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
            <Logo />
            <div className="flex flex-wrap gap-2 text-[12px] text-white/70">
              {["Row-level data isolation", "No training on your documents"].map((b) => <span key={b} className="rounded-full border border-white/20 px-3 py-1">{b}</span>)}
            </div>
            <p className="text-[13px] text-white/50">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

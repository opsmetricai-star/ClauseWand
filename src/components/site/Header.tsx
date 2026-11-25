"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV, BRAND } from "@/lib/brand";
import { Logo } from "./Logo";

type Item = { t: string; d?: string; h: string };

function Col({ title, items, onNav }: { title: string; items: Item[]; onNav: () => void }) {
  return (
    <div>
      <div className="mb-3 text-[14px] text-white/50">{title}</div>
      <ul>
        {items.map((i) => (
          <li key={i.h} className="border-b border-white/10 first:pt-0">
            <Link href={i.h} onClick={onNav} className="block py-3 text-white hover:text-wand">
              <div className="text-[16px] font-medium">{i.t}</div>
              {i.d && <div className="mt-0.5 text-[14px] text-white/70">{i.d}</div>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Promo({ kicker, title, href, grad }: { kicker: string; title: string; href: string; grad: string }) {
  return (
    <Link href={href} className="block rounded bg-white/[0.03] p-0 hover:bg-white/[0.06]">
      <div className={`flex h-[190px] items-end rounded-t bg-gradient-to-br ${grad} p-4`}>
        <span className="rounded-full border border-white/70 px-3 py-0.5 text-[12px] text-white">{kicker}</span>
      </div>
      <div className="p-4 text-[16px] font-medium leading-snug text-white">{title}</div>
    </Link>
  );
}

export default function Header({ loggedIn = false }: { loggedIn?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const close = () => { setOpen(null); setMobile(false); };

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  const trig = (k: string, label: string) => (
    <button
      aria-expanded={open === k}
      onClick={() => setOpen(open === k ? null : k)}
      onMouseEnter={() => setOpen(k)}
      className={`inline-flex items-center gap-1.5 rounded px-3 py-2 text-[16px] font-medium text-white ${open === k ? "bg-white/10" : "hover:bg-white/5"}`}
    >
      {label} <ChevronDown size={16} className={`transition-transform ${open === k ? "rotate-180" : ""}`} />
    </button>
  );

  return (
    <header ref={ref} className="relative z-50 bg-ink text-white" onMouseLeave={() => setOpen(null)}>
      <div className="container-x">
        <div className="flex h-[74px] items-center justify-between border-b border-white/10">
          <Link href="/" aria-label={BRAND.name} onClick={close}><Logo /></Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {trig("product", "Product")}
            {trig("solutions", "Solutions")}
            {trig("resources", "Resources")}
            <Link href="/pricing" className="rounded px-3 py-2 font-medium hover:bg-white/5" onMouseEnter={() => setOpen(null)}>Pricing</Link>
            <Link href="/security" className="rounded px-3 py-2 font-medium hover:bg-white/5" onMouseEnter={() => setOpen(null)}>Security</Link>
          </nav>
          <div className="hidden items-center gap-6 lg:flex">
            <Link href={loggedIn ? "/app" : "/login"} className="font-medium hover:text-wand">{loggedIn ? "Dashboard" : "Log in"}</Link>
            {!loggedIn && <Link href="/signup" className="btn btn-light !px-6 !py-[17px]">Sign up</Link>}
          </div>
          <button className="lg:hidden" aria-label="Menu" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
        </div>
      </div>

      {/* desktop mega panels */}
      {open && (
        <div className="absolute inset-x-0 top-full hidden bg-ink pb-12 pt-10 shadow-2xl lg:block reveal" style={{ animationDuration: ".18s" }}>
          <div className="container-x">
            {open === "product" && (
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-8 pl-[19%]">
                <Col title="Features" items={NAV.product.features} onNav={close} />
                <Col title="Products" items={NAV.product.products} onNav={close} />
                <div className="col-span-2 -mt-1 max-w-[290px]"><Promo kicker="Autonomous contract management" title="An AI system that captures, reviews and routes every contract." href="/acm" grad="from-teal-800 to-slate-800" /></div>
              </div>
            )}
            {open === "solutions" && (
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-8 pl-[19%]">
                <Col title="By Industry" items={NAV.industries} onNav={close} />
                <Col title="By Use Case" items={NAV.useCases} onNav={close} />
                <div className="col-span-2 max-w-[290px]"><Promo kicker="Playbooks" title="Turn your negotiating standards into rules the AI enforces." href="/features/playbooks" grad="from-sky-800 to-slate-800" /></div>
              </div>
            )}
            {open === "resources" && (
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-8 pl-[19%]">
                <Col title="Learn" items={NAV.resources.learn} onNav={close} />
                <Col title="Tools" items={NAV.resources.tools} onNav={close} />
                <div className="col-span-2 max-w-[290px]"><Promo kicker="Tool" title="Model the time and cost your team recovers with ClauseWand." href="/roi-calculator" grad="from-amber-800 to-stone-800" /></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* mobile */}
      {mobile && (
        <div className="max-h-[calc(100vh-74px)] overflow-y-auto border-t border-white/10 bg-ink lg:hidden">
          <div className="container-x py-4">
            {([
              ["Product", [...NAV.product.features, ...NAV.product.products]],
              ["Solutions", [...NAV.industries, ...NAV.useCases]],
              ["Resources", [...NAV.resources.learn, ...NAV.resources.tools]],
            ] as [string, Item[]][]).map(([k, items]) => (
              <div key={k} className="border-b border-white/10">
                <button className="flex w-full items-center justify-between py-4 text-[18px] font-medium" onClick={() => setAcc(acc === k ? null : k)}>
                  {k}<ChevronDown size={18} className={acc === k ? "rotate-180" : ""} />
                </button>
                {acc === k && <ul className="pb-3">{items.map((i) => <li key={i.h}><Link href={i.h} onClick={close} className="block py-2 text-white/80">{i.t}</Link></li>)}</ul>}
              </div>
            ))}
            <Link href="/pricing" onClick={close} className="block border-b border-white/10 py-4 text-[18px] font-medium">Pricing</Link>
            <Link href="/security" onClick={close} className="block border-b border-white/10 py-4 text-[18px] font-medium">Security</Link>
            <div className="flex gap-3 py-5">
              <Link href={loggedIn ? "/app" : "/login"} onClick={close} className="btn btn-ghost flex-1">{loggedIn ? "Dashboard" : "Log in"}</Link>
              {!loggedIn && <Link href="/signup" onClick={close} className="btn btn-light flex-1">Sign up</Link>}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

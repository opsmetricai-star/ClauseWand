"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, FileText, BookMarked, PenLine, Library, CreditCard, Settings, Bell, Menu, X, ShieldCheck, LogOut } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const ITEMS = [
  { h: "/app", t: "Dashboard", i: LayoutDashboard, exact: true },
  { h: "/app/contracts", t: "Contracts", i: FileText },
  { h: "/app/playbooks", t: "Playbooks", i: BookMarked },
  { h: "/app/draft", t: "Draft", i: PenLine },
  { h: "/app/library", t: "Clause library", i: Library },
  { h: "/app/notifications", t: "Notifications", i: Bell },
  { h: "/app/billing", t: "Billing", i: CreditCard },
  { h: "/app/settings", t: "Settings", i: Settings },
];

export default function Sidebar({ name, plan, unread, admin, usage }: { name: string; plan: string; unread: number; admin: boolean; usage: { l: string; u: number; m: number }[] }) {
  const path = usePathname(); const [open, setOpen] = useState(false);
  const nav = (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5"><Link href="/"><Logo /></Link></div>
      <nav className="flex-1 space-y-0.5 px-3">
        {[...ITEMS, ...(admin ? [{ h: "/app/admin", t: "Admin", i: ShieldCheck }] : [])].map((x) => {
          const on = (x as { exact?: boolean }).exact ? path === x.h : path.startsWith(x.h);
          return (
            <Link key={x.h} href={x.h} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded px-3 py-2.5 text-[15px] ${on ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"}`}>
              <x.i size={18} strokeWidth={1.6} />{x.t}
              {x.t === "Notifications" && unread > 0 && <span className="ml-auto rounded-full bg-wand px-2 text-[11px] font-medium text-ink">{unread}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-3 border-t border-white/10 p-4">
        <div className="text-[12px] uppercase tracking-wider text-white/50">{plan} plan · this month</div>
        {usage.map((u) => (
          <div key={u.l}><div className="mb-1 flex justify-between text-[12px] text-white/70"><span>{u.l}</span><span>{u.u}/{u.m}</span></div><div className="h-1 rounded bg-white/10"><div className={`h-1 rounded ${u.u >= u.m ? "bg-red-400" : "bg-wand"}`} style={{ width: `${Math.min(100, (u.u / u.m) * 100)}%` }} /></div></div>
        ))}
        <div className="flex items-center justify-between pt-1 text-[14px] text-white/80"><span className="truncate">{name}</span>
          <form action="/auth/logout" method="post"><button aria-label="Log out" className="text-white/60 hover:text-white"><LogOut size={16} /></button></form></div>
      </div>
    </div>
  );
  return (
    <>
      <div className="mode-dark flex items-center justify-between px-4 py-3 lg:hidden"><Link href="/app"><Logo /></Link><button aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
      {open && <div className="mode-dark fixed inset-x-0 bottom-0 top-[56px] z-40 overflow-y-auto lg:hidden">{nav}</div>}
      <aside className="mode-dark sticky top-0 hidden h-screen w-[260px] flex-none lg:block">{nav}</aside>
    </>
  );
}

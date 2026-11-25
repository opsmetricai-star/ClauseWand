import { Check, AlertTriangle, FileText, Sparkles } from "lucide-react";

/** CSS-built product window used on the hero and feature pages. */
export function ReviewMock({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  const bg = dark ? "bg-[#161d20] border-white/10 text-white" : "bg-white border-line text-ink";
  const sub = dark ? "text-white/60" : "text-muted";
  return (
    <div className={`overflow-hidden rounded-md border shadow-2xl ${bg} ${className}`}>
      <div className={`flex items-center gap-2 border-b px-4 py-3 ${dark ? "border-white/10" : "border-line"}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className={`ml-3 flex items-center gap-1.5 text-[13px] ${sub}`}><FileText size={14} /> Master Services Agreement — Vendor.docx</span>
      </div>
      <div className="grid md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3 p-5 text-[13px] leading-relaxed">
          <p className="font-medium">12. Limitation of Liability</p>
          <p className={sub}>12.1 Neither party shall be liable for indirect or consequential loss.</p>
          <p className="rounded bg-red-500/15 p-2 ring-1 ring-red-400/40">12.2 <b>Supplier’s total liability is unlimited</b> for breach of Section 9, while Customer’s liability is capped at fees paid in the preceding three months.</p>
          <p className="font-medium">13. Term and Renewal</p>
          <p className="rounded bg-amber-400/15 p-2 ring-1 ring-amber-400/40">13.1 This Agreement renews automatically for successive three-year terms unless notice is given <b>180 days</b> before expiry.</p>
          <p className={sub}>13.2 Either party may terminate for material breach on thirty days’ notice.</p>
        </div>
        <div className={`space-y-3 border-l p-4 ${dark ? "border-white/10 bg-white/[0.03]" : "border-line bg-accent-light"}`}>
          <div className="flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wider text-teal-500"><Sparkles size={13} /> AI review · 3 findings</div>
          {[{ c: "red", t: "Asymmetric liability", d: "Your playbook requires mutual caps. Suggest: each party capped at 12 months’ fees." }, { c: "amber", t: "Long auto-renewal", d: "Fallback: 12-month renewal with 30 days’ notice." }].map((f) => (
            <div key={f.t} className={`rounded p-3 text-[12.5px] ring-1 ${dark ? "bg-black/30 ring-white/10" : "bg-white ring-line"}`}>
              <div className="mb-1 flex items-center gap-1.5 font-medium"><AlertTriangle size={13} className={f.c === "red" ? "text-red-400" : "text-amber-400"} />{f.t}</div>
              <p className={sub}>{f.d}</p>
              <span className="mt-2 inline-block rounded bg-teal-400/20 px-2 py-0.5 text-[11px] text-teal-500">Accept redline</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-[12.5px] text-emerald-500"><Check size={14} /> 11 clauses within playbook</div>
        </div>
      </div>
    </div>
  );
}

export function StepMock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-line bg-white p-6 shadow-xl">
      <div className="mb-4 flex items-center gap-2 text-[13px] font-medium text-muted"><Sparkles size={14} className="text-teal-500" />{title}</div>
      <ul className="space-y-3">
        {items.map((i, n) => (
          <li key={i} className="flex items-start gap-3 rounded border border-line bg-accent-light p-3 text-[14px]">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-[11px] text-white">{n + 1}</span>{i}
          </li>
        ))}
      </ul>
    </div>
  );
}

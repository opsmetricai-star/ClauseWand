"use client";
import { useState } from "react";
import { PageHero } from "@/components/site/Blocks";

export default function Page() {
  const [n, setN] = useState(120);   // contracts per month
  const [h, setH] = useState(3);     // hours per contract today
  const [rate, setRate] = useState(90); // cost per hour
  const [save, setSave] = useState(60); // % time saved
  const hours = n * h * (save / 100);
  const money = hours * rate;
  const f = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const Row = ({ l, v, set, min, max, step = 1, suf = "" }: { l: string; v: number; set: (x: number) => void; min: number; max: number; step?: number; suf?: string }) => (
    <div><label className="lbl flex justify-between"><span>{l}</span><span>{v}{suf}</span></label><input type="range" className="w-full accent-ink" min={min} max={max} step={step} value={v} onChange={(e) => set(+e.target.value)} /></div>
  );
  return (
    <>
      <PageHero eyebrow="Tools" title="ROI calculator" sub="Estimate time and cost saved. The savings rate is an assumption you control, not a guarantee." />
      <section className="py-24"><div className="container-x grid gap-12 lg:grid-cols-2">
        <div className="space-y-8 rounded border border-line p-8">
          <Row l="Contracts reviewed per month" v={n} set={setN} min={5} max={1000} step={5} />
          <Row l="Hours per contract today" v={h} set={setH} min={0.5} max={12} step={0.5} />
          <Row l="Cost per hour (USD)" v={rate} set={setRate} min={20} max={500} step={5} />
          <Row l="Estimated time saved" v={save} set={setSave} min={10} max={90} step={5} suf="%" />
        </div>
        <div className="mode-dark flex flex-col justify-center rounded p-10">
          <div className="text-white/60">Hours saved per month</div><div className="h-display text-[88px] leading-none">{f(hours)}</div>
          <div className="mt-8 text-white/60">Estimated value per month</div><div className="h-display text-[64px] leading-none">${f(money)}</div>
          <div className="mt-8 text-white/60">Per year</div><div className="h-display text-[40px]">${f(money * 12)}</div>
        </div>
      </div></section>
    </>
  );
}

import { BRAND } from "@/lib/brand";

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="cw-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5eead4" /><stop offset="1" stopColor="#0ea5e9" /></linearGradient>
        <linearGradient id="cw-b" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#f59e0b" /><stop offset="1" stopColor="#ef4444" /></linearGradient>
      </defs>
      <path d="M3 9 16 3l13 6-13 7z" fill="url(#cw-a)" />
      <path d="M3 9l13 7v14L3 17z" fill="url(#cw-b)" />
      <path d="M29 9 16 16v14l13-13z" fill="#8b5cf6" />
      <path d="M24 2l.9 2.1L27 5l-2.1.9L24 8l-.9-2.1L21 5l2.1-.9z" fill="#fff" />
    </svg>
  );
}

export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark />
      <span className={`font-serif text-[28px] leading-none tracking-[-0.04em] ${dark ? "text-white" : "text-ink"}`}>{BRAND.name}</span>
    </span>
  );
}

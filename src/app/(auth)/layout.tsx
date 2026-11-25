import Link from "next/link";
import { Logo } from "@/components/site/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mode-dark relative flex min-h-screen flex-col">
      <div className="container-x flex h-[74px] items-center"><Link href="/"><Logo /></Link></div>
      <div className="flex flex-1 items-center justify-center px-5 pb-16">{children}</div>
    </div>
  );
}

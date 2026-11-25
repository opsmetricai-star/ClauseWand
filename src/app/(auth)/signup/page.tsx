import { Suspense } from "react";
import AuthForm from "@/components/site/AuthForm";
import { supabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "signup" };
export default function Page() { return <Suspense><AuthForm mode="signup" configured={supabaseConfigured()} /></Suspense>; }

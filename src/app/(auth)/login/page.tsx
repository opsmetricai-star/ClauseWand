import { Suspense } from "react";
import AuthForm from "@/components/site/AuthForm";
import { supabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "login" };
export default function Page() { return <Suspense><AuthForm mode="login" configured={supabaseConfigured()} /></Suspense>; }

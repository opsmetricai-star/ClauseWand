import { FEATURES } from "@/lib/content";
import { FeaturePage } from "@/components/site/Blocks";

export const metadata = { title: "Associate — the AI agent for transactional law" };
export default function Page() { return <FeaturePage d={FEATURES.associate} />; }

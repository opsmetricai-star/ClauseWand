// Single source of truth for the brand. Rename here and everywhere updates.
export const BRAND = {
  name: "ClauseWand",
  tagline: "Automate reviews, streamline negotiations, and keep every deal moving around the clock.",
  email: "hello@clausewand.com",
};

// Payment links supplied by the owner (Selar). Verified activation happens server-side, see /api/billing/webhook.
export const PLANS = [
  {
    id: "solo", name: "Solo", price: 47, cadence: "per month", url: "https://selar.com/47plan?currency=USD",
    blurb: "For independent counsel and founders who review contracts on their own.",
    limits: { reviews: 30, drafts: 30, asks: 100, playbooks: 3 },
    features: ["30 contract reviews / month", "30 AI drafts / month", "100 Ask questions / month", "3 custom playbooks", "Contract repository", "Email support"],
  },
  {
    id: "team", name: "Team", price: 57, cadence: "per month", url: "https://selar.com/57plan?currency=USD", popular: true,
    blurb: "For small legal teams that need shared standards and higher volume.",
    limits: { reviews: 150, drafts: 150, asks: 500, playbooks: 15 },
    features: ["150 contract reviews / month", "150 AI drafts / month", "500 Ask questions / month", "15 shared playbooks", "Market comparison", "Priority support"],
  },
  {
    id: "firm", name: "Firm", price: 97, cadence: "per month", url: "https://selar.com/97plan?currency=USD",
    blurb: "For law firms and in-house departments running contracts at scale.",
    limits: { reviews: 1000, drafts: 1000, asks: 3000, playbooks: 100 },
    features: ["1,000 contract reviews / month", "1,000 AI drafts / month", "3,000 Ask questions / month", "100 playbooks", "Associate multi-document projects", "Dedicated onboarding"],
  },
] as const;
export const FREE_LIMITS = { reviews: 3, drafts: 3, asks: 10, playbooks: 1 };
export type PlanId = "free" | (typeof PLANS)[number]["id"];

export const NAV = {
  product: {
    features: [
      { t: "Review", d: "Redline contracts and catch risks", h: "/features/review" },
      { t: "Associate", d: "Multi-document workflows", h: "/associate" },
      { t: "Draft", d: "Draft from scratch or saved libraries", h: "/features/draft" },
      { t: "Compare", d: "Compare contracts to industry standards", h: "/features/compare" },
      { t: "Ask", d: "Quick answers to complex questions", h: "/features/ask" },
      { t: "Playbooks", d: "Encode your legal standards", h: "/features/playbooks" },
    ],
    products: [{ t: "Autonomous Contract Management", d: "Powering contracts end-to-end", h: "/acm" }],
    platform: [{ t: "Integrations", d: "Works with your existing systems", h: "/integrations" }],
  },
  industries: [
    { t: "Energy", h: "/solutions/energy" },
    { t: "Healthcare", h: "/solutions/healthcare" },
    { t: "Financial Services", h: "/solutions/financial-services" },
    { t: "Technology", h: "/solutions/technology" },
    { t: "Manufacturing", h: "/solutions/manufacturing" },
    { t: "Retail & Consumer Goods", h: "/solutions/retail-consumer-goods" },
  ],
  useCases: [
    { t: "In-House", h: "/solutions/in-house-legal" },
    { t: "Law Firms", h: "/solutions/law-firms" },
  ],
  resources: {
    learn: [
      { t: "Blog", h: "/blog" },
      { t: "Guides & Reports", h: "/guides-reports" },
      { t: "Learn", h: "/learn" },
      { t: "Newsletter", h: "/newsletter" },
    ],
    tools: [
      { t: "Clause Index", h: "/clause-index" },
      { t: "Briefs", h: "/briefs" },
      { t: "ROI Calculator", h: "/roi-calculator" },
      { t: "State of Contracts", h: "/state-of-legal-contracts" },
    ],
  },
};

export const FOOTER: { h: string; l: [string, string][] }[] = [
  { h: "Product", l: [["Review", "/features/review"], ["Associate", "/associate"], ["Draft", "/features/draft"], ["Compare", "/features/compare"], ["Ask", "/features/ask"], ["Playbooks", "/features/playbooks"], ["Autonomous Contract Management", "/acm"], ["Integrations", "/integrations"], ["Pricing", "/pricing"]] },
  { h: "Solutions", l: [["In-House", "/solutions/in-house-legal"], ["Law Firms", "/solutions/law-firms"], ["Energy", "/solutions/energy"], ["Healthcare", "/solutions/healthcare"], ["Financial Services", "/solutions/financial-services"], ["Technology", "/solutions/technology"], ["Manufacturing", "/solutions/manufacturing"], ["Retail & Consumer Goods", "/solutions/retail-consumer-goods"]] },
  { h: "Resources", l: [["Blog", "/blog"], ["Guides & Reports", "/guides-reports"], ["Learn", "/learn"], ["Clause Index", "/clause-index"], ["Briefs", "/briefs"], ["ROI Calculator", "/roi-calculator"], ["Customer Stories", "/stories"], ["State of Contracts", "/state-of-legal-contracts"]] },
  { h: "Company", l: [["About", "/about"], ["Careers", "/careers"], ["Press", "/press"], ["Contact", "/contact"], ["Security", "/security"]] },
  { h: "Community", l: [["Partners", "/partners"], ["Academic Program", "/academic"], ["Newsletter", "/newsletter"]] },
  { h: "Support", l: [["Help Center", "/contact"], ["Terms of Service", "/legal/terms-of-service"], ["Privacy Policy", "/legal/privacy-policy"], ["Refund Policy", "/legal/refund-policy"], ["Vulnerability Disclosure", "/legal/vulnerability-disclosure"]] },
];

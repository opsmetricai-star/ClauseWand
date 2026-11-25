// Marketing copy. No customer names, quotes or statistics appear here until real, permissioned ones exist.

export type Bullet = { t: string; d: string };
export type FeaturePageData = {
  slug: string; badge: string; title: string; sub: string; href: string;
  steps: Bullet[]; blocks: { t: string; d: string; list?: string[] }[]; more: string[];
};

export const FEATURES: Record<string, FeaturePageData> = {
  review: {
    slug: "review", href: "/features/review", badge: "AI contract review",
    title: "An AI engine that reads every contract before your team does",
    sub: "ClauseWand analyzes each agreement against your playbook, scores the risk, and drafts the replacement language. Review cycles shrink from days to minutes and exposure stops slipping through.",
    steps: [
      { t: "Analyze", d: "Every clause is read in context and tested against your negotiating positions, not a generic checklist." },
      { t: "Predict", d: "A risk score and ranked findings show which agreements threaten margin, liability or timelines." },
      { t: "Decide", d: "Each finding carries a recommended action and ready-to-use fallback wording, so approvers move faster." },
    ],
    blocks: [
      { t: "Findings your approvers can act on", d: "Each flagged clause includes the verbatim quote, the severity, the business impact and a suggested redline.", list: ["Severity ranking: high, medium, low", "Verbatim citations to the source text", "Suggested replacement language"] },
      { t: "Playbook enforcement at machine speed", d: "Select a playbook and every rule is tested on every contract. Deviations are named after the rule they break." },
      { t: "A defensible record of every decision", d: "Each review is stored with its findings, so legal, finance and audit can see what was flagged and why." },
    ],
    more: ["draft", "ask", "compare", "associate"],
  },
  draft: {
    slug: "draft", href: "/features/draft", badge: "AI drafting",
    title: "Generate deal-ready agreements from your terms and your precedents",
    sub: "Describe the transaction and ClauseWand drafts the agreement, keeps defined terms consistent and flags every assumption it made.",
    steps: [
      { t: "Specify", d: "State the parties, term, commercial terms and non-negotiables in plain language." },
      { t: "Ground", d: "Adapt one of your own approved contracts so the output reflects positions you have already won." },
      { t: "Generate", d: "Receive numbered clauses with bracketed placeholders for every fact the engine could not know." },
    ],
    blocks: [
      { t: "Precedent-grounded drafting", d: "Start from your own contracts, not a generic template. Party names, definitions and structure carry through." },
      { t: "Drafting in 140+ languages", d: "Produce counterparty-ready drafts in the language of the deal without a separate translation step." },
      { t: "A clause library that compounds", d: "Save approved language by contract type and reuse it on the next matter.", list: ["Organized by contract type", "Copy into any draft", "Shared standard across the team"] },
    ],
    more: ["review", "ask", "compare"],
  },
  compare: {
    slug: "compare", href: "/features/compare", badge: "Market benchmarking",
    title: "Know where every clause sits against market practice",
    sub: "ClauseWand benchmarks liability, termination, payment and data terms against what is typical for the contract type and your side of the table.",
    steps: [
      { t: "Select a position", d: "Customer, supplier or neutral: the engine judges each term from your side." },
      { t: "Benchmark", d: "Each clause is classed as favorable, standard, aggressive or missing." },
      { t: "Counter with reasons", d: "Every verdict includes a rationale and an alternative you can send back." },
    ],
    blocks: [
      { t: "Verdicts with reasoning", d: "No score without an explanation. Each clause shows why it is rated the way it is." },
      { t: "Gap detection", d: "The engine names the protections a contract of this type should contain and does not." },
    ],
    more: ["review", "draft", "playbooks"],
  },
  ask: {
    slug: "ask", href: "/features/ask", badge: "AI contract Q&A",
    title: "Put every contract in your portfolio on call",
    sub: "Ask any question about an agreement and receive an answer grounded in its text, with the supporting clause quoted. If the contract is silent, the answer says so.",
    steps: [
      { t: "Select a contract", d: "Choose any agreement in your repository." },
      { t: "Ask in plain language", d: "Termination rights, data obligations, renewal windows, payment triggers." },
      { t: "Verify at the source", d: "Each answer cites the clause it relied on and states its confidence." },
    ],
    blocks: [
      { t: "Grounded answers only", d: "The engine answers from the document and reports when a question is not addressed, instead of guessing." },
      { t: "Decisions without a legal queue", d: "Commercial teams get the facts they need in seconds, and legal keeps its time for judgment." },
    ],
    more: ["review", "draft", "compare"],
  },
  playbooks: {
    slug: "playbooks", href: "/features/playbooks", badge: "Playbooks",
    title: "Turn your negotiating standards into rules the AI enforces",
    sub: "Encode preferred positions, fallbacks and escalation triggers once. ClauseWand applies them to every agreement, whether or not legal is in the room.",
    steps: [
      { t: "Encode", d: "Write the preferred position, the acceptable fallback and the point to escalate." },
      { t: "Enforce", d: "Select a playbook at review time and each rule is tested against the document." },
      { t: "Refine", d: "Edit rules as your positions change and every future review follows them." },
    ],
    blocks: [
      { t: "Rules with fallbacks and escalation", d: "Each rule carries a preferred position, an approved fallback and a trigger for senior review.", list: ["Preferred wording", "Approved fallbacks", "Escalation guidance"] },
      { t: "One standard across the organization", d: "Every reviewer, junior or senior, internal or external, holds the same line." },
    ],
    more: ["review", "associate", "compare"],
  },
  associate: {
    slug: "associate", href: "/associate", badge: "AI agent for transactions",
    title: "An AI agent that runs multi-document transactions",
    sub: "Associate plans the work across a set of agreements, applies changes consistently and surfaces conflicts between documents before the counterparty finds them.",
    steps: [
      { t: "Plan", d: "Describe the transaction and the agent proposes the documents and changes required." },
      { t: "Execute", d: "Apply one instruction across an entire set of agreements consistently." },
      { t: "Reconcile", d: "A cross-document view highlights mismatched terms and definitions." },
    ],
    blocks: [
      { t: "Cross-document consistency", d: "Definitions, dates and commercial terms stay aligned across master agreements, schedules and amendments." },
      { t: "Built for transactional work", d: "Designed around precedents, schedules, side letters and amendments, the way deal teams actually operate." },
    ],
    more: ["review", "draft", "ask"],
  },
};

export type SolutionData = { slug: string; name: string; kind: "industry" | "use"; title: string; sub: string; points: Bullet[]; outcomes: string[] };
export const SOLUTIONS: Record<string, SolutionData> = {
  energy: { slug: "energy", name: "Energy", kind: "industry", title: "Control long-term energy contract exposure", sub: "Power purchase agreements, EPC contracts and supply arrangements carry long terms and heavy exposure. ClauseWand analyzes them against your risk positions.", points: [{ t: "Long-term agreements, analyzed fast", d: "Extract term, pricing mechanisms, change-in-law and force majeure provisions in minutes." }, { t: "Regulatory change allocation", d: "Test whether regulatory risk sits where your playbook requires." }, { t: "Counterparty outliers", d: "Benchmark liability and termination rights across suppliers." }], outcomes: ["Shorter review cycles on high-value agreements", "Consistent risk allocation across the portfolio", "Earlier visibility of unfavorable change-in-law terms"] },
  healthcare: { slug: "healthcare", name: "Healthcare", kind: "industry", title: "Automate review of regulated healthcare agreements", sub: "Business associate agreements, vendor contracts and research agreements demand privacy-first analysis at volume.", points: [{ t: "Privacy obligations surfaced", d: "Identify data protection duties, breach notification timelines and subcontractor flow-downs." }, { t: "One vendor standard", d: "Apply a single vendor risk playbook across every supplier agreement." }, { t: "No training on your documents", d: "Contracts are processed to produce your result and are not used to train models." }], outcomes: ["Faster vendor onboarding", "Uniform privacy-term enforcement", "A record of every review for compliance teams"] },
  "financial-services": { slug: "financial-services", name: "Financial Services", kind: "industry", title: "Enforce policy across regulated deal flow", sub: "Credit agreements, NDAs, vendor paper and schedules arrive in volume. ClauseWand tests each against policy before it reaches an approver.", points: [{ t: "Policy-aligned review", d: "Measure every document against internal policy and risk appetite." }, { t: "Audit-ready trail", d: "Each review is stored with its findings and the rule that triggered them." }, { t: "Bulk NDA triage", d: "Clear standard NDAs automatically and escalate only exceptions." }], outcomes: ["Approvers see only the exceptions", "Policy applied the same way on every deal", "Traceable decisions for audit and regulators"] },
  technology: { slug: "technology", name: "Technology", kind: "industry", title: "Remove legal as the bottleneck in your sales cycle", sub: "SaaS agreements, DPAs and partner paper accumulate as you grow. ClauseWand turns around a reviewed redline while the deal is still hot.", points: [{ t: "SaaS MSA and DPA analysis", d: "Catch uncapped liability, broad data-use grants and weak SLAs." }, { t: "Same-day redlines", d: "Return reviewed language to sales while the buyer is engaged." }, { t: "Reusable fallbacks", d: "Standard fallback positions shorten negotiation rounds." }], outcomes: ["Shorter sales cycles on paper-heavy deals", "Lower contract risk without more headcount", "Predictable turnaround for revenue teams"] },
  manufacturing: { slug: "manufacturing", name: "Manufacturing", kind: "industry", title: "Standardize supplier terms across every region", sub: "Supplier agreements, distribution contracts and purchasing terms span borders and languages. ClauseWand reviews them to one standard.", points: [{ t: "Multi-country supplier MSAs", d: "Review in 140+ languages against a single playbook." }, { t: "Warranty and recall terms", d: "Detect weak remedies and unclear responsibility." }, { t: "Purchasing term compliance", d: "Compare incoming paper to your standard terms." }], outcomes: ["Consistent supplier terms across regions", "Reduced supply chain liability", "Faster procurement cycles"] },
  "retail-consumer-goods": { slug: "retail-consumer-goods", name: "Retail & Consumer Goods", kind: "industry", title: "Absorb seasonal contract volume without adding headcount", sub: "Retailer terms, licensing and distribution deals arrive in waves. ClauseWand keeps review quality constant when volume spikes.", points: [{ t: "Retailer paper, standardized", d: "Compare retailer terms against what you will accept." }, { t: "Licensing clarity", d: "Catch scope, territory and exclusivity mismatches." }, { t: "Batch approvals", d: "Clear in-policy agreements together and escalate the rest." }], outcomes: ["Stable turnaround at peak volume", "Fewer unfavorable retailer terms signed", "Licensing risk visible before signature"] },
  "in-house-legal": { slug: "in-house-legal", name: "In-House", kind: "use", title: "Scale your legal function without scaling its cost", sub: "ClauseWand lets in-house teams review third-party paper faster, enforce one standard everywhere and keep routine work off outside counsel.", points: [{ t: "Third-party paper, reviewed in minutes", d: "Receive findings and redlines before the first internal meeting." }, { t: "One standard enforced everywhere", d: "Playbooks hold the line even when legal is not in the room." }, { t: "More work kept in-house", d: "Handle routine agreements internally and reserve outside counsel for matters that need it." }], outcomes: ["Lower outside counsel spend on routine agreements", "Faster business turnaround", "Consistent positions across every business unit"] },
  "law-firms": { slug: "law-firms", name: "Law Firms", kind: "use", title: "Deliver more client work at higher margin", sub: "ClauseWand gives every lawyer an analytical first pass, accelerates diligence and protects margin on fixed-fee engagements.", points: [{ t: "Diligence at scale", d: "Extract and compare key terms across a set of agreements." }, { t: "Negotiate from your own precedents", d: "Start from the firm's best language, not a blank page." }, { t: "Consistent quality", d: "Hold every matter to the same standard regardless of who staffs it." }], outcomes: ["More matters per lawyer", "Higher realization on fixed fees", "Uniform work product across the practice"] },
};

export const CLAUSES = [
  { n: "Limitation of Liability", d: "Caps each party's exposure, usually to fees paid in the prior twelve months.", risk: "Look for uncapped liability, carve-outs that swallow the cap and one-sided caps." },
  { n: "Indemnification", d: "Allocates responsibility for third-party claims.", risk: "Watch for broad, one-way indemnities and missing procedures." },
  { n: "Termination for Convenience", d: "Lets a party exit without cause on notice.", risk: "Check notice length, fees on exit and who holds the right." },
  { n: "Confidentiality", d: "Protects information shared between the parties.", risk: "Check term, residuals clauses and permitted disclosures." },
  { n: "Governing Law and Venue", d: "Chooses the law and courts that apply.", risk: "Distant or unfamiliar venues raise cost and uncertainty." },
  { n: "Auto-Renewal", d: "Extends the contract unless notice is given.", risk: "Long notice windows silently lock you in." },
  { n: "Data Protection", d: "Sets duties on personal data handling.", risk: "Check roles, sub-processors, transfers and breach timelines." },
  { n: "Assignment", d: "Controls whether rights can be transferred.", risk: "Change-of-control triggers can surprise you." },
];

export const POSTS = [
  { slug: "first-pass-review-checklist", t: "A first-pass review checklist for commercial contracts", d: "Nine checks that catch most problems before a senior lawyer opens the file.", date: "2026-10-14", tag: "Practice", body: ["A first-pass review is not about finding every issue. It is about finding the issues that change the decision.", "Start with the commercial anchors: term, renewal, fees and payment. Then move to risk allocation: liability caps, indemnities and exclusions. Finish with exit: termination rights and what happens to data and deliverables afterwards.", "Playbooks make this repeatable. Encode each check once and apply it to every contract, so quality does not depend on who happens to review."] },
  { slug: "writing-your-first-playbook", t: "Writing your first playbook without overengineering it", d: "Start with ten rules and a clear fallback for each.", date: "2026-09-30", tag: "Playbooks", body: ["The most common mistake is trying to capture every position on day one.", "Pick the ten clauses you negotiate most often. For each, write the preferred position, an acceptable fallback and the point to escalate.", "Review a dozen real contracts with it, edit the rules that produced noise, and expand from there."] },
  { slug: "ai-in-legal-confidentiality", t: "Confidentiality questions to ask any legal AI vendor", d: "Retention, training, sub-processors and audit trails.", date: "2026-09-12", tag: "Security", body: ["Ask whether your documents are retained, who can access them and whether they are used to train models.", "Ask for the list of sub-processors and where data is processed.", "Ask how access is logged, and whether you can export the log."] },
  { slug: "from-clm-to-acm", t: "From contract storage to autonomous contract management", d: "Why the repository should be the output of the workflow, not the start of it.", date: "2026-08-21", tag: "Strategy", body: ["Traditional contract lifecycle tools store documents and track dates.", "An autonomous approach starts earlier: contracts are captured on arrival, reviewed against your standards and routed to the right person.", "The repository then becomes the by-product of the workflow rather than a chore."] },
];

export const FAQ_ACM: [string, string][] = [
  ["What is autonomous contract management?", "A workflow that captures contracts as they arrive, runs a first-pass review against your standards, routes work to the right people and files everything in a searchable repository."],
  ["How is it different from a CLM?", "A CLM mostly stores contracts and tracks dates. Autonomous contract management performs the review and routing itself, then files the result."],
  ["Is my data used to train models?", "No. Your contracts are processed to produce your result and are not used to train models."],
  ["How do contracts enter the system?", "By upload or pasted text today. Each contract is stored, reviewed and searchable from your repository."],
];
export const FAQ_SEC: [string, string][] = [
  ["Where is data stored?", "In a managed Postgres database with row-level security, so each user can only read their own records."],
  ["Is my data used to train models?", "No. Documents are sent to the model provider to produce your result and are not used for training."],
  ["How is access controlled?", "Authenticated sessions, row-level security on every table and server-side checks on every AI request."],
  ["Can I delete my data?", "Yes. Deleting a contract removes the record and its stored file."],
];

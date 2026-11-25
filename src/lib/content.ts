// All marketing copy lives here. Customer names, quotes and statistics are SAMPLE PLACEHOLDERS
// (fictional companies) and must be replaced with real, permissioned content before launch.

export type Bullet = { t: string; d: string };
export type FeaturePageData = {
  slug: string; badge: string; title: string; sub: string; href: string;
  steps: Bullet[]; quote: { q: string; a: string; r: string };
  blocks: { t: string; d: string; list?: string[] }[]; more: string[];
};

export const FEATURES: Record<string, FeaturePageData> = {
  review: {
    slug: "review", href: "/features/review", badge: "#1 pick for AI contract review",
    title: "Your second set of eyes for every contract",
    sub: "Upload a third-party agreement and get risks, missing protections and suggested redlines measured against your own standards in under a minute.",
    steps: [
      { t: "Create custom playbooks", d: "Turn your negotiation positions into rules the AI applies on every contract, so the team stays consistent." },
      { t: "Find risks and mistakes", d: "Surface one-sided indemnities, uncapped liability, auto-renewals, undefined terms and broken cross-references." },
      { t: "Negotiate terms", d: "Get fallback language and a ranked list of asks so you walk into the call with a plan." },
    ],
    blocks: [
      { t: "Insightful comments in one click", d: "Every flagged clause carries a plain-English explanation, the risk level and the reason it matters for your side.", list: ["Severity ranking: high, medium, low", "Clause-level citations back to the source text", "Explanations written for non-lawyers too"] },
      { t: "Bulk approve", d: "Accept all the low-risk, in-policy suggestions together and spend your attention only on the clauses that deserve it." },
      { t: "Redline in your name", d: "Suggested changes are produced as clean replacement language you can paste straight into your document with your own review attached." },
    ],
    quote: { q: "It gives me a confident first pass at 9pm that I used to spend my Monday morning on.", a: "Priya N.", r: "Commercial Counsel (sample testimonial)" },
    more: ["draft", "ask", "compare", "associate"],
  },
  draft: {
    slug: "draft", href: "/features/draft", badge: "Drafting",
    title: "Draft precise language, quickly",
    sub: "Generate clauses and complete agreements tailored to your deal terms, your jurisdiction and your preferred positions.",
    steps: [
      { t: "Describe the deal", d: "Give the parties, term, commercial terms and any must-haves in plain language." },
      { t: "Choose a source", d: "Draft from scratch or ground the output in a precedent from your saved library." },
      { t: "Refine and save", d: "Iterate with instructions, then save approved clauses to reuse on the next matter." },
    ],
    blocks: [
      { t: "Draft from scratch or existing precedents", d: "Start with a blank page or load a precedent and adapt it. Defined terms and party names stay consistent." },
      { t: "Draft in 140+ languages", d: "Review, draft and chat in the language your counterparty uses without a separate translation step." },
      { t: "Save favourite clauses", d: "Build a library of approved language organised by contract type and reuse it with a click.", list: ["Tag clauses by contract type", "Version history for each clause", "Share across the team"] },
    ],
    quote: { q: "A letter that used to take forty minutes is now a five minute edit.", a: "Marcus T.", r: "Associate (sample testimonial)" },
    more: ["review", "ask", "compare"],
  },
  compare: {
    slug: "compare", href: "/features/compare", badge: "Market standards",
    title: "See how your terms compare with the market",
    sub: "Check any clause against what is typical for the contract type, industry and counterparty size, so you know when you are asking for too much or too little.",
    steps: [
      { t: "Pick a clause", d: "Select a liability cap, termination right, payment term or any other provision." },
      { t: "Benchmark it", d: "See whether it is favourable, standard or aggressive for your position." },
      { t: "Negotiate with evidence", d: "Use the rationale and suggested alternative to justify your counter." },
    ],
    blocks: [
      { t: "Industry-aware benchmarks", d: "Comparisons adjust for the contract type and sector, so a SaaS MSA is not judged like a supply agreement." },
      { t: "Clear verdicts", d: "Every clause gets a verdict, an explanation and a recommended alternative." },
    ],
    quote: { q: "Being able to say 'this is standard' with a reason behind it ends a lot of circular negotiation.", a: "Elena R.", r: "Legal Operations (sample testimonial)" },
    more: ["review", "draft", "playbooks"],
  },
  ask: {
    slug: "ask", href: "/features/ask", badge: "Ask",
    title: "Quick answers to complex questions",
    sub: "Ask anything about a contract in plain language and get an answer grounded in the text, with the supporting clause quoted.",
    steps: [
      { t: "Open a contract", d: "Choose any document from your repository." },
      { t: "Ask in plain language", d: "'Can they terminate for convenience?' 'What happens to data on exit?'" },
      { t: "Verify at the source", d: "Each answer quotes the clause it relied on so you can check it yourself." },
    ],
    blocks: [
      { t: "Grounded answers only", d: "If the contract does not address the question, the answer says so rather than guessing." },
      { t: "Built for follow-ups", d: "Keep the conversation going and the context stays with the document." },
    ],
    quote: { q: "Half my questions from the business now answer themselves.", a: "Daniel K.", r: "General Counsel (sample testimonial)" },
    more: ["review", "draft", "compare"],
  },
  playbooks: {
    slug: "playbooks", href: "/features/playbooks", badge: "Playbooks",
    title: "Encode your legal standards once, apply them everywhere",
    sub: "Playbooks translate the way your team negotiates into rules the AI checks on every contract, whether or not legal is in the room.",
    steps: [
      { t: "Write the rule", d: "Describe the preferred position, acceptable fallback and the point at which to escalate." },
      { t: "Apply on review", d: "Select a playbook when you review and each rule is tested against the document." },
      { t: "Improve over time", d: "Edit rules as your positions evolve and every future review follows them." },
    ],
    blocks: [
      { t: "Rules with fallbacks", d: "Each rule carries a preferred position, a fallback and an escalation trigger.", list: ["Preferred wording", "Approved fallbacks", "Escalation guidance"] },
      { t: "One standard across the team", d: "Junior team members and business users review to the same bar as your most senior lawyer." },
    ],
    quote: { q: "Our playbook used to live in a PDF nobody opened. Now it is applied on every deal.", a: "Sofia L.", r: "Head of Legal (sample testimonial)" },
    more: ["review", "associate", "compare"],
  },
  associate: {
    slug: "associate", href: "/associate", badge: "The AI agent for transactional law",
    title: "Complete complex drafting projects across documents",
    sub: "Plan and execute whole transactions: the agent works through multiple documents, keeps definitions aligned and flags conflicts between them.",
    steps: [
      { t: "Plan and execute complete projects", d: "Describe the project and the agent proposes a plan of documents and changes." },
      { t: "Revise multiple documents in one click", d: "Apply one instruction across an entire set of agreements consistently." },
      { t: "See the big picture", d: "A cross-document view highlights inconsistencies before the other side finds them." },
    ],
    blocks: [
      { t: "Associate-like support on daunting projects", d: "Hand over the repetitive cross-checking and keep your judgment for the decisions." },
      { t: "Built for commercial lawyers", d: "Designed around the way transactional teams really work: precedents, schedules, side letters and amendments." },
    ],
    quote: { q: "What would have taken three weeks came together in four days.", a: "Noah B.", r: "Legal Operations Manager (sample testimonial)" },
    more: ["review", "draft", "ask"],
  },
};

export type SolutionData = { slug: string; name: string; kind: "industry" | "use"; title: string; sub: string; points: Bullet[]; stat: { n: string; l: string }; quote: { q: string; a: string } };
export const SOLUTIONS: Record<string, SolutionData> = {
  energy: { slug: "energy", name: "Energy", kind: "industry", title: "Contracts for a market that never stands still", sub: "Power purchase agreements, EPC contracts and supply arrangements carry long terms and heavy exposure. Review them with consistency.", points: [{ t: "Long-term agreements, reviewed fast", d: "Pull out term, pricing mechanisms, change-in-law and force majeure provisions in minutes." }, { t: "Regulatory change language", d: "Check that regulatory risk is allocated the way your playbook requires." }, { t: "Counterparty variation", d: "Compare across suppliers to spot outliers in liability and termination rights." }], stat: { n: "60%", l: "less time on first-pass review (sample figure)" }, quote: { q: "We finally compare PPAs line by line instead of memory by memory.", a: "Contracts Lead, Energy (sample)" } },
  healthcare: { slug: "healthcare", name: "Healthcare", kind: "industry", title: "Confidential contracts that deserve careful handling", sub: "Business associate agreements, vendor contracts and clinical research agreements demand privacy-first review.", points: [{ t: "Privacy obligations spotted", d: "Surface data protection duties, breach notification timelines and subcontractor flow-downs." }, { t: "Vendor risk standards", d: "Apply one vendor standard across every supplier agreement." }, { t: "Zero data retention", d: "Documents are processed without being used to train models." }], stat: { n: "2x", l: "contract throughput (sample figure)" }, quote: { q: "Compliance finally trusts the first pass.", a: "Privacy Counsel, Healthcare (sample)" } },
  "financial-services": { slug: "financial-services", name: "Financial Services", kind: "industry", title: "Speed and rigour for regulated deal flow", sub: "ISDA schedules, credit agreements, NDAs and vendor paper arrive in volume. Keep every one measured against policy.", points: [{ t: "Policy-aligned review", d: "Test each document against your internal policies and risk appetite." }, { t: "Audit-ready trail", d: "Every review is saved with the findings and the rule that triggered them." }, { t: "Bulk NDAs, handled", d: "Approve standard NDAs quickly and escalate only the exceptions." }], stat: { n: "75%", l: "time saved on contract work (sample figure)" }, quote: { q: "NDAs no longer sit in a queue for a week.", a: "Deputy GC, Financial Services (sample)" } },
  technology: { slug: "technology", name: "Technology", kind: "industry", title: "Close deals at the pace your product ships", sub: "SaaS agreements, DPAs and partner paper pile up when you grow. Keep legal from becoming the bottleneck.", points: [{ t: "SaaS MSA and DPA review", d: "Catch uncapped liability, data-use grants and unfavourable SLAs." }, { t: "Sales-friendly turnaround", d: "Give sales a reviewed redline the same day." }, { t: "Reusable fallbacks", d: "Standard fallbacks keep negotiations short." }], stat: { n: "30%", l: "efficiency lift (sample figure)" }, quote: { q: "Sales stopped asking where their redline was.", a: "Head of Legal, Technology (sample)" } },
  manufacturing: { slug: "manufacturing", name: "Manufacturing", kind: "industry", title: "Supply chain contracts without the slowdown", sub: "Supplier agreements, distribution contracts and purchase terms span borders and languages. Review them in one place.", points: [{ t: "Multi-country supplier MSAs", d: "Review in 140+ languages against one standard." }, { t: "Warranty and recall terms", d: "Spot weak remedies and unclear responsibility." }, { t: "Consistent purchasing terms", d: "Compare incoming paper to your standard terms." }], stat: { n: "3w → 4d", l: "RFP process build (sample figure)" }, quote: { q: "One playbook now covers every supplier region.", a: "Procurement Counsel, Manufacturing (sample)" } },
  "retail-consumer-goods": { slug: "retail-consumer-goods", name: "Retail & Consumer Goods", kind: "industry", title: "Handle seasonal contract spikes with ease", sub: "Retailer terms, licensing and distribution deals arrive in waves. Keep quality high when volume is higher.", points: [{ t: "Retailer paper, standardised", d: "Compare retailer terms against what you will accept." }, { t: "Licensing clarity", d: "Catch scope, territory and exclusivity mismatches." }, { t: "Fast approvals", d: "Approve in-policy changes together." }], stat: { n: "2x", l: "throughput with the same team (sample figure)" }, quote: { q: "Peak season no longer breaks the legal queue.", a: "Legal Manager, Retail (sample)" } },
  "in-house-legal": { slug: "in-house-legal", name: "In-House", kind: "use", title: "Scale your judgment", sub: "Bring more work in-house, enforce one standard everywhere and stop being the department where requests go to wait.", points: [{ t: "Review third-party paper faster", d: "Redline in minutes, not days." }, { t: "Enforce one standard everywhere", d: "Playbooks hold the line even when legal is not in the room." }, { t: "Bring more work in-house", d: "Cut outside counsel spend on routine agreements." }], stat: { n: "40%", l: "less outside counsel spend (sample figure)" }, quote: { q: "We reduced outside counsel spend on routine paper significantly.", a: "General Counsel (sample)" } },
  "law-firms": { slug: "law-firms", name: "Law Firms", kind: "use", title: "Deliver more to clients in less time", sub: "Give every associate a second set of eyes, speed up diligence and protect margin on fixed-fee work.", points: [{ t: "Cut weeks off diligence", d: "Extract and compare key terms across a data room." }, { t: "Negotiate from your precedents", d: "Start from the firm's best language, not a blank page." }, { t: "Consistent quality", d: "Hold every matter to the same standard." }], stat: { n: "55%", l: "time saved in pilot (sample figure)" }, quote: { q: "Our pilot group would not give it back.", a: "Partner, Law Firm (sample)" } },
};

export const STORIES = [
  { slug: "northwind-legal", co: "Northwind Legal", tag: "Law firm", q: "We had great results from our pilot group. They quoted 55% time saved.", t: "How a 40-lawyer firm cut first-pass review time by more than half", img: "from-amber-700/60 to-stone-800", metric: "55%", ml: "time saved" },
  { slug: "halden-cloud", co: "Halden Cloud", tag: "In-house", q: "Instead of going to outside counsel, I put it through the platform and had the answer in minutes.", t: "Why Halden Cloud keeps more work in-house", img: "from-sky-900 to-slate-950", metric: "$300k", ml: "outside spend avoided" },
  { slug: "orsa-industries", co: "Orsa Industries", tag: "Manufacturing", q: "It was ready to be used from the first day of a very short pilot.", t: "Orsa builds a formal RFP process in four days", img: "from-emerald-900 to-slate-950", metric: "3w → 4d", ml: "RFP build" },
  { slug: "meridian-foundation", co: "Meridian Foundation", tag: "Non-profit", q: "The first product we saw that felt like a game-changer for contract review.", t: "A small legal team that behaves like a large one", img: "from-violet-900 to-slate-950", metric: "30%", ml: "efficiency lift" },
];

export const INTEGRATIONS: [string, string][] = [
  ["Microsoft Word", "Review and draft directly inside your documents."], ["Google Drive", "Pull contracts from shared folders."], ["Slack", "Intake requests and send review summaries in channels."], ["Email", "Forward contracts in; get first-pass reviews back."], ["Salesforce", "Attach reviewed contracts to opportunities."], ["DocuSign", "Send approved agreements for signature."], ["SharePoint", "Sync repositories your firm already uses."], ["Zapier", "Connect everything else with automations."],
];

export const POSTS = [
  { slug: "first-pass-review-checklist", t: "A practical checklist for first-pass contract review", d: "Nine checks that catch most problems before a senior lawyer ever opens the file.", date: "2026-10-14", tag: "Practice", body: ["A first-pass review is not about finding every issue. It is about finding the issues that change the decision.", "Start with the commercial anchors: term, renewal, fees and payment. Then move to risk allocation: liability caps, indemnities and exclusions. Finish with exit: termination rights and what happens to data and deliverables afterwards.", "Playbooks make this repeatable. Encode each check once and apply it to every contract, so quality does not depend on who happens to review."] },
  { slug: "writing-your-first-playbook", t: "Writing your first playbook without overengineering it", d: "Start with ten rules and a clear fallback for each.", date: "2026-09-30", tag: "Playbooks", body: ["The most common mistake is trying to capture every position on day one.", "Pick the ten clauses you negotiate most often. For each, write the preferred position, an acceptable fallback and the point to escalate.", "Review a dozen real contracts with it, edit the rules that produced noise, and expand from there."] },
  { slug: "ai-in-legal-confidentiality", t: "Confidentiality questions to ask any legal AI vendor", d: "Retention, training, sub-processors and audit trails.", date: "2026-09-12", tag: "Security", body: ["Ask whether your documents are retained, who can access them and whether they are used to train models.", "Ask for the list of sub-processors and where data is processed.", "Ask how access is logged, and whether you can export the log."] },
  { slug: "from-clm-to-acm", t: "From CLM to autonomous contract management", d: "Why the repository is the start of the workflow, not the end.", date: "2026-08-21", tag: "Strategy", body: ["Traditional contract lifecycle tools store documents and track dates.", "An autonomous approach starts earlier: contracts are captured on arrival, reviewed against your standards and routed to the right person.", "The repository then becomes the by-product of the workflow rather than a chore."] },
];

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

export const FAQ_ACM: [string, string][] = [
  ["What is autonomous contract management?", "A workflow that captures contracts as they arrive, runs a first-pass review against your standards, routes work to the right people and stores everything in a searchable repository."],
  ["How is it different from a CLM?", "A CLM mostly stores contracts and tracks dates. Autonomous contract management does the review and routing work itself, then files the result."],
  ["Do you train on our contracts?", "No. We use providers with zero data retention terms and never train on customer documents."],
  ["Which sources can it pull contracts from?", "Uploads today, with email, Slack and drive connectors on the integration roadmap."],
];
export const FAQ_SEC: [string, string][] = [
  ["Where is data stored?", "In a managed Postgres database with row level security, so users only ever see their own records."],
  ["Is my data used to train models?", "No. Documents are sent to the model provider with retention disabled and are not used for training."],
  ["How is access controlled?", "Authenticated sessions, row level security on every table and server-side checks on every AI request."],
  ["Can I delete my data?", "Yes. Deleting a contract removes the record and its stored file."],
];

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

export class AiError extends Error {
  constructor(message: string, public status = 502) { super(message); }
}

const MODELS = () => [...new Set([process.env.GEMINI_MODEL, "gemini-3.5-flash", "gemini-3.8-flash"].filter(Boolean) as string[])];

function client() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AiError("AI is not configured. Set GEMINI_API_KEY on the server.", 503);
  return new GoogleGenerativeAI(key);
}

const MAX_CHARS = 120_000;
export const clip = (s: string) => (s.length > MAX_CHARS ? s.slice(0, MAX_CHARS) : s);

const retryable = (e: unknown) => /(503|429|404|500)/.test(String((e as Error)?.message));

/** Calls Gemini, falling back to the next model when one is overloaded, retired or rate limited. */
async function call(json: boolean, input: string | Parameters<ReturnType<GoogleGenerativeAI["getGenerativeModel"]>["generateContent"]>[0]) {
  const c = client();
  let last: unknown;
  for (const name of MODELS()) {
    for (let i = 0; i < 2; i++) {
      try {
        const m = c.getGenerativeModel({ model: name, generationConfig: { temperature: 0.2, ...(json ? { responseMimeType: "application/json" } : {}) } }, { timeout: 60_000 });
        return await m.generateContent(input as never);
      } catch (e) {
        last = e;
        console.error(`gemini ${name} failed:`, String((e as Error).message).slice(0, 200));
        if (!retryable(e)) throw e;
        await new Promise((r) => setTimeout(r, 800));
      }
    }
  }
  throw last;
}

/** Ask the model for JSON and validate it with zod. Retries once with the validation error. */
export async function generateJson<T extends z.ZodTypeAny>(system: string, user: string, schema: T): Promise<{ data: z.infer<T>; tokens: number }> {
  let prompt = `${system}

Return ONLY valid JSON.

${user}`;
  let tokens = 0;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const r = await call(true, prompt);
      tokens += r.response.usageMetadata?.totalTokenCount ?? 0;
      const raw = r.response.text().replace(/^```jsons*|```$/g, "").trim();
      const parsed = schema.safeParse(JSON.parse(raw));
      if (parsed.success) return { data: parsed.data, tokens };
      prompt += `

Your previous output failed validation: ${parsed.error.message.slice(0, 600)}. Fix it and return only JSON.`;
    } catch (e) {
      if (e instanceof AiError) throw e;
      console.error("generateJson attempt failed:", (e as Error).message?.slice(0, 200));
      if (attempt === 1) throw new AiError(retryable(e) ? "The AI service is busy right now. Please try again in a moment." : "The AI provider returned an unusable response. Please try again.");
    }
  }
  throw new AiError("The AI response could not be validated. Please try again.");
}

export async function generateText(system: string, user: string): Promise<{ text: string; tokens: number }> {
  try {
    const r = await call(false, `${system}

${user}`);
    return { text: r.response.text().trim(), tokens: r.response.usageMetadata?.totalTokenCount ?? 0 };
  } catch (e) {
    if (e instanceof AiError) throw e;
    throw new AiError(retryable(e) ? "The AI service is busy right now. Please try again in a moment." : "The AI provider failed. Please try again.");
  }
}

/** Extract text from a PDF using Gemini's native document understanding. */
export async function pdfToText(bytes: Buffer): Promise<string> {
  try {
    const r = await call(false, [
      { inlineData: { data: bytes.toString("base64"), mimeType: "application/pdf" } },
      "Transcribe this document to plain text exactly as written. Keep headings and clause numbering. Output only the text.",
    ]);
    return r.response.text().trim();
  } catch (e) {
    if (e instanceof AiError) throw e;
    throw new AiError("Could not read that PDF.");
  }
}

export const SYSTEM_BASE = `You are a careful commercial-contracts assistant for lawyers. You give decision support, not legal advice.
Rules: only rely on the supplied contract text; quote the exact clause text you rely on; if something is not in the document say so; never invent clauses; be concise.`;

// ---- schemas -------------------------------------------------------------
export const reviewSchema = z.object({
  summary: z.string(),
  contract_type: z.string(),
  risk_score: z.number().min(0).max(100),
  findings: z.array(z.object({
    clause: z.string(),
    quote: z.string(),
    severity: z.enum(["high", "medium", "low"]),
    issue: z.string(),
    why_it_matters: z.string(),
    suggested_redline: z.string(),
    playbook_rule: z.string().nullable().optional(),
  })),
  missing_protections: z.array(z.string()),
  key_terms: z.array(z.object({ label: z.string(), value: z.string() })),
});
export type Review = z.infer<typeof reviewSchema>;

export const askSchema = z.object({
  answer: z.string(),
  confidence: z.enum(["high", "medium", "low"]),
  addressed_in_contract: z.boolean(),
  citations: z.array(z.object({ clause: z.string(), quote: z.string() })),
});
export type Answer = z.infer<typeof askSchema>;

export const compareSchema = z.object({
  overall: z.string(),
  clauses: z.array(z.object({
    clause: z.string(),
    verdict: z.enum(["favourable", "standard", "aggressive", "missing"]),
    rationale: z.string(),
    suggested_alternative: z.string(),
  })),
});
export type Comparison = z.infer<typeof compareSchema>;

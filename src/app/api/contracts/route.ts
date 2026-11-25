import { NextResponse } from "next/server";
import { z } from "zod";
import mammoth from "mammoth";
import { requireUser, fail } from "@/lib/api";
import { pdfToText, clip } from "@/lib/ai/gemini";

export const runtime = "nodejs";
export const maxDuration = 60;
const MAX_BYTES = 8 * 1024 * 1024;
const textSchema = z.object({ title: z.string().min(1).max(200), text: z.string().min(50, "Paste at least a few sentences.").max(400_000) });

export async function POST(req: Request) {
  try {
    const { sb, user } = await requireUser();
    let title: string, content: string, file_path: string | null = null, source = "paste";

    if ((req.headers.get("content-type") ?? "").includes("multipart/form-data")) {
      const fd = await req.formData();
      const file = fd.get("file");
      if (!(file instanceof File)) return NextResponse.json({ error: "No file received." }, { status: 400 });
      if (file.size > MAX_BYTES) return NextResponse.json({ error: "File is larger than 8 MB." }, { status: 413 });
      const name = file.name; const lower = name.toLowerCase();
      const buf = Buffer.from(await file.arrayBuffer());
      if (lower.endsWith(".pdf")) content = await pdfToText(buf);
      else if (lower.endsWith(".docx")) content = (await mammoth.extractRawText({ buffer: buf })).value;
      else if (lower.endsWith(".txt") || lower.endsWith(".md")) content = buf.toString("utf8");
      else return NextResponse.json({ error: "Supported files: PDF, DOCX, TXT." }, { status: 415 });
      content = content.trim();
      if (content.length < 50) return NextResponse.json({ error: "We could not find readable text in that file." }, { status: 422 });
      title = String(fd.get("title") || name.replace(/\.[^.]+$/, ""));
      const safe = name.replace(/[^\w.\-]+/g, "_");
      file_path = `${user.id}/${Date.now()}-${safe}`;
      const up = await sb.storage.from("contracts").upload(file_path, buf, { contentType: file.type || "application/octet-stream" });
      if (up.error) { console.error(up.error); file_path = null; }
      source = "upload";
    } else {
      const p = textSchema.safeParse(await req.json().catch(() => null));
      if (!p.success) return NextResponse.json({ error: p.error.issues[0].message }, { status: 400 });
      title = p.data.title; content = p.data.text;
    }

    const { data, error } = await sb.from("contracts").insert({ user_id: user.id, title, content: clip(content), file_path, source }).select("id").single();
    if (error) throw error;
    return NextResponse.json({ id: data.id });
  } catch (e) { return fail(e); }
}

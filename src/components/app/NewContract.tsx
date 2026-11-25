"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

export default function NewContract() {
  const router = useRouter();
  const [tab, setTab] = useState<"upload" | "paste">("upload");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function send(body: BodyInit, headers?: HeadersInit) {
    setBusy(true); setErr("");
    const r = await fetch("/api/contracts", { method: "POST", body, headers });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) return setErr(j.error ?? "Upload failed.");
    router.push(`/app/contracts/${j.id}`);
  }
  const upload = (f?: File | null) => { if (!f) return; const fd = new FormData(); fd.set("file", f); send(fd); };

  return (
    <div className="card p-6">
      <div className="mb-4 flex gap-2">{(["upload", "paste"] as const).map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-[14px] ${tab === t ? "bg-ink text-white" : "border border-line"}`}>{t === "upload" ? "Upload file" : "Paste text"}</button>)}</div>
      {tab === "upload" ? (
        <div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files[0]); }}
          onClick={() => fileRef.current?.click()} className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dashed p-12 text-center ${drag ? "border-ink bg-accent-light" : "border-line"}`}>
          <UploadCloud size={32} strokeWidth={1.3} /><p className="font-medium">{busy ? "Reading your document…" : "Drop a PDF, DOCX or TXT here"}</p><p className="text-[13px] text-muted">or click to browse · up to 8 MB</p>
          <input ref={fileRef} type="file" hidden accept=".pdf,.docx,.txt,.md" onChange={(e) => upload(e.target.files?.[0])} />
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); send(JSON.stringify({ title: fd.get("title"), text: fd.get("text") }), { "Content-Type": "application/json" }); }} className="space-y-3">
          <input name="title" className="field" placeholder="Title, e.g. Vendor MSA — Acme" required />
          <textarea name="text" className="field min-h-[220px]" placeholder="Paste the contract text…" required />
          <button className="btn btn-dark" disabled={busy}>{busy ? "Saving…" : "Save contract"}</button>
        </form>
      )}
      {err && <p role="alert" className="mt-3 text-sm text-red-600">{err}</p>}
    </div>
  );
}

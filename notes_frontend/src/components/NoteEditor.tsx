"use client";

import { useEffect, useState } from "react";
import { Note, deleteNote, getNote, updateNote } from "@/lib/storage";

type NoteEditorProps = {
  noteId?: string | null;
  onDeleted: () => void;
  onSaved?: (note: Note) => void;
};

export default function NoteEditor({ noteId, onDeleted, onSaved }: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [timestamps, setTimestamps] = useState<{ createdAt?: number; updatedAt?: number }>({});
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (!noteId) {
      setTitle("");
      setContent("");
      setTimestamps({});
      return;
    }
    const n = getNote(noteId);
    if (n) {
      setTitle(n.title);
      setContent(n.content);
      setTimestamps({ createdAt: n.createdAt, updatedAt: n.updatedAt });
    } else {
      setTitle("");
      setContent("");
      setTimestamps({});
    }
    setStatus("idle");
  }, [noteId]);

  const handleSave = () => {
    if (!noteId) return;
    setStatus("saving");
    const updated = updateNote(noteId, { title: title.trim(), content });
    if (updated) {
      setTimestamps({ createdAt: updated.createdAt, updatedAt: updated.updatedAt });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1200);
      onSaved?.(updated);
    } else {
      setStatus("error");
    }
  };

  const handleDelete = () => {
    if (!noteId) return;
    const ok = deleteNote(noteId);
    if (ok) {
      onDeleted();
    } else {
      setStatus("error");
    }
  };

  if (!noteId) {
    return (
      <section className="mx-auto grid h-full w-full place-items-center text-center text-gray-500">
        <div>
          <h2 className="text-lg font-medium">Select or create a note</h2>
          <p className="mt-1 text-sm">Choose a note from the sidebar or click New.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
              status === "saving"
                ? "bg-[color:var(--primary-soft)] text-[color:var(--primary)]"
                : status === "saved"
                ? "bg-[color:var(--success-soft)] text-[color:var(--success)]"
                : status === "error"
                ? "bg-[color:var(--error-soft)] text-[color:var(--error)]"
                : "bg-gray-100 text-gray-600"
            }`}
            aria-live="polite"
          >
            {status === "saving" && "Saving..."}
            {status === "saved" && "Saved"}
            {status === "error" && "Error"}
            {status === "idle" && "Idle"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="rounded-md border border-[color:var(--error)] px-3 py-1.5 text-sm font-medium text-[color:var(--error)] transition hover:bg-[color:var(--error-soft)]"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="rounded-md px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:shadow"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-3xl space-y-3">
          <label className="block">
            <span className="sr-only">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-lg font-medium text-[color:var(--text)] outline-none transition focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20"
            />
          </label>
          <label className="block">
            <span className="sr-only">Content</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              rows={16}
              className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-[15px] leading-6 text-[color:var(--text)] outline-none transition focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20"
            />
          </label>
          {(timestamps.createdAt || timestamps.updatedAt) && (
            <div className="mt-2 text-xs text-gray-500">
              {timestamps.createdAt && (
                <div>
                  Created:{" "}
                  <time dateTime={new Date(timestamps.createdAt).toISOString()}>
                    {new Date(timestamps.createdAt).toLocaleString()}
                  </time>
                </div>
              )}
              {timestamps.updatedAt && (
                <div>
                  Updated:{" "}
                  <time dateTime={new Date(timestamps.updatedAt).toISOString()}>
                    {new Date(timestamps.updatedAt).toLocaleString()}
                  </time>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

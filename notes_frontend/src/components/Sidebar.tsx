"use client";

import { useEffect, useMemo, useState } from "react";
import { Note, createNote, listNotes } from "@/lib/storage";

type SidebarProps = {
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onCreate: (note: Note) => void;
};

export default function Sidebar({ selectedId, onSelect, onCreate }: SidebarProps) {
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(listNotes());
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith("notes_app__notes_v1")) {
        setNotes(listNotes());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  const handleNew = () => {
    const n = createNote({ title: "Untitled", content: "" });
    setNotes(listNotes());
    onCreate(n);
  };

  return (
    <aside
      className="w-full sm:w-72 shrink-0 border-r border-gray-200 bg-white"
      aria-label="Notes sidebar"
    >
      <div className="p-3 border-b border-gray-100">
        <div className="flex gap-2">
          <input
            aria-label="Search notes"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20"
          />
          <button
            onClick={handleNew}
            className="rounded-md px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:shadow"
            style={{ backgroundColor: "var(--primary)" }}
          >
            New
          </button>
        </div>
      </div>

      <ul className="max-h-[calc(100vh-5rem)] overflow-y-auto p-2">
        {filtered.length === 0 && (
          <li className="px-2 py-8 text-center text-sm text-gray-500">
            No notes yet.
          </li>
        )}
        {filtered.map((n) => (
          <li key={n.id} className="p-1">
            <button
              onClick={() => onSelect(n.id)}
              className={`w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--primary)] ${
                selectedId === n.id ? "bg-[color:var(--primary-soft)]" : ""
              }`}
              aria-current={selectedId === n.id ? "true" : "false"}
            >
              <div className="flex items-center justify-between">
                <span className="line-clamp-1 font-medium text-[color:var(--text)]">
                  {n.title || "Untitled"}
                </span>
                <time
                  className="ml-2 shrink-0 text-xs text-gray-500"
                  dateTime={new Date(n.updatedAt).toISOString()}
                  title={new Date(n.updatedAt).toLocaleString()}
                >
                  {new Date(n.updatedAt).toLocaleDateString()}
                </time>
              </div>
              {n.content ? (
                <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                  {n.content}
                </p>
              ) : (
                <p className="mt-0.5 text-xs text-gray-400 italic">No content</p>
              )}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

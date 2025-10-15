"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NoteEditor from "@/components/NoteEditor";
import { Note, createNote, listNotes } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Initialize a default note if none exists so UI has something to show.
  useEffect(() => {
    const existing = listNotes();
    if (existing.length === 0) {
      const first = createNote({ title: "Welcome 👋", content: "Start writing your thoughts here." });
      setSelectedId(first.id);
    } else {
      setSelectedId(existing[0].id);
    }
  }, []);

  const handleCreated = (n: Note) => {
    setSelectedId(n.id);
  };

  const handleDeleted = () => {
    const remaining = listNotes();
    setSelectedId(remaining[0]?.id ?? null);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-[18rem_1fr] gap-0 px-0 sm:px-4 py-4">
        <div className="rounded-none sm:rounded-l-xl sm:rounded-r-none bg-white shadow-sm sm:border">
          <Sidebar
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
            onCreate={handleCreated}
          />
        </div>
        <div className="rounded-none sm:rounded-r-xl sm:rounded-l-none bg-white shadow-sm sm:border overflow-hidden">
          <NoteEditor
            noteId={selectedId}
            onDeleted={handleDeleted}
            onSaved={() => {
              // no-op; sidebar reflects updated order on refresh via local read
            }}
          />
        </div>
      </div>
      <footer className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-gray-500">
        Built with the Ocean Professional theme.
      </footer>
    </main>
  );
}

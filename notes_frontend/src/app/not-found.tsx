import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center px-4">
      <section
        className="max-w-lg w-full rounded-xl border bg-white p-6 text-center shadow-sm"
        role="alert"
        aria-live="assertive"
      >
        <h1 className="text-2xl font-semibold text-[color:var(--text)]">404 – Page Not Found</h1>
        <p className="mt-2 text-sm text-gray-600">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-md px-4 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Go Home
        </Link>
      </section>
    </main>
  );
}

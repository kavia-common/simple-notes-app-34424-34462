"use client";
import Image from "next/image";
import { useState } from "react";

/**
 * Top navigation bar with app title/logo and placeholder login/logout.
 */
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur"
      role="banner"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Notes Logo"
            width={28}
            height={28}
            priority
          />
          <span className="text-[color:var(--text)] text-lg font-semibold">
            Ocean Notes
          </span>
        </div>
        <nav aria-label="User actions" className="flex items-center gap-2">
          <button
            onClick={() => setIsLoggedIn((v) => !v)}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: "var(--primary)" }}
            aria-pressed={isLoggedIn}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </nav>
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ocean Notes",
  description: "A simple notes application with local persistence.",
  applicationName: "Ocean Notes",
  authors: [{ name: "Kavia AI" }],
  keywords: ["notes", "nextjs", "ocean professional", "localstorage"],
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

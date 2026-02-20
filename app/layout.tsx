import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Dhruval Anandkar | Portfolio",
  description:
    "CS (Honors) @ Ashland University — Data Engineering, Full-Stack, BI. I build tech that works.",
  keywords: ["Portfolio", "Data Engineering", "Full-Stack", "Business Intelligence", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geist.variable} ${lora.variable} font-[family-name:var(--font-geist)] antialiased text-slate-800 bg-white`}
      >
        {children}
      </body>
    </html>
  );
}

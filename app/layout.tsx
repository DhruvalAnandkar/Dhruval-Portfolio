import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import "lenis/dist/lenis.css";
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

const siteUrl = "https://dhruval-portfolio-two.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dhruval Anandkar | Portfolio",
  description:
    "CS (Honors) @ Ashland University. Software & Systems Engineer building scalable backends and intelligent applications.",
  keywords: [
    "Dhruval Anandkar",
    "Portfolio",
    "Software Engineer",
    "Systems",
    "Full-Stack",
    "Ashland University",
    "Next.js",
  ],
  icons: {
    icon: [
      { url: "/brand-mark.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon" }],
  },
  openGraph: {
    title: "Dhruval Anandkar | Portfolio",
    description:
      "CS (Honors) @ Ashland University — Data Engineering, Full-Stack, BI. I build tech that works.",
    url: siteUrl,
    siteName: "Dhruval Anandkar Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruval Anandkar | Portfolio",
    description:
      "CS (Honors) @ Ashland University — Data Engineering, Full-Stack, BI. I build tech that works.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${lora.variable} font-[family-name:var(--font-geist)] antialiased text-slate-800 bg-transparent`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dhruval Anandkar",
              url: siteUrl,
              jobTitle: "Computer Science Student & Full-Stack Developer",
              affiliation: {
                "@type": "CollegeOrUniversity",
                name: "Ashland University",
              },
              sameAs: [
                "https://github.com/dhruvalanandkar",
                "https://linkedin.com/in/dhruvalanandkar",
                "https://devpost.com/DhruvalAnandkar",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}

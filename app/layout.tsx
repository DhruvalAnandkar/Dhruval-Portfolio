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

const siteUrl = "https://dhruvalanandkar.com";
const siteTitle = "Dhruval Anandkar | Portfolio";
const siteDescription =
  "Dhruval Anandkar — CS (Honors) @ Ashland University. Software & Systems Engineer: Data Engineering, Full-Stack, AI/ML. I build tech that works.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Dhruval Anandkar",
    "dhruval anandkar",
    "Portfolio",
    "Software Engineer",
    "Systems",
    "Full-Stack",
    "Ashland University",
    "Next.js",
  ],
  authors: [{ name: "Dhruval Anandkar", url: siteUrl }],
  creator: "Dhruval Anandkar",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/brand-mark.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon" }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Dhruval Anandkar Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
                "https://github.com/DhruvalAnandkar",
                "https://www.linkedin.com/in/dhruvalanandkar",
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

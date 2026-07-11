import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personalInfo, socialLinks } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

// TODO: Replace with the real production URL after deploying to Vercel.
const siteUrl = "https://sidak-chahal-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sidak Singh Chahal | Software Engineer & AI/LLM Developer",
  description:
    "Portfolio of Sidak Singh Chahal, a software engineer and final-year B.Tech student at IIIT Delhi working across full-stack development, backend systems, databases, and applied AI.",
  keywords: [
    "Sidak Singh Chahal",
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "React Developer",
    "Node.js Developer",
    "Spring Boot Developer",
    "AI Engineer",
    "LLM Engineer",
    "IIIT Delhi",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Sidak Singh Chahal | Software Engineer & AI/LLM Developer",
    description:
      "VS Code-inspired interactive portfolio — full-stack development, backend systems, and applied AI.",
    url: siteUrl,
    siteName: "Sidak Singh Chahal Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Sidak Singh Chahal | Software Engineer & AI/LLM Developer",
    description:
      "VS Code-inspired interactive portfolio — full-stack development, backend systems, and applied AI.",
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: "Software Engineer",
  email: `mailto:${personalInfo.email}`,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Indraprastha Institute of Information Technology Delhi",
  },
  sameAs: [socialLinks.github, socialLinks.linkedin],
  address: {
    "@type": "PostalAddress",
    addressCountry: "India",
    addressLocality: "Delhi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="sidak-dark"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";

// Dynamically import client-only interactive overlays
const Cursor = dynamic(
  () => import("@/components/motion/Cursor").then((m) => m.Cursor),
  { ssr: false }
);

const IntroLoader = dynamic(
  () => import("@/components/motion/IntroLoader").then((m) => m.IntroLoader),
  { ssr: false }
);

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "600", "700", "800"],
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sanketkumar.dev"),
  title: {
    default: "Sanket Kumar | Full-Stack & Systems Engineer",
    template: "%s | Sanket Kumar",
  },
  description:
    "Portfolio of Sanket Kumar. Computer Science Engineer specializing in scalable full-stack applications, distributed queue architectures, and AI evaluation systems. 9.05 CGPA | 300+ DSA.",
  applicationName: "Sanket Kumar Portfolio",
  keywords: [
    "Sanket Kumar",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "BullMQ",
    "Redis",
    "AI Engineer",
    "Delhi",
    "Portfolio",
    "Distributed Systems",
    "BPIT",
  ],
  authors: [{ name: "Sanket Kumar", url: "https://sanketkumar.dev" }],
  creator: "Sanket Kumar",
  publisher: "Sanket Kumar",
  alternates: {
    canonical: "https://sanketkumar.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sanketkumar.dev",
    title: "Sanket Kumar | Full-Stack & Systems Engineer",
    description:
      "Engineering resilient distributed queues, high-frame-rate web applications, and AI evaluation engines. 9.05 CGPA | 300+ DSA.",
    siteName: "Sanket Kumar Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Sanket Kumar - Full-Stack & Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanket Kumar | Full-Stack & Systems Engineer",
    description:
      "Engineering resilient distributed queues, high-frame-rate web applications, and AI evaluation engines. 9.05 CGPA | 300+ DSA.",
    creator: "@sanketkumar",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#001b1e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sanket Kumar",
  givenName: "Sanket",
  familyName: "Kumar",
  url: "https://sanketkumar.dev",
  image: "https://sanketkumar.dev/profile.jpg",
  jobTitle: "Full-Stack & Systems Engineer",
  email: "mailto:0sanket0kumar@gmail.com",
  gender: "Male",
  nationality: "Indian",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Bhagwan Parshuram Institute of Technology",
    url: "http://www.bpitindia.com/",
  },
  sameAs: [
    "https://github.com/SanketManav9620",
    "https://www.linkedin.com/in/sanket-kumar-292275291",
    "https://leetcode.com/u/SanketManav/",
  ],
  knowsAbout: [
    "Full-Stack Web Development",
    "Distributed Queue Architectures",
    "Next.js & React",
    "Node.js & Express",
    "BullMQ & Redis",
    "PostgreSQL & Prisma",
    "Machine Learning",
    "Algorithms & Data Structures",
  ],
  description:
    "Full-Stack and Systems Engineer with 9.05 CGPA and 300+ solved algorithmic problems, specializing in scalable distributed architectures and production web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#001b1e] text-[#f0fbfd] antialiased selection:bg-primary/30 selection:text-white`}
      >
        {/* Skip to main content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100000] px-4 py-2.5 rounded-lg bg-primary text-[#001b1e] font-mono text-xs font-bold shadow-glow outline-none ring-2 ring-white transition-all"
        >
          Skip to main content
        </a>

        {/* Subtle SVG Noise Texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Faint Grid Background */}
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none -z-10" />

        {/* Smooth Scroll Lenis Provider */}
        <SmoothScroll>
          {/* Custom Cursor (hidden on touch, dynamic client only) */}
          <Cursor />

          {/* Intro 0-100 Loader (once per session, dynamic client only) */}
          <IntroLoader />

          {/* Glassmorphism Navbar with scroll spy & hide/show */}
          <Navbar />

          {/* Content with main-content target */}
          <main id="main-content" tabIndex={-1} className="relative z-10 flex min-h-screen flex-col outline-none">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Manrope, Anek_Devanagari, Azeret_Mono } from "next/font/google";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { BootScript } from "@/components/chrome/BootScript";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

// Manrope keeps display and body typography clear; Anek preserves the name's roots.
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const azeretMono = Azeret_Mono({ variable: "--font-azeret-mono", subsets: ["latin"], display: "swap" });
const anekDevanagari = Anek_Devanagari({ variable: "--font-anek-devanagari", subsets: ["devanagari"], weight: "500", display: "swap", preload: false });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kartainnovations.com";
const SITE_NAME = "Karta Innovations";
const SITE_DESCRIPTION =
  "Karta builds the operational autonomy layer that helps unmanned systems stay oriented, act within human-approved intent, and return a reviewable record as operating conditions degrade.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Operational autonomy`,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Karta Innovations" }],
  keywords: [
    "operational autonomy",
    "autonomous systems",
    "situational intelligence",
    "GPS-denied navigation",
    "robotics",
    "defense autonomy",
    "deeptech",
    "autonomous systems autonomy stack",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Command that survives uncertainty`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Operational autonomy`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      // The site uses a single daylight palette.
      data-theme="light"
      className={`${manrope.variable} ${azeretMono.variable} ${anekDevanagari.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Pre-paint boot flag - lets CSS gate entrance choreography on JS */}
        <BootScript />
      </head>
      <body className="min-h-dvh bg-ink text-fg">
        <MotionProvider>
          <a href="#content" className="skip-link">
            Skip to content
          </a>
          <Nav />
          <main id="content" className="relative">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

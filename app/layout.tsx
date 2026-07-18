import type { Metadata } from "next";
import { Anek_Latin, Anek_Devanagari, Azeret_Mono } from "next/font/google";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { Grain } from "@/components/chrome/Grain";
import { BootScript } from "@/components/chrome/BootScript";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

// Anek (Ek Type, Mumbai): multiscript family - physical, precise, rooted in
// India without decorative shorthand. Variable weight + width axes let the
// hero display use wide heavy cuts while body stays in quiet middle cuts.
const anekLatin = Anek_Latin({
  variable: "--font-anek-latin",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
  display: "swap",
});

// Used once per page maximum - the कर्ता etymology moment, per brand playbook.
const anekDevanagari = Anek_Devanagari({
  variable: "--font-anek-devanagari",
  subsets: ["devanagari", "latin"],
  axes: ["wdth"],
  display: "swap",
});

const SITE_URL = "https://karta.ai";
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
      // Dark-only site: the attribute is static, not toggled.
      data-theme="dark"
      className={`${anekLatin.variable} ${azeretMono.variable} ${anekDevanagari.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Pre-paint boot flag - lets CSS gate entrance choreography on JS */}
        <BootScript />
      </head>
      <body className="min-h-dvh bg-ink text-fg">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <Grain />
        <Nav />
        <main id="content" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

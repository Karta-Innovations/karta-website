import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, Tiro_Devanagari_Sanskrit } from "next/font/google";
import { BootScript } from "@/components/chrome/BootScript";
import { Footer } from "@/components/chrome/Footer";
import { Nav } from "@/components/chrome/Nav";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SITE } from "@/lib/site";
import "./globals.css";

// Headlines: an expanded grotesk, set in capitals.
const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
// The grotesk carries everything that is measured, labelled or pressed.
const sans = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-instrument", display: "swap" });
// कर्ता is a Sanskrit word, so it is set in a Sanskrit face.
const deva = Tiro_Devanagari_Sanskrit({
  weight: "400",
  subsets: ["devanagari"],
  variable: "--font-tiro",
  display: "swap",
  preload: false,
});

const TITLE = `${SITE.name} · The brain for unmanned systems`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  keywords: [
    "GPS-denied navigation",
    "visual navigation",
    "GNSS jamming",
    "GNSS spoofing",
    "autonomy stack",
    "unmanned systems",
    "UAV autonomy",
    "swarm ground control",
    "SkyAnchor",
    "TENERE",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: TITLE,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0f2e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${deva.variable}`} suppressHydrationWarning>
      <head>
        <BootScript />
      </head>
      <body data-tone="night">
        <MotionProvider>
          <SmoothScroll />
          <RevealObserver />
          <a href="#content" className="skip-link">
            Skip to content
          </a>
          <Nav />
          <main id="content">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

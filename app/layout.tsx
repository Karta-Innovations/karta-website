import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Noto_Serif_Devanagari } from "next/font/google";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { Grain } from "@/components/chrome/Grain";
import { BootScript } from "@/components/chrome/BootScript";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Used sparingly as a manifesto marker per the brand playbook -
// "Indian marker. Use Devanagari sparingly as a design detail, not as decorative excess."
const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://karta.ai";
const SITE_NAME = "Karta Innovations";
const SITE_DESCRIPTION =
  "Operational autonomy layer for autonomous systems. Karta Innovations builds situational intelligence that works where GPS does not.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Autonomy that works where GPS does not`,
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
    title: `${SITE_NAME} - Autonomy that works where GPS does not`,
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
      className={`${geistSans.variable} ${jetbrainsMono.variable} ${notoSerifDevanagari.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Pre-paint boot flag - lets CSS gate entrance choreography on JS */}
        <BootScript />
      </head>
      <body className="min-h-dvh bg-ink text-fg">
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

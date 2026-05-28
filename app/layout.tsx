import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { Grain } from "@/components/chrome/Grain";
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

const SITE_URL = "https://karta.ai";
const SITE_NAME = "Karta";
const SITE_DESCRIPTION =
  "Operational autonomy for unmanned systems. Karta builds the navigation, decision and integration stack that works where GPS does not.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Autonomy that works where GPS does not`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Karta Innovations" }],
  keywords: [
    "operational autonomy",
    "unmanned systems",
    "GPS-denied navigation",
    "robotics",
    "defense autonomy",
    "deeptech",
    "drone autonomy stack",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Autonomy that works where GPS does not`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Operational autonomy`,
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
      className={`${geistSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
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

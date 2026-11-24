import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 82, 85, 88, 92],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "framer-motion"],
  },
  redirects: async () => [
    // Earlier site structures, folded into the homepage or the two detail pages.
    { source: "/evidence", destination: "/", permanent: false },
    { source: "/flights", destination: "/", permanent: false },
    { source: "/products", destination: "/skyanchor", permanent: false },
    { source: "/stack", destination: "/#stack", permanent: false },
    { source: "/mission", destination: "/#company", permanent: false },
    { source: "/vehicles", destination: "/", permanent: false },
    { source: "/vehicles/:slug", destination: "/", permanent: false },
  ],
};

export default nextConfig;

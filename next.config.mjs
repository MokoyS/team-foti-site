/** @type {import('next').NextConfig} */

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") || "";
const strapiHostname = strapiUrl ? (() => { try { return new URL(strapiUrl).hostname; } catch { return "localhost"; } })() : "localhost";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      { protocol: "https", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      { protocol: "https", hostname: strapiHostname, pathname: "/uploads/**" },
      { protocol: "http", hostname: strapiHostname, pathname: "/uploads/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  // Désactive ESLint pendant le build pour accélérer (lance "npm run lint" à part ou en CI)
  eslint: { ignoreDuringBuilds: true },
  // Pas de source maps en prod = build un peu plus rapide
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;

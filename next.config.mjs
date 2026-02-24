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
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;

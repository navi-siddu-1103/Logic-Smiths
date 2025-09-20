import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Enable static export
  output: "export",

  // Fix base path & assets for GitHub Pages repo
  basePath: isProd ? "/Logic-Smiths" : "",
  assetPrefix: isProd ? "/Logic-Smiths/" : "",

  // TypeScript & ESLint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Performance optimizations
  compiler: {
    removeConsole: isProd,
  },
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-avatar",
      "@radix-ui/react-scroll-area",
    ],
    optimizeCss: true,
  },

  // Image optimizations
  images: {
    unoptimized: true, // required for GitHub Pages (no Image Optimization server)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },

  // Dev optimizations
  ...(process.env.NODE_ENV === "development" && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
};

export default nextConfig;


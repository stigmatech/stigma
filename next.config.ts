import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-sanity", "sanity", "refractor", "react-refractor", "@sanity/vision", "sanity/structure"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "stigmatech.ca",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/c15t/:path*',
        destination: `${process.env.NEXT_PUBLIC_C15T_URL || 'https://stigmatech-us-east-stigma.c15t.dev'}/:path*`,
      },
    ];
  },
  serverExternalPackages: ["iceberg-js"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.midjourney.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'stealmyprompts-images.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-aca34c812a9fff2ebca728babff026f4.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-f443ddedcebd405a96e4041d23bdfef2.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '*.r2.dev',
      },
    ],
    unoptimized: false, // Keep optimization but allow fallback
  },
};

export default nextConfig;

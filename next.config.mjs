
import nextIntl from "next-intl/plugin";

const withNextIntl = nextIntl('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["admin.property-search.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.property-search.com",
      },
    ],
  },
  reactStrictMode: false, // Disable strict mode
  
  devIndicators: {
    autoPrerender: false,
  },
  

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
  
};

export default withNextIntl(nextConfig);
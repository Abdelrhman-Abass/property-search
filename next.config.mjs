
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
  output: 'standalone',
  
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
  
  webpack(config) {
    // Example of customizing Webpack if needed
    config.resolve.fallback = {
      fs: false, // Example if you need to disable specific Node.js modules (in case of SSR issues)
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=1, stale-while-revalidate=1",
          },
        ],
      },
    ];
  },
  
};

export default withNextIntl(nextConfig);
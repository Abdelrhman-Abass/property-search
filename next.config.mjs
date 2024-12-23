// import createNextIntlPlugin from "next-intl/plugin";

// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["admin.property-search.com"],
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "admin.property-search.com",
//       },
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
//       },
//     ];
//   },
// };

// export default withNextIntl(nextConfig);
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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
  webpack(config) {
    // Example of customizing Webpack if needed
    config.resolve.fallback = {
      fs: false, // Example if you need to disable specific Node.js modules (in case of SSR issues)
    };
    return config;
  },
};

export default withNextIntl(nextConfig);

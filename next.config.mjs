import withBundleAnalyzer from "@next/bundle-analyzer";
import nextIntl from "next-intl/plugin";

const withNextIntl = nextIntl('./src/i18n.js');

/** @type {import('next').NextConfig} */
// Initialize the Bundle Analyzer plugin
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.NODE_ENV === "production", // Enable only if production=true
});

// Next.js configuration
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
  compiler: {
    removeConsole: false, // Keep console logs in development
  },
  // reactStrictMode: false, // Disable strict mode
  // output: 'standalone', // Enable standalone output (if needed)
  // devIndicators: {
  //   autoPrerender: false, // Disable auto-prerendering
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
  //     },
  //   ];
  // },
  // webpack(config) {
  //   // Example of customizing Webpack if needed
  //   config.resolve.fallback = {
  //     fs: false, // Disable specific Node.js modules (in case of SSR issues)
  //   };
  //   return config;
  // },

  // Add caching headers for static assets
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, immutable", // Cache for 1 year
          },
        ],
      },
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, immutable", // Cache for 1 year
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, immutable", // Cache for 1 year
          },
        ],
      },
      {
        source: "/api/(.*)", // Cache API responses (if applicable)
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60", // Cache for 1 minute
          },
        ],
      },
    ];
  },
};

// Chain the plugins
export default withBundleAnalyzer(withNextIntl(nextConfig));



// import nextIntl from "next-intl/plugin";

// const withNextIntl = nextIntl('./src/i18n.js');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["admin.property-search.com"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "admin.property-search.com",
//       },
//     ],
//   },
//   reactStrictMode: false, // Disable strict mode
//   output: 'standalone',
  
//   devIndicators: {
//     autoPrerender: false,
//   },
  

//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
//       },
//     ];
//   },
  
//   webpack(config) {
//     // Example of customizing Webpack if needed
//     config.resolve.fallback = {
//       fs: false, // Example if you need to disable specific Node.js modules (in case of SSR issues)
//     };
//     return config;
//   },
  
  
// };

// export default withNextIntl(nextConfig);
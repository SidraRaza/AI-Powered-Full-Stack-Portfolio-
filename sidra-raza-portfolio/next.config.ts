/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide Next.js framework signature header
  poweredByHeader: false,

  // Disable production browser source maps so visitors cannot copy raw TypeScript source code
  productionBrowserSourceMaps: false,

  experimental: {
    serverActions: {}
  },

  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

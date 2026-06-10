import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/docs/07-simulation', destination: '/docs/07-simulation-crowd', permanent: true },
      { source: '/docs/08-reference', destination: '/docs/10-reference', permanent: true },
    ];
  },
};
export default nextConfig;

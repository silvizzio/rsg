import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/docs/09-simulation-storm', destination: '/docs/10-simulation-environment', permanent: true },
      { source: '/docs/07-simulation', destination: '/docs/07-simulation-overview', permanent: true },
      { source: '/docs/08-reference', destination: '/docs/11-reference', permanent: true },
      { source: '/docs/07-simulation-crowd', destination: '/docs/08-simulation-crowd', permanent: true },
      { source: '/docs/08-simulation-traffic', destination: '/docs/09-simulation-traffic', permanent: true },
      { source: '/docs/09-simulation-environment', destination: '/docs/10-simulation-environment', permanent: true },
      { source: '/docs/10-reference', destination: '/docs/11-reference', permanent: true },
    ];
  },
};
export default nextConfig;

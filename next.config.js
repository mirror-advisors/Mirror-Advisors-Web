/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Rebuild 2026-09: retired routes -> new structure
      { source: '/technology',                       destination: '/services',                        permanent: true },
      { source: '/erp',                              destination: '/services/erp-implementation',     permanent: true },
      { source: '/infinity',                         destination: '/services',                        permanent: true },
      { source: '/bankhours',                        destination: '/services',                        permanent: true },
      { source: '/support',                          destination: '/services/zoho',                   permanent: true },
      { source: '/cases',                            destination: '/services',                        permanent: true },
      { source: '/cases/:idx*',                      destination: '/services',                        permanent: true },
      { source: '/capabilities',                     destination: '/services',                        permanent: true },
      { source: '/stack',                            destination: '/services',                        permanent: true },
      { source: '/artificial-intelligence',          destination: '/services/ai-automation',          permanent: true },
      { source: '/artificial-intelligence/:path*',   destination: '/services/ai-automation',          permanent: true },
      { source: '/ai-field-guide',                   destination: '/services/ai-automation',          permanent: true },
      { source: '/services/zoho-implementation',     destination: '/services/zoho',                   permanent: true },
      { source: '/services/custom-ai-application',   destination: '/services/ai-automation',          permanent: true },
      { source: '/zoho/:product*',                   destination: '/services/zoho',                   permanent: true },
      // Legacy retired earlier
      { source: '/services/digital-marketing',       destination: '/services',                        permanent: true },
    ];
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Rebuild 2026-09: retired routes -> new structure
      { source: '/technology',                       destination: '/services',                        permanent: true },
      { source: '/erp',                              destination: '/services/software-implementation', permanent: true },
      { source: '/infinity',                         destination: '/services',                        permanent: true },
      { source: '/bankhours',                        destination: '/services',                        permanent: true },
      { source: '/support',                          destination: '/services/consulting-support',     permanent: true },
      { source: '/cases',                            destination: '/services',                        permanent: true },
      { source: '/cases/:idx*',                      destination: '/services',                        permanent: true },
      { source: '/capabilities',                     destination: '/services',                        permanent: true },
      { source: '/stack',                            destination: '/services',                        permanent: true },
      { source: '/artificial-intelligence',          destination: '/solutions/ai-custom-solutions',   permanent: true },
      { source: '/artificial-intelligence/:path*',   destination: '/solutions/ai-custom-solutions',   permanent: true },
      { source: '/ai-field-guide',                   destination: '/solutions/ai-custom-solutions',   permanent: true },
      { source: '/services/zoho-implementation',     destination: '/solutions/zoho',                  permanent: true },
      { source: '/services/custom-ai-application',   destination: '/solutions/ai-custom-solutions',   permanent: true },
      { source: '/zoho/:product*',                   destination: '/solutions/zoho',                  permanent: true },
      // Restructure 2026-10: solutions (what we sell) split from services (how we deliver)
      { source: '/services/zoho',                    destination: '/solutions/zoho',                  permanent: true },
      { source: '/services/ai-automation',           destination: '/solutions/ai-custom-solutions',   permanent: true },
      { source: '/services/erp-implementation',      destination: '/services/software-implementation', permanent: true },
      { source: '/odoo',                             destination: '/solutions/odoo',                  permanent: true },
      { source: '/avalara',                          destination: '/solutions/avalara',               permanent: true },
      // Legacy retired earlier
      { source: '/services/digital-marketing',       destination: '/services',                        permanent: true },
    ];
  },
};

module.exports = nextConfig;

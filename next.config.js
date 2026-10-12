/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Every destination below is a final URL (no redirect chains).
      // Rebuild 2026-09: retired routes -> new structure
      { source: '/technology',                       destination: '/delivery',                        permanent: true },
      { source: '/erp',                              destination: '/delivery/software-implementation', permanent: true },
      { source: '/infinity',                         destination: '/delivery',                        permanent: true },
      { source: '/bankhours',                        destination: '/delivery',                        permanent: true },
      { source: '/support',                          destination: '/delivery/consulting-support',     permanent: true },
      { source: '/cases',                            destination: '/solutions',                       permanent: true },
      { source: '/cases/:idx*',                      destination: '/solutions',                       permanent: true },
      { source: '/capabilities',                     destination: '/delivery',                        permanent: true },
      { source: '/stack',                            destination: '/delivery',                        permanent: true },
      { source: '/artificial-intelligence',          destination: '/platforms/claude',                permanent: true },
      { source: '/artificial-intelligence/:path*',   destination: '/platforms/claude',                permanent: true },
      { source: '/ai-field-guide',                   destination: '/platforms/claude',                permanent: true },
      { source: '/zoho/:product*',                   destination: '/platforms/zoho',                  permanent: true },
      { source: '/odoo',                             destination: '/platforms/odoo',                  permanent: true },
      { source: '/avalara',                          destination: '/integrations/avalara',            permanent: true },
      // Restructure 2026-10-12 (Paul): Trusted Platforms / Solutions (case
      // studies) / Integrations / Delivery. The old product pages moved out
      // of /solutions, and Services became Delivery.
      { source: '/solutions/ai-custom-solutions',    destination: '/platforms/claude',                permanent: true },
      { source: '/solutions/zoho',                   destination: '/platforms/zoho',                  permanent: true },
      { source: '/solutions/ai-on-zoho',             destination: '/platforms/ai-on-zoho',            permanent: true },
      { source: '/solutions/odoo',                   destination: '/platforms/odoo',                  permanent: true },
      { source: '/solutions/avalara',                destination: '/integrations/avalara',            permanent: true },
      { source: '/services/zoho',                    destination: '/platforms/zoho',                  permanent: true },
      { source: '/services/zoho-implementation',     destination: '/platforms/zoho',                  permanent: true },
      { source: '/services/ai-automation',           destination: '/platforms/claude',                permanent: true },
      { source: '/services/custom-ai-application',   destination: '/platforms/claude',                permanent: true },
      { source: '/services/erp-implementation',      destination: '/delivery/software-implementation', permanent: true },
      { source: '/services/digital-marketing',       destination: '/delivery',                        permanent: true },
      { source: '/services',                         destination: '/delivery',                        permanent: true },
      { source: '/services/:slug',                   destination: '/delivery/:slug',                  permanent: true },
      // Case studies waiting on client permission: temporary, so search
      // engines don't drop the URL for good.
      { source: '/case-studies/:slug*',              destination: '/solutions',                       permanent: false },
    ];
  },
};

module.exports = nextConfig;

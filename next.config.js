/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/services/digital-marketing',
        destination: '/services',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

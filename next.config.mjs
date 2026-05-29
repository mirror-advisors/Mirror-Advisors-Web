/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/capabilities', destination: '/services', permanent: false },
      { source: '/stack', destination: '/technology', permanent: false },
    ];
  },
};

export default nextConfig;

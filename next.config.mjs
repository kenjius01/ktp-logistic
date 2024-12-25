/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.mhdigital.vn',
      },
      {
        protocol: 'https',
        hostname: 'cms-api.thinhphat-logistics.com',
      },
    ],
  },
};

export default nextConfig;

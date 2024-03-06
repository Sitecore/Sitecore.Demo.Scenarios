/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mms-delivery.sitecorecloud.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'ch.sitecoredemo.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;

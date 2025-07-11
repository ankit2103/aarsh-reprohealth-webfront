/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skool-search.s3.ap-south-1.amazonaws.com",
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: false,
   compiler: {
    // Removes all console.* methods except error and warn in production
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["@acme/ui", "@prisma/client"],
  },
};

module.exports = nextConfig;

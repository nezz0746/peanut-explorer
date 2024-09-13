/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@peanut/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "assets.smold.app",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

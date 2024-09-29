/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@peanut/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

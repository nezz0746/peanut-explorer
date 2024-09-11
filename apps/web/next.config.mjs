/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "assets.smold.app",
        "protocol": "https",
      }
    ]
  }
};

export default nextConfig;

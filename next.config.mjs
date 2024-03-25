/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fiery-ram-420.convex.cloud",
      },
    ],
  },
};

export default nextConfig;

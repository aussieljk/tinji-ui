import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "app.cal.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
  transpilePackages: ["@tinji/ui"],
};

export default nextConfig;

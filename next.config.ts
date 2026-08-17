import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* output: "standalone" breaks Vercel deployments (ENOENT next-server.js.nft.json).
   * Keep standalone mode for Docker builds, but disable it on Vercel. */
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;

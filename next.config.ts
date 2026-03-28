import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // We remove the turbopack: { root: ... } block entirely.
  // Next.js will now correctly find the root since we deleted the parent lockfile.
};

export default nextConfig;
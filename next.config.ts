import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: {
    position: 'bottom-right',
  },
  // experimental: {
  //   appIsrStatus: false,
  // },
};

export default nextConfig;
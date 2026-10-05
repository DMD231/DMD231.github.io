import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статика для GitHub Pages: `npm run build` складывает сайт в папку out/
  output: "export",
  trailingSlash: true,
};

export default nextConfig;

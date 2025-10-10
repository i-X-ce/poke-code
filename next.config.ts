import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
};

if (process.env.NODE_ENV === "development") {
  delete nextConfig.output;
  nextConfig.pageExtensions?.push("dev.tsx", "dev.ts", "dev.jsx", "dev.js");
}

export default nextConfig;

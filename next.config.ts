import { BASE_PATH } from "@/lib/constant/userSetting";
import isDevelopment from "@/lib/util/isDevelopment";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  basePath: isDevelopment ? undefined : BASE_PATH,
  assetPrefix: isDevelopment ? undefined : `${BASE_PATH}/`,
};

if (isDevelopment) {
  delete nextConfig.output;
  nextConfig.pageExtensions?.push("dev.tsx", "dev.ts", "dev.jsx", "dev.js");
}

export default nextConfig;

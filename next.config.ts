import type { NextConfig } from "next";

// GITHUB_PAGES=1 builds a static export for GitHub Pages, served under /<repo-name>.
// The contact API needs a server, so the Pages workflow removes it and the form shows a notice instead.
const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? process.env.PAGES_BASE_PATH || "" : "";

const nextConfig: NextConfig = pages
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_STATIC_EXPORT: "1" },
      images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
    }
  : {};

export default nextConfig;

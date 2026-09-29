/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/user-directory-dashboard",
  assetPrefix: "/user-directory-dashboard/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
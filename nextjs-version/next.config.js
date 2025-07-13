/** @type {import('next').NextConfig} */
const nextConfig = {
  // 不使用 output: 'export'，保持动态路由功能
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
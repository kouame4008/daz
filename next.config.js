/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  distDir: 'build',
  // images: {
  //   dangerouslyAllowSVG: true,
  //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  //   loader: 'imgix',
  //   path: '/',
  // },
}

module.exports = nextConfig

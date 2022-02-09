/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.svg$/,
      // issuer: {
      //   test: /\.(js|ts)x?$/,
      //  // for webpack 5 use
      //  // { and: [/\.(js|ts)x?$/] }
      // },
      
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: #6 add nextjs security headers @rsymingt
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  eslint: {
    dirs: ['src'],
  },
  webpack: (config) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.svg$/,
      // issuer: {
      //   test: /\.(js|ts)x?$/,
      //  // for webpack 5 use
      //  // { and: [/\.(js|ts)x?$/] }
      // },

      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;

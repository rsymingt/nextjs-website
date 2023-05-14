/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: #6 add nextjs security headers @rsymingt
  reactStrictMode: true,
  output: 'standalone',
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

    return {
      ...config,
      watch: true,
      watchOptions: {
        aggregateTimeout: 1000,
        poll: 1000,
        ignored: ['node_modules', '.next'],
      },
    };
  },
};

module.exports = nextConfig;

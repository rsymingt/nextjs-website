/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: #6 add nextjs security headers @rsymingt
  reactStrictMode: true,
  output: 'standalone',
  eslint: {
    dirs: ['src'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
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

    config.module.rules.push({
      test: /\.worker\.js$/,
      // use: 'worker-loader',
      loader: 'worker-loader',
      options: {
        filename: 'static/[fullhash].worker.js',
        publicPath: '/_next/',
      },
    });

    // config.module.rules.push({
    //   test: /\.worker\.js$/,
    //   use: { loader: 'worker-loader' },
    // });

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

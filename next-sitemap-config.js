/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://website.rsymington.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // outDir: 'src/public',
  exclude: ['/server-sitemap-index.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://website.rsymington.com/server-sitemap-index.xml', // <==== Add here
    ],
  },
};

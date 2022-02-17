// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';

import portfolioData from '../../../data/portfolio';

const baseURL = 'https://website.rsymington.com';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const fields = Array(portfolioData.projects.length)
    .fill(0)
    .map((id, i) => ({
      loc: `${baseURL}/portfolio/${i}`,
      lastmod: new Date().toISOString(),
    }));

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {
  return;
}

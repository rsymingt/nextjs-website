// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndex } from 'next-sitemap';
import { GetServerSideProps } from 'next';

import portfolioData from '../../../data/portfolio';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const baseURL = 'https://website.rsymington.com';

  return getServerSideSitemapIndex(
    ctx,
    Array(portfolioData.projects.length)
      .fill(0)
      .map((id, i) => `${baseURL}/portfolio/${i}`)
  );
};

// Default export to prevent next.js errors
export default function SitemapIndex() {
  return;
}

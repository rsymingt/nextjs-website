import { useRouter } from 'next/router';
import Image from 'next/image';

import portfolioData from '../../../data/portfolio';
import React, { useCallback, useState } from 'react';

import Head from 'next/head';
import scrollIntoViewWithInterupt from '../../utils/scrollIntoViewWithInterrupt';

export default function PortfolioPage() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const headerRef = useCallback(
    (el) => {
      if (el && !scrolled) {
        scrollIntoViewWithInterupt(el, 500);
        setScrolled(true);
      }
    },
    [scrolled]
  );

  if (!id || Number.isNaN(id)) {
    return <h1>Invalid URL</h1>;
  }

  const project = portfolioData.projects[parseInt(id.toString())];

  return (
    <div id="Project">
      <Head>
        <title>Ryan Symington | Project | {project.title}</title>
      </Head>
      <div className="flex flex-col min-h-screen h-full w-full bg-white font-sans pb-10">
        <Image
          className="w-full"
          src={project.banner}
          layout="responsive"
          alt={project.title}
        />
        <div
          ref={headerRef}
          className="container max-w-screen-md px-8 mt-4 flex flex-col space-y-4"
        >
          <h1 className="font-bold pb-6 border-b-1">{project.title}</h1>
          <project.description />
          <div className="flex flex-wrap gap-x-10 gap-y-2 pt-2">
            {project.additional &&
              Object.entries(project.additional)
                .concat([['Project Type', project.type]])
                .map(([key, value], i) => (
                  <span key={`additional-${i}`} className="w-fit">
                    <span className="text-neutral-500 font-medium">{key}</span>
                    <br />
                    <span className="text-2xl font-medium">{value}</span>
                  </span>
                ))}
            {Boolean(project.githubURL?.length) && (
              <span className="w-fit">
                <span className="text-neutral-500 font-medium">
                  Project Link
                </span>
                <br />
                <span className="text-2xl font-medium">
                  <a
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                    {...(project.githubURL?.length
                      ? { href: project.githubURL }
                      : {})}
                  >
                    Code
                  </a>
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

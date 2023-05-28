import React, { forwardRef } from "react";
import Section from "../section";
import portfolioData from "../../../data/portfolio";
import classNames from "classnames";
import Image from "next/image";


const Portfolio = forwardRef<HTMLElement>(({}, ref) => (
    <Section ref={ref}>
      <div className="container px-9 w-full flex flex-col items-center justify-center">
        <h1 className="mb-4">Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
          {portfolioData.projects
            .slice()
            .reverse()
            .map(({ title, type, banner, additional: { Language } }, i) => (
              <a
                key={`portfolio-${i}`}
                href={`/portfolio/${portfolioData.projects.length - i - 1}`}
              >
                <div
                  className={classNames(
                    'relative grid grid-cols-1 grid-rows-2',
                    'w-72 h-80 sm:w-80 sm:h-80 rounded-xl bg-neutral-900',
                    'transition-transform duration-300 ease-in-out hover:scale-110',
                    'hover:cursor-pointer'
                  )}
                >
                  <Image
                    className="absolute rounded-t-xl top-0 left-0 opacity-75"
                    src={banner}
                    alt={title}
                    placeholder="blur"
                  />
                  <div
                    className={classNames(
                      'absolute inset-0 bg-black opacity-50 rounded-xl pointer-events-none'
                    )}
                  ></div>
                  <div
                    className={classNames(
                      'absolute inset-0 bg-gradient-to-b from-vibrant-red opacity-0 rounded-xl',
                      'transition-all',
                      'hover:bg-gradient-to-b sm:hover:from-vibrant-red sm:hover:via-vibrant-red sm:hover:to-transparent sm:hover:opacity-80',
                      'active:opacity-0'
                    )}
                  ></div>
                  <span className="relative row-start-2 rounded-xl flex-1 inline-block text-center pointer-events-none">
                    <p className="my-3">{type ? type : 'Development'}</p>
                    <h4 className="my-3">{title}</h4>
                    <p className="my-3">{Language ? Language : ''}</p>
                  </span>
                </div>
              </a>
            ))}
        </div>
      </div>
    </Section>
  ));
  
  Portfolio.displayName = 'Portfolio';

  export default Portfolio
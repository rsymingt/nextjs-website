import React from 'react';

import classNames from 'classnames';

import LinkedInIcon from '../../public/linkedin.svg';
import GithubIcon from '../../public/github.svg';

import config from '../../data/global';

export default function Footer() {
  return (
    <div
      className={classNames(
        'bg-light-black p-4 h-20',
        'flex items-stretch justify-between'
      )}
    >
      <div className={classNames('px-9 flex justify-start', '')}>
        <a
          className={classNames(
            'p-2 flex items-center',
            'transition-all duration-300',
            'hover:text-white  fill-zinc-400 hover:fill-white hover:-translate-y-0.5'
          )}
          href={config.linkedinURL}
          rel="noreferrer"
          target="_blank"
        >
          <LinkedInIcon
            className="h-2/3"
            // width={16}
            // height={16}
          />
        </a>
        <a
          className={classNames(
            'p-2 flex items-center',
            'transition-all duration-300',
            'hover:text-white  fill-zinc-400 hover:fill-white hover:-translate-y-0.5'
          )}
          href={config.githubURL}
          rel="noreferrer"
          target="_blank"
        >
          <GithubIcon
            className="h-2/3"
            // width={16}
            // height={16}
          />
        </a>
      </div>
      <span className="flex items-center justify-end pr-2">
        <h4>Powered by Next.js</h4>
      </span>
    </div>
  );
}

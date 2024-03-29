import React, { Fragment, useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

import LinkedInIcon from '../../public/linkedin.svg';
import GithubIcon from '../../public/github.svg';

import config from '../../data/global';

export default function Navbar({
  navigation,
  onNavClick,
  current,
}: {
  navigation: Navigation;
  onNavClick: (i: number) => void;
  current: number;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll() {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Disclosure
      as="nav"
      className={classNames(
        'transition-all duration-300 fixed inset-x-0 z-50 bg-neutral-900',
        scrollPosition ? '' : 'bg-opacity-0' // 0
      )}
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center"></div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item, i) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          'relative py-5 block whitespace-nowrap',
                          'hover:cursor-pointer hover:text-vibrant-red hover:after:w-full hover:after:bg-red-700\
                                after:transition-width after:ease-out after:duration-300 after:absolute after:h-0.5 after:bottom-0 after:left-0',
                          i === current
                            ? 'text-vibrant-red after:bg-vibrant-red after:w-full'
                            : 'text-white after:bg-white after:w-1/3'
                        )}
                        aria-current={i === current ? 'page' : undefined}
                        onClick={() => onNavClick(i)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-10">
                <a
                  className={classNames(
                    'p-2',
                    'transition-all duration-300',
                    'hover:text-white  fill-zinc-400 hover:fill-white hover:-translate-y-0.5'
                  )}
                  href={config.linkedinURL}
                  rel="noreferrer"
                  target="_blank"
                >
                  <LinkedInIcon
                    // className='h-4 w-4'
                    width={16}
                    height={16}
                  />
                </a>
                <a
                  className={classNames(
                    'p-2',
                    'transition-all duration-300',
                    'hover:text-white  fill-zinc-400 hover:fill-white hover:-translate-y-0.5'
                  )}
                  href={config.githubURL}
                  rel="noreferrer"
                  target="_blank"
                >
                  <GithubIcon
                    // className='h-4 w-4'
                    width={16}
                    height={16}
                  />
                </a>
                {/* <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                {/* Profile dropdown */}
                {/* <Menu as="div" className="ml-3 relative">
                        <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            />
                        </Menu.Button>
                        </div>
                        <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                            {({ active }) => (
                                <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                Your Profile
                                </a>
                            )}
                            </Menu.Item>
                            <Menu.Item>
                            {({ active }) => (
                                <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                Settings
                                </a>
                            )}
                            </Menu.Item>
                            <Menu.Item>
                            {({ active }) => (
                                <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                Sign out
                                </a>
                            )}
                            </Menu.Item>
                        </Menu.Items>
                        </Transition>
                    </Menu> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, i) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    i === current
                      ? 'bg-vibrant-red text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={i === current ? 'page' : undefined}
                  onClick={() => onNavClick(i)}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export type Navigation = Array<{
  name: string;
  href: string;
}>;

import type { NextPage } from 'next';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import classNames from 'classnames';

import aboutData from '../../data/about';
import TabbedContent from '../components/tabbed-content';
import Section from '../components/section';
import TextCarousell from '../components/text-carousell';
import Navbar, { Navigation } from '../components/navbar';

import MeJPG from '../../public/intro/me-cropped.jpg';
import MapleLeafSVG from '../../public/intro/maple-leaf.svg';

import Footer from '../components/footer';
import { useRouter } from 'next/router';
import scrollIntoViewWithInterupt from '../utils/scrollIntoViewWithInterrupt';
import { Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { ContactData } from './api/contact';
import Fractal from '../components/Fractal';
import Portfolio from '../components/portfolio';

const navigation: Navigation = [
  { name: 'Home', href: '#Home' },
  { name: 'About', href: '#About' },
  { name: 'Portfolio', href: '#Portfolio' },
  { name: 'Contact', href: '#Contact' },
];

const Home: NextPage = () => {
  const { asPath } = useRouter();

  const navRefs = useRef<Array<HTMLElement | null>>(Array(navigation.length));
  const [navSelected, setNavSelected] = useState(0);

  const setNav = useCallback(
    (i: number) => {
      const newUrl = `/#${navigation[navSelected].name}`;

      setNavSelected(i);

      window.history.replaceState(
        {
          ...window.history.state,
          as: newUrl,
          url: newUrl,
        },
        '',
        newUrl
      );
    },
    [navSelected]
  );

  function handleNavbarClick(i: number) {
    setNav(i);

    const el = navRefs.current[i];

    if (el) {
      scrollIntoViewWithInterupt(el);
    }
  }

  useEffect(() => {
    const hash = asPath.split('#')[1];

    const i = navigation.findIndex((item) => item.name === hash);

    if (i >= 0) {
      const el = navRefs.current[i];

      if (el) {
        scrollIntoViewWithInterupt(el, 500);
      }
    }
  }, [asPath, setNav]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navRefs.current.forEach((el, i) => {
      if (el) {
        let previousY = 0;
        let previousRatio = 0;

        const observer = new IntersectionObserver(
          // eslint-disable-next-line complexity
          ([entry]) => {
            // isIntersecting(entry.isIntersecting, i);
            const currentY = entry.boundingClientRect.y;
            const currentRatio = entry.intersectionRatio;
            const isIntersecting = entry.isIntersecting;

            // Scrolling down/up
            if (currentY < previousY) {
              if (currentRatio > previousRatio && isIntersecting) {
                // 'Scrolling down enter';
                setNav(i);
              } else {
                // 'Scrolling down leave';
                // setNav(i < navRefs.current.length - 1 ? i + 1 : i);
              }
            } else if (currentY > previousY && isIntersecting) {
              if (currentRatio < previousRatio) {
                // 'Scrolling up leave';
                // setNav(i > 0 ? i - 1 : i);
              } else {
                // 'Scrolling up enter';
                setNav(i);
              }
            }

            previousY = currentY;
            previousRatio = currentRatio;
          },
          { threshold: 0, rootMargin: '-51% 0% -49% 0%' }
        );

        observer.observe(el);

        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [setNav]);

  return (
    <div id="main">
      <Head>
        <title>Ryan Symington | Software Developer</title>
      </Head>
      <Navbar
        onNavClick={handleNavbarClick}
        current={navSelected}
        navigation={navigation}
      />
      <div className="">
        <Intro ref={(el) => (navRefs.current[0] = el)} />
        <About ref={(el) => (navRefs.current[1] = el)} />
        <Portfolio ref={(el) => (navRefs.current[2] = el)} />
        <Contact ref={(el) => (navRefs.current[3] = el)} />
      </div>
      <Footer />
    </div>
  );
};

const Intro = forwardRef<HTMLElement>(({}, ref) => (
  <Section ref={ref} className="flex relative bg-transparent">
    <div className="container grid lg:grid-cols-3 w-full px-9">
      <div className="w-fit mx-auto col-span-2 text-white z-20 text-left">
        <h1>
          Hi, I&rsquo;m Ryan Symington
          <TextCarousell
            className="text-vibrant-red font-black"
            timeout={5000}
            selections={[
              'Full-Stack Developer.',
              'NodeJS Developer.',
              'React Developer.',
            ]}
          />
          <div className="h-12 w-12 sm:w-16 sm:h-16 md:h-20 md:w-20">
            <MapleLeafSVG className="w-full h-full" />
          </div>
        </h1>
      </div>
      <div className="col-span-1">
        <div className="absolute inset-0 flex flex-row">
          <Fractal />
          <Image
            className={classNames(
              'intro-img',
              'grayscale opacity-90',
              'gradient-mask-l-50'
            )}
            fill={true}
            src={MeJPG}
            alt="Ryan Symington"
            placeholder="blur"
            quality={50}
          />
        </div>
      </div>
    </div>
  </Section>
));

Intro.displayName = 'Intro';

const About = forwardRef<HTMLElement>(({}, ref) => (
  // TODO: #3 Add ability to scroll excess TabbedContent
  <Section ref={ref}>
    <div className="container px-9 w-full sm:w-1/3 lg:w-1/2 md:flex">
      <div className="flex flex-1 flex-col">
        <h1 className="text-center">About Me</h1>
        <p className="mt-4 mb-6 text-lg">
          It&apos;s been nearly 10 years since devoting myself to studying
          programming. I&apos;ve collaborated with very talented people to build
          Full-Stack MERN Applications and Python/NodeJS Microservices for
          internal and external use. I&apos;m familiar with utilizing the DevOps
          lifecycle to continuously deploy reliable code with traceable
          monitoring. I&apos;m quietly confident, always seeking a challenge,
          and constantly working to improve and grow my skills and knowledge.
        </p>
        <TabbedContent tabbedContent={aboutData.tabbedContent} />
      </div>
    </div>
  </Section>
));

About.displayName = 'About';

// TODO: #11 add Blog Section @rsymingt

const Contact = forwardRef<HTMLElement>(({}, ref) => {
  const { register, handleSubmit, reset } = useForm<ContactData>();

  const [status, setStatus] = useState<boolean | string>(false);

  async function onSubmit(data: ContactData) {
    reset({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        setStatus('Success');
      } else {
        setStatus('Failed');
      }
      setTimeout(() => setStatus(false), 5000);
    });
  }

  return (
    <Section ref={ref}>
      <div className="container relative px-9 w-full sm:w-1/2 md:flex md:flex-col">
        <h1 className="mb-2">Contact Me</h1>
        <p>Please feel free to contact me &#128515;</p>
        <br />

        <input
          {...register('name', {
            required: true,
          })}
          className={classNames(
            'w-full sm:w-auto rounded-md border-2 border-neutral-600 bg-transparent p-2 my-2 text-white outline-none',
            'transition-all focus:border-neutral-500 focus:scale-105'
          )}
          placeholder="Your Name *"
          type="text"
        />

        <input
          {...register('email', {
            required: true,
            pattern:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
          })}
          className={classNames(
            'w-full sm:w-auto rounded-md border-2 border-neutral-600 bg-transparent p-2 my-2 text-white outline-none',
            'transition-all focus:border-neutral-500 focus:scale-105'
          )}
          placeholder="Your Email *"
          type="email"
        />

        <input
          {...register('subject', {
            required: true,
          })}
          className={classNames(
            'w-full sm:w-auto rounded-md border-2 border-neutral-600 bg-transparent p-2 my-2 text-white outline-none',
            'transition-all focus:border-neutral-500 focus:scale-105'
          )}
          placeholder="Your Subject *"
          type="text"
        />

        <textarea
          {...register('message', {
            required: true,
          })}
          className={classNames(
            'w-full sm:w-auto rounded-md border-2 h-32 border-neutral-600 bg-transparent p-2 my-2 text-white outline-none',
            'transition-all focus:border-neutral-500 focus:scale-105'
          )}
          placeholder="Your Message *"
        />

        <button
          className={classNames(
            'text-white text-lg',
            'bg-vibrant-red self-baseline mt-2 py-2 px-8 rounded-md border-vibrant-red border-2',
            'transition-all duration-300 ease-in-out hover:bg-transparent hover:-translate-y-1'
          )}
          onClick={handleSubmit(onSubmit)}
        >
          SUBMIT
        </button>

        <Transition
          className="bg-white rounded-lg mt-2 p-4"
          show={status ? true : false}
          enter="transition-all duration-300"
          enterFrom="h-0"
          enterTo="h-full"
          leave="transition-all duration-300"
          leaveFrom="h-full"
          leaveTo="h-0"
        >
          {status}
        </Transition>
      </div>
    </Section>
  );
});

Contact.displayName = 'Contact';

export default Home;

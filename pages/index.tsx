
import type { NextPage } from 'next'

import React, { RefObject, useEffect, useRef, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Transition } from '@headlessui/react';
import Layout from '../components/layout';
import classNames from 'classnames';

import aboutData from '../data/about.json';
import TabbedContent from '../components/tabbed-content';
import Section from '../components/section';
import TextCarousell from '../components/text-carousell';
import Navbar, { Navigation } from '../components/navbar';

const navigation: Navigation = [
    { name: 'Home', href: '#Home' },
    { name: 'About', href: '#About' },
    { name: 'Portfolio', href: '#Portfolio' },
    { name: 'Contact', href: '#Contact' },
]

 function useOnScreen(ref: React.RefObject<HTMLElement>) {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    )
  
    useEffect(() => {
        if(ref.current)
            observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])
  
    return isIntersecting
}

const Home: NextPage = () => {
    const [navSelected, setNavSelected] = useState(0);

    function handleNavbarClick(i: number) {
        setNavSelected(i);
    }

    function handleScroll( ref: React.RefObject<HTMLElement> ) {
        if(ref && ref.current) {
            const { current: { offsetTop, offsetHeight, id } } = ref;
            const position = window.pageYOffset + 10;
            
            if(offsetTop < position && (offsetTop + offsetHeight) > position) {
                const i = Object.values(navigation).findIndex(n => n.name === id);
                setNavSelected(i)
            }
        }
    }

    return (
        <div>
            <Head>
            <title>Create Next App</title>
            </Head>
            <Navbar onNavClick={handleNavbarClick} current={navSelected} navigation={navigation}/>
            <div className=''>
                <Intro id="Home" handleScroll={handleScroll}/>
                <About id="About" handleScroll={handleScroll}/>
                <Portfolio id="Portfolio" handleScroll={handleScroll}/>
                <Contact id="Contact" handleScroll={handleScroll}/>
            </div>
        </div>
    )
}

function Intro({ id, handleScroll }: {
    id: string,
    handleScroll: (ref: RefObject<HTMLElement>) => void,
}) {
    const ref = useRef<HTMLElement>(null);

    function _handleScroll() {
        handleScroll(ref);
    }

    useEffect(() => {
        window.addEventListener('scroll', _handleScroll);
        return () => window.removeEventListener('scroll', _handleScroll);
    })

    return(
        <Section ref={ref} id={id} className='flex'>
            <div className='container w-full px-9 text-left'>
                <div className="text-white">
                        <h1>
                            Hi, I&rsquo;m Ryan Symington
                            <TextCarousell className='text-vibrant-red' timeout={5000} 
                            selections={['Full-Stack Developer.', 'NodeJS Developer.', 'React Developer.']}/>
                            <Image className='filter-vibrant-red' src="/intro/maple-leaf.svg" width={48} height={48}/>
                        </h1>
                    </div>
            </div>
        </Section>
    );
}

function About({ id, handleScroll }: {
    id: string,
    handleScroll: (ref: RefObject<HTMLElement>) => void,
}) {
    const ref = useRef<HTMLElement>(null);

    function _handleScroll() {
        handleScroll(ref);
    }

    useEffect(() => {
        window.addEventListener('scroll', _handleScroll);
        return () => window.removeEventListener('scroll', _handleScroll);
    })

    return(
        <Section ref={ref} id={id}>
            <div className='container px-9 w-full sm:w-1/2 md:flex'>
                <div className="flex flex-1 flex-col">
                    <h1 className='text-center'>About Me</h1>
                    <p className='mt-4 mb-6'>
                        I'm hardworking and attentive software developer who thrives when working on individual problems or aspects of a project and actively take a step back to view the project at higher level to find better solutions and possible future problems. 
                    </p>
                    <TabbedContent tabbedContent={aboutData.tabbedContent}/>
                </div>
            </div>
        </Section>
    )
}

import portfolioData from '../data/portfolio';

function Portfolio({ id, handleScroll }: {
    id: string,
    handleScroll: (ref: RefObject<HTMLElement>) => void,
}) {
    const ref = useRef<HTMLElement>(null);

    function _handleScroll() {
        handleScroll(ref);
    }

    useEffect(() => {
        window.addEventListener('scroll', _handleScroll);
        return () => window.removeEventListener('scroll', _handleScroll);
    })

    return(
        <Section ref={ref} id={id}>
            <div className='container px-9 w-full flex flex-col items-center justify-center'>
                <h1 className='mb-4'>Portfolio</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
                    {portfolioData.projects.map(({ title, description, banner }) => {
                        return(
                            <div className={classNames(
                                'grid grid-cols-1 grid-rows-2 w-72 h-80 sm:w-72 sm:h-72 rounded-xl bg-gray-500',
                                'transition-all duration-300 hover:scale-110'
                            )}>
                                <div className='col-start-1 row-start-2 text-center'>
                                    <p className='my-3'>Development</p>
                                    <h4 className='my-3'>{title}</h4>
                                    <button className='mt-4'>TEST</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Section>
    )
}

function Contact({ id, handleScroll }: {
    id: string,
    handleScroll: (ref: RefObject<HTMLElement>) => void,
}) {
    const ref = useRef<HTMLElement>(null);

    function _handleScroll() {
        handleScroll(ref);
    }

    useEffect(() => {
        window.addEventListener('scroll', _handleScroll);
        return () => window.removeEventListener('scroll', _handleScroll);
    })

    return(
        <Section ref={ref} id={id}>
            <div className='container px-9 w-full sm:w-1/2 md:flex'>
                <div className="flex flex-1 flex-col">
                    <h1 className='text-center'>About Me</h1>
                    <p className='mt-4 mb-6'>
                        I'm hardworking and attentive software developer who thrives when working on individual problems or aspects of a project and actively take a step back to view the project at higher level to find better solutions and possible future problems. 
                    </p>
                    <TabbedContent tabbedContent={aboutData.tabbedContent}/>
                </div>
            </div>
        </Section>
    )
}

export default Home

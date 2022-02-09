
import type { NextPage } from 'next'

import React, { forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Transition } from '@headlessui/react';
import Layout from '../components/layout';
import classNames from 'classnames';

import aboutData from '../data/about';
import TabbedContent from '../components/tabbed-content';
import Section from '../components/section';
import TextCarousell from '../components/text-carousell';
import Navbar, { Navigation } from '../components/navbar';

import MeJPG from '../public/intro/me-cropped.jpg';

const navigation: Navigation = [
    { name: 'Home', href: '#Home' },
    { name: 'About', href: '#About' },
    { name: 'Portfolio', href: '#Portfolio' },
    { name: 'Contact', href: '#Contact' },
]

// interesting might use in future
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
            const position = window.pageYOffset + 64;
            
            if(offsetTop < position && (offsetTop + offsetHeight) > position) {
                const i = Object.values(navigation).findIndex(n => n.name === id);
                if(navSelected !== i) {
                    setNavSelected(i)
                    history.pushState(null, '', `#${id}`);
                }
            }
        }
    }

    return (
        <div>
            <Head>
            <title>Software Developer | Ryan Symington</title>
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
        <Section ref={ref} id={id} className='flex relative'>
            <div className='container grid lg:grid-cols-3 w-full px-9'>
                <div className="w-fit mx-auto col-span-2 text-white z-20 text-left">
                    <h1>
                        Hi, I&rsquo;m Ryan Symington
                        <TextCarousell className='text-vibrant-red font-black' timeout={5000} 
                        selections={['Full-Stack Developer.', 'NodeJS Developer.', 'React Developer.']}/>
                        <div className='h-12 w-12 sm:w-16 sm:h-16 md:h-20 md:w-20'>
                            <Image 
                            className='filter-vibrant-red' 
                            src="/intro/maple-leaf.svg" 
                            width={48} 
                            height={48}
                            layout='responsive'
                            />
                        </div>
                        {/* <Image className='filter-vibrant-red' src="/intro/maple-leaf.svg" width={48} height={48}/> */}
                    </h1>
                </div>
                <div className='col-span-1'>
                    <div className='absolute inset-y-0 right-0'>
                        <img 
                        className={classNames(
                            'relative max-h-full max-w-none grayscale opacity-90'
                        )}
                        src='/intro/me-cropped.jpg'
                        />
                        {/* <Image
                        className={classNames(
                            'relative inset-y-0 right-0 grayscale opacity-90',
                            'max-h-full max-w-none min-w-0 min-h-0'
                        )}
                        src={MeJPG}
                        width={2400}
                        height={3000}
                        // layout='responsive'
                        layout='fill'
                        objectFit='fill'
                        objectPosition='right'
                        placeholder='blur'
                        /> */}
                        <div className='absolute inset-0 bg-gradient-to-r from-black to-transparent'></div>
                    </div>
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
                    <p className='mt-4 mb-6 text-lg'>
                        It's been nearly 10 years since devoting myself to studying programming.
                        I've collaborated with very talented people to build Full-Stack MERN Applications and Python/NodeJS Microservices for internal and external use.
                        I'm familiar with utilizing the DevOps lifecycle to continuously deploy reliable code with traceable monitoring.
                        I'm quietly confident, always seeking a challenge, and constantly working to improve and grow my skills and knowledge.
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
                    {portfolioData.projects.map(({ title, description, banner }, i) => {
                        return(
                            <div 
                            key={`portfolio-${i}`}
                            className={classNames(
                                'relative grid grid-cols-1 grid-rows-2',
                                'w-72 h-80 sm:w-72 sm:h-72 rounded-xl bg-neutral-900',
                                'transition-transform duration-300 ease-in-out hover:scale-110',
                                'hover:cursor-pointer',
                            )}>
                                <Image
                                className='absolute rounded-t-xl top-0 left-0 opacity-75'
                                src={banner}
                                />
                                <div
                                    className={classNames(
                                        'absolute inset-0 bg-black opacity-50 rounded-xl pointer-events-none',
                                    )}                               
                                ></div>
                                <div
                                    className={classNames(
                                        'absolute inset-0 bg-gradient-to-b from-vibrant-red opacity-0 rounded-xl',
                                        'transition-all',
                                        'hover:bg-gradient-to-b hover:from-vibrant-red hover:via-vibrant-red hover:to-transparent hover:opacity-80'
                                    )}                               
                                ></div>
                                <span className='relative row-start-2 rounded-xl flex-1 inline-block text-center pointer-events-none'>
                                    <p className='my-3'>Development</p>
                                    <h4 className='my-3'>{title}</h4>
                                </span>
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
    const contactRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function _handleScroll() {
        handleScroll(contactRef);
    }

    function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
        const [
            name,
            email,
            subject,
            message
        ] = [
            nameRef.current?.value,
            emailRef.current?.value,
            subjectRef.current?.value,
            textAreaRef.current?.value,
        ]

    }

    useEffect(() => {
        window.addEventListener('scroll', _handleScroll);
        return () => window.removeEventListener('scroll', _handleScroll);
    })

    return(
        <Section ref={contactRef} id={id}>
            <div className='container px-9 w-full sm:w-1/2 md:flex md:flex-col'>
                <h1>Contact Me</h1>
                <ContactInput ref={nameRef} name='name' type='text' placeholder='Your Name *'/>
                <ContactInput ref={emailRef} name='email' type='email' placeholder='Your Email *'/>
                <ContactInput ref={subjectRef} name='subject' type='text' placeholder='Your Subject *'/>
                <ContactTextArea ref={textAreaRef} name='message' placeholder='Your Message *'/>
                <button
                className={classNames(
                    'text-white text-lg',
                    'bg-vibrant-red self-baseline mt-2 py-2 px-8 rounded-md border-vibrant-red border-2',
                    'transition-all duration-300 ease-in-out hover:bg-transparent hover:-translate-y-1'
                )}
                onSubmit={handleSubmit}
                >SUBMIT</button>
            </div>
        </Section>
    )
}

interface ContactInput {
    name: string,
    type?: React.HTMLInputTypeAttribute,
    placeholder: string
}

const ContactInput = forwardRef<HTMLInputElement, ContactInput>(({ type, placeholder, name }, ref) => {
    const [text, setText] = useState('')

    function handleChange( e: React.ChangeEvent<HTMLInputElement> ) {
        setText(e.target?.value);
    }

    return(
        <input 
        ref={ref}
        className={classNames(
            'w-full sm:w-auto rounded-md border-2 border-neutral-600 bg-transparent p-2 my-2 text-white outline-none',
            'transition-all focus:border-neutral-500 focus:scale-105'
        )}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        value={text}
        />
    )
})


const ContactTextArea = forwardRef<HTMLTextAreaElement, ContactInput>(({ placeholder, name }, ref) => {
    const [text, setText] = useState('')

    function handleChange( e: React.ChangeEvent<HTMLTextAreaElement> ) {
        setText(e.target?.value);
    }

    return(
        <textarea
        ref={ref}
        className={classNames(
            'w-full sm:w-auto rounded-md border-2 h-32 border-neutral-600 bg-transparent p-2 my-2 text-white outline-none',
            'transition-all focus:border-neutral-500 focus:scale-105'
        )}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={text}
        />
    )
})

export default Home

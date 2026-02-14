import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, ChevronRight, FileText, Code } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Magnetic from './Magnetic';

// Typewriter hook remains the same
const useTypewriter = (words, speed = 100, delay = 2000) => {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;
        const currentWord = words[index];

        if (isDeleting) {
            timeout = setTimeout(() => {
                setDisplayText(currentWord.substring(0, displayText.length - 1));
            }, speed / 2);
        } else {
            timeout = setTimeout(() => {
                setDisplayText(currentWord.substring(0, displayText.length + 1));
            }, speed);
        }

        if (!isDeleting && displayText === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), delay);
        } else if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setIndex((index + 1) % words.length);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, index, words, speed, delay]);

    return displayText;
};

const CharacterReveal = ({ text, className }) => {
    const characters = text.split("");

    return (
        <span className={className}>
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: i * 0.05,
                        ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
};

const Hero = () => {
    const { personal } = portfolioData;
    const typedRole = useTypewriter(['Secure AI Systems Builder', 'DevOps Enthusiast', 'FinTech Innovator', 'SIH Finalist'], 80);

    const { scrollY } = useScroll();
    const blobY1 = useTransform(scrollY, [0, 500], [0, 150]);
    const blobY2 = useTransform(scrollY, [0, 500], [0, -100]);
    const blobY3 = useTransform(scrollY, [0, 500], [0, 50]);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
            {/* Animated Parallax Background Blobs */}
            <motion.div style={{ y: blobY1 }} className="absolute top-0 -left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />
            <motion.div style={{ y: blobY2 }} className="absolute top-20 -right-10 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />
            <motion.div style={{ y: blobY3 }} className="absolute -bottom-20 left-40 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />

            <div className="max-w-7xl mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-cyan-400 text-xs font-bold mb-8 uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            {personal.location}
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9] text-white">
                            <CharacterReveal text={personal.name.split(' ')[0]} className="block" />
                            <CharacterReveal
                                text={personal.name.split(' ').slice(1).join(' ')}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 block"
                            />
                        </h1>

                        <div className="h-12 mb-8">
                            <p className="text-2xl md:text-3xl font-mono text-slate-400 flex items-center">
                                <span className="text-cyan-500 mr-2">&gt;</span>
                                {typedRole}
                                <span className="w-1 h-8 bg-cyan-500 ml-1 animate-pulse" />
                            </p>
                        </div>

                        <p className="text-lg text-slate-400 mb-12 max-w-xl leading-relaxed">
                            {personal.summary}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Magnetic strength={0.2}>
                                <a
                                    href="#projects"
                                    className="px-8 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all flex items-center gap-2 group shadow-xl shadow-cyan-900/20"
                                >
                                    Recent Work <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Magnetic>

                            <div className="flex gap-2">
                                {personal.socials.map((social, i) => (
                                    <Magnetic key={i} strength={0.3}>
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                            title={social.name}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    </Magnetic>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                        <div className="relative p-2 rounded-[3.2rem] bg-slate-900 border border-slate-800 backdrop-blur-3xl overflow-hidden aspect-[4/5] max-w-sm ml-auto shadow-2xl shadow-cyan-500/10 transition-all duration-500 group-hover:shadow-cyan-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 animate-pulse" />
                            <img
                                src={personal.profileImage}
                                alt={personal.name}
                                className="w-full h-full object-cover rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 relative z-10"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                                    e.target.parentElement.innerHTML += '<div class="text-slate-500 text-xs font-mono">Photo Pending</div>';
                                }}
                            />

                            {/* Terminal Overlay for flair */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md font-mono text-[10px] space-y-1 z-20">
                                <div className="flex gap-2">
                                    <span className="text-cyan-500">➜</span>
                                    <span className="text-purple-400">sammed.ai</span>
                                    <span className="text-white">whoami</span>
                                </div>
                                <div className="text-slate-400 pl-4">{personal.title}</div>
                                <div className="text-emerald-500 pl-4 font-bold">Secure AI Systems</div>
                            </div>
                        </div>

                        {/* Stats Floating Cards */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Hackathons</div>
                            <div className="text-sm font-bold text-white">Top 50 SIH</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Open Source</div>
                            <div className="text-sm font-bold text-white">GSSoC '25</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Background patterns */}
            <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        </section>
    );
};

export default Hero;

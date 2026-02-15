import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Magnetic from './Magnetic';
import Logo from './Logo';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['hero', 'about', 'skills', 'analytics', 'projects', 'blog', 'timeline', 'contact'];
            const current = sections.find(section => {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return rect.top <= 200 && rect.bottom >= 200;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Analytics', href: '#analytics' },
        { name: 'Projects', href: '#projects' },
        { name: 'Insights', href: '#blog' },
        { name: 'Experience', href: '#timeline' },
        { name: 'Contact', href: '#contact' },
    ];

    const scrollTo = (href) => {
        setMobileMenuOpen(false);
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg" : "bg-transparent py-5"
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Magnetic strength={0.3}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="relative">
                            <Logo />
                            <div className="absolute -inset-1 bg-cyan-500 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity" />
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-widest uppercase">AS</span>
                            <span className="text-[7px] font-black text-cyan-500 uppercase tracking-[0.4em]">Engineer</span>
                        </div>
                    </motion.div>
                </Magnetic>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-1 items-center bg-slate-900/40 p-1.5 rounded-full border border-slate-800/50">
                    {navLinks.map((link) => (
                        <Magnetic key={link.name} strength={0.1}>
                            <button
                                onClick={() => scrollTo(link.href)}
                                className={`text-[11px] font-bold transition-all relative py-2.5 px-5 rounded-full z-20 ${activeSection === link.href.slice(1) ? "text-white" : "text-slate-400 hover:text-slate-200"
                                    }`}
                            >
                                {link.name}
                                {activeSection === link.href.slice(1) && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 to-purple-600/80 rounded-full -z-10 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                            </button>
                        </Magnetic>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-2">
                    {/* Quick Socials */}
                    <div className="flex items-center gap-1 mr-2 border-r border-slate-800 pr-4">
                        {portfolioData.personal.socials.map((social, i) => (
                            <Magnetic key={i} strength={0.2}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-slate-500 hover:text-cyan-400 transition-colors"
                                    title={social.name}
                                >
                                    <social.icon size={16} />
                                </a>
                            </Magnetic>
                        ))}
                    </div>

                    <Magnetic strength={0.3}>
                        <a
                            href={portfolioData.personal.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-white text-[10px] font-black uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                        >
                            Resume
                        </a>
                    </Magnetic>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-slate-300 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-[60px] bg-slate-950/95 backdrop-blur-xl md:hidden z-40"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8 px-6 pb-20">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollTo(link.href)}
                                    className={`text-3xl font-bold transition-colors ${activeSection === link.href.slice(1) ? "text-cyan-400" : "text-slate-300 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                </button>
                            ))}
                            <a
                                href={portfolioData.personal.resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 rounded-2xl bg-cyan-600 text-center text-white text-xl font-bold uppercase tracking-widest shadow-lg shadow-cyan-900/20"
                            >
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

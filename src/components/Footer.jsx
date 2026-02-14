import React from 'react';
import { portfolioData } from '../data/portfolioData';
import Magnetic from './Magnetic';
import Logo from './Logo';

const Footer = () => {
    const { personal } = portfolioData;

    return (
        <footer className="py-20 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="text-center md:text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <Logo />
                        <div className="flex flex-col -space-y-1">
                            <span className="text-xl font-black text-white tracking-widest uppercase">AS</span>
                            <span className="text-[7px] font-black text-cyan-500 uppercase tracking-[0.4em]">Engineer</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto md:mx-0">
                        Designing secure, scalable, and intelligent software systems for the modern era.
                    </p>
                </div>

                <div className="flex gap-4">
                    {personal.socials.map((social, i) => (
                        <Magnetic key={i} strength={0.4}>
                            <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-all shadow-lg block"
                                title={social.name}
                            >
                                <social.icon size={22} />
                            </a>
                        </Magnetic>
                    ))}
                </div>

                <div className="w-full lg:w-1/3 text-center md:text-right">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Subscribe to Newsletter</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="you@email.com"
                            className="flex-grow px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                        />
                        <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">© 2026 All Rights Reserved</p>
                    <p className="text-sm font-bold text-slate-300">Shaik Abdul Sammed</p>
                </div>
                <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <span className="cursor-default">Privacy: Data stays local</span>
                    <span className="cursor-default">Terms: Portfolio project usage</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

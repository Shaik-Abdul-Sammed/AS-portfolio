import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Palette, Check } from 'lucide-react';

const ThemeCustomizer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState('cyan');

    const themes = [
        { id: 'cyan', color: '#06b6d4', rgb: '6 182 212', glow: 'rgba(6, 182, 212, 0.4)' },
        { id: 'purple', color: '#a855f7', rgb: '168 85 247', glow: 'rgba(168, 85, 247, 0.4)' },
        { id: 'pink', color: '#ec4899', rgb: '236 72 153', glow: 'rgba(236, 72, 153, 0.4)' },
        { id: 'emerald', color: '#10b981', rgb: '16 185 129', glow: 'rgba(16, 185, 129, 0.4)' }
    ];

    useEffect(() => {
        const storedTheme = localStorage.getItem('portfolio_theme');
        if (storedTheme && themes.some((t) => t.id === storedTheme)) {
            setActiveTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        const selected = themes.find((t) => t.id === activeTheme) || themes[0];
        document.documentElement.style.setProperty('--primary', selected.color);
        document.documentElement.style.setProperty('--primary-rgb', selected.rgb);
        document.documentElement.style.setProperty('--primary-glow', selected.glow);
        localStorage.setItem('portfolio_theme', selected.id);
    }, [activeTheme, themes]);

    return (
        <div className="fixed left-8 bottom-32 z-[100] hidden lg:block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md text-slate-400 hover:text-white transition-all shadow-2xl relative group"
            >
                <Palette size={24} className={isOpen ? 'text-cyan-400' : ''} />
                {!isOpen && (
                    <div className="absolute left-full ml-4 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Theme Customizer
                    </div>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute bottom-16 left-0 p-6 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl w-64 shadow-2xl space-y-6"
                    >
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select Accent Theme</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => setActiveTheme(theme.id)}
                                    className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-2 ${activeTheme === theme.id ? 'bg-slate-900 border-white/20' : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'}`}
                                >
                                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.color }} />
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{theme.id}</span>
                                    {activeTheme === theme.id && <Check size={10} className="text-white" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeCustomizer;

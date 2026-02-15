import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Languages, Fingerprint, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Identity = () => {
    const { personal } = portfolioData;

    return (
        <section id="identity" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center gap-12"
                >
                    <div className="w-full md:w-1/3">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative p-8 rounded-[38px] bg-slate-900 border border-slate-800 glass">
                                <Fingerprint size={48} className="text-cyan-500 mb-6" />
                                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Core <span className="text-cyan-500">Identity</span></h2>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Neural Signature v1.0.4</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 grid sm:grid-cols-2 gap-6">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 glass group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Date of Birth</div>
                                    <div className="text-xl font-black text-white">{personal.dob}</div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed italic">"Born at the intersection of logic and creativity."</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 glass group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                    <Heart size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Core Hobbies</div>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {personal.hobbies.map((hobby, i) => (
                                            <span key={i} className="text-[9px] px-2 py-0.5 rounded-md bg-slate-950 text-purple-300 border border-purple-500/20">{hobby}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 glass group sm:col-span-2"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    <Languages size={20} />
                                </div>
                                <div className="flex-grow">
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Linguistic Proficiency</div>
                                    <div className="flex gap-4 mt-2">
                                        {personal.languages.map((lang, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                <span className="text-xs font-bold text-slate-300">{lang}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Sparkles size={24} className="text-slate-800" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Identity;

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Award, Star, Trophy, GraduationCap, Briefcase } from 'lucide-react';

const Timeline = () => {
    const { timeline, certifications, achievements } = portfolioData;

    return (
        <section id="timeline" className="py-32 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24">

                    {/* Timeline Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-16">
                            <div className="p-3 rounded-2xl bg-amber-600/10 text-amber-500 border border-amber-500/20">
                                <Star size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-wider">Milestones</h3>
                        </div>

                        <div className="space-y-12 relative">
                            <div className="absolute left-7 top-0 bottom-0 w-[1px] bg-slate-800" />
                            {timeline.map((item, i) => (
                                <div key={i} className="relative pl-16 group">
                                    <div className={`absolute left-[22px] top-1.5 w-3 h-3 rounded-full bg-slate-900 border-2 ${item.type === 'Experience' ? 'border-cyan-500' : 'border-amber-500'
                                        } group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]`} />
                                    <div>
                                        <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] block mb-2">{item.date}</span>
                                        <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${item.type === 'Experience' ? 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5' : 'text-amber-400 border-amber-500/20 bg-amber-500/5'
                                            }`}>
                                            {item.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certifications & Achievements Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-20">
                            {/* Achievements */}
                            <div>
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-3 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
                                        <Trophy size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-wider">Honors</h3>
                                </div>
                                <div className="space-y-6">
                                    {achievements.map((item, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition-all">
                                            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                                            <p className="text-sm text-slate-500 italic">"{item.desc}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Certifications */}
                            <div>
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-3 rounded-2xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20">
                                        <Award size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-wider">Certifications</h3>
                                </div>
                                <div className="space-y-8">
                                    {certifications.map((cat, i) => (
                                        <div key={i} className="space-y-4">
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{cat.category}</div>
                                            <div className="grid gap-3">
                                                {cat.items.map((cert, j) => (
                                                    <div key={j} className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/20 transition-all group">
                                                        <div className="flex items-center gap-4">
                                                            <Award size={16} className="text-emerald-500 group-hover:scale-125 transition-transform" />
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-semibold text-slate-300">{cert.name}</span>
                                                                <span className="text-[10px] text-slate-500 font-bold">{cert.issuer}</span>
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] font-mono text-slate-600 font-bold">{cert.date}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;

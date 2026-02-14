import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Skills = () => {
    const { skills } = portfolioData;

    return (
        <section id="skills" className="py-32 bg-slate-950 border-y border-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">Technical <span className="text-cyan-500 underline decoration-2 underline-offset-8">Arsenal</span></h2>
                    <p className="max-w-2xl mx-auto text-slate-400 leading-relaxed">
                        A comprehensive list of the technologies, tools, and paradigms I utilize to build modern, secure applications.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/20 group transition-all duration-300"
                        >
                            <h3 className="text-lg font-black text-white mb-8 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">{cat.category}</h3>
                            <div className="space-y-6">
                                {cat.items.map((skill, j) => (
                                    <div key={j} className="relative">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-semibold text-slate-300">{skill.name}</span>
                                            <span className="text-[10px] font-bold text-slate-600 uppercase">Proficiency</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5 + (j * 0.05) }}
                                                className="h-full bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

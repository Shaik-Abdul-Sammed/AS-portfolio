import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
    const { personal, education, experience } = portfolioData;

    return (
        <section id="about" className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">Personal <span className="text-cyan-500 underline decoration-2 underline-offset-8">Insight</span></h2>
                    <p className="max-w-2xl mx-auto text-slate-400 leading-relaxed">
                        A deep dive into my professional journey, academic background, and the drive behind my work in secure AI systems.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Work Experience */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 rounded-2xl bg-cyan-600/10 text-cyan-400 border border-cyan-500/20">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Experience</h3>
                        </div>

                        <div className="space-y-8 relative">
                            <div className="absolute left-7 top-0 bottom-0 w-[1px] bg-slate-800" />
                            {experience.map((exp, i) => (
                                <div key={i} className="relative pl-16 group">
                                    <div className="absolute left-[22px] top-1.5 w-3 h-3 rounded-full bg-slate-900 border-2 border-cyan-500 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                    <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300">
                                        <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-2 block">{exp.duration}</span>
                                        <h4 className="text-xl font-bold text-white mb-1">{exp.role}</h4>
                                        <p className="text-slate-400 font-semibold mb-3">{exp.company}</p>
                                        <p className="text-sm text-slate-500 leading-relaxed">{exp.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 rounded-2xl bg-purple-600/10 text-purple-400 border border-purple-500/20">
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Education</h3>
                        </div>

                        <div className="space-y-8 relative">
                            <div className="absolute left-7 top-0 bottom-0 w-[1px] bg-slate-800" />
                            {education.map((edu, i) => (
                                <div key={i} className="relative pl-16 group">
                                    <div className="absolute left-[22px] top-1.5 w-3 h-3 rounded-full bg-slate-900 border-2 border-purple-500 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                    <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-purple-500/30 transition-all duration-300">
                                        <span className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-2 block">{edu.duration}</span>
                                        <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                                        <p className="text-slate-400 font-semibold mb-3">{edu.institution}</p>
                                        {edu.cgpa && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 text-[10px] font-black text-white uppercase">
                                                CGPA: {edu.cgpa}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

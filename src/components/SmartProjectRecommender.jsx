import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Star, Clock, Brain, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const SmartProjectRecommender = () => {
    const { analytics } = portfolioData;

    const recommendations = [
        {
            title: "Kubernetes Security Scanner",
            difficulty: "Advanced",
            time: "3-4 weeks",
            impact: "+15 IQ Points",
            reason: "Bridges your 'Container Orchestration' gap.",
            tech: ["Go", "Kubernetes", "eBPF"],
            icon: Cpu
        },
        {
            title: "FinTech Transaction Anomaly Engine",
            difficulty: "Intermediate",
            time: "2 weeks",
            impact: "+10 IQ Points",
            reason: "Leverages your 'Predictive Analytics' skill gap.",
            tech: ["Python", "Kafka", "Scikit-Learn"],
            icon: Brain
        }
    ];

    return (
        <div className="py-20 bg-slate-950 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                            <Lightbulb className="text-yellow-500" /> Smart <span className="text-yellow-500">Recommender</span>
                        </h2>
                        <p className="text-slate-400 mt-4 max-w-xl">
                            Our AI has identified high-impact projects that will refine your technical profile and bridge existing skill gaps.
                        </p>
                    </motion.div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-800 px-4 py-2 rounded-full">
                        Based on Market Trends & Skill Gaps
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {recommendations.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-1 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-800 hover:border-yellow-500/50 transition-all cursor-default"
                        >
                            <div className="bg-slate-950/80 p-8 rounded-[22px] flex flex-col h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 rounded-2xl bg-yellow-500/10 text-yellow-500">
                                        <project.icon size={24} />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full mb-2">{project.impact}</span>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{project.difficulty} • {project.time}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-white mb-4 group-hover:text-yellow-500 transition-colors uppercase tracking-tight">{project.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-grow">
                                    {project.reason} This project is tailored to maximize your job eligibility score for <span className="text-slate-300 font-bold">DevOps Engineer</span> roles.
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-500 uppercase">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <button className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all group-hover:border-yellow-500/50">
                                    View Project Roadmap <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SmartProjectRecommender;

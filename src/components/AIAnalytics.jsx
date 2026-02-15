import React from 'react';
import { motion } from 'framer-motion';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import { Shield, Target, TrendingUp, Zap, Briefcase, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Magnetic from './Magnetic';
import CodingActivity from './CodingActivity';
import Achievements from './Achievements';
import CodePlayground from './CodePlayground';
import VisitorAnalytics from './VisitorAnalytics';
import GithubActivity from './GithubActivity';

const AIAnalytics = () => {
    const { analytics } = portfolioData;
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const getScoreColor = (score) => {
        if (score >= 90) return 'text-cyan-400';
        if (score >= 80) return 'text-purple-400';
        return 'text-pink-400';
    };

    const generateInsight = (score) => {
        if (score >= 90) return "Global Elite: Your technical depth and project impact align with Tier-1 engineering standards.";
        if (score >= 80) return "Industry Ready: High proficiency in core domains. Strengthening system design will push you to elite status.";
        return "Growth Phase: Strong foundation. Focus on open-source contributions to increase market visibility.";
    };

    const generateActionPlan = (score) => {
        if (score >= 90) return ["Lead Open Source Initiatives", "Architect Multi-tenant SaaS", "Publish Research on AI Security"];
        if (score >= 80) return ["Master Kubernetes Orchestration", "Optimize Database Query Latency", "Implement Advanced Auth Patterns"];
        return ["Build Real-time Data Pipelines", "Strengthen Unit Testing Coverage", "Explore Cloud-native Serverless"];
    };

    return (
        <section id="analytics" className="py-32 bg-slate-950 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start mb-16">

                    {/* Left: Strength Score & Radar */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl relative overflow-hidden h-full"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Zap size={120} className="text-cyan-500" />
                            </div>

                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                                <Target className="text-cyan-500" /> Portfolio <span className="text-cyan-500">IQ</span>
                            </h2>

                            <div className="flex flex-col md:flex-row items-center gap-12">
                                <div className="relative">
                                    <svg className="w-40 h-40 transform -rotate-90">
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-slate-800"
                                        />
                                        <motion.circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={440}
                                            initial={{ strokeDashoffset: 440 }}
                                            whileInView={{ strokeDashoffset: 440 - (440 * analytics.strengthScore) / 100 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="text-cyan-500"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black text-white">{analytics.strengthScore}</span>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Strength</span>
                                    </div>
                                </div>

                                <div className="flex-grow space-y-4">
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {generateInsight(analytics.strengthScore)}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(analytics.benchmarks).map(([key, val]) => (
                                            <div key={key} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 group/item hover:border-cyan-500/30 transition-all cursor-help relative">
                                                <div className="text-[10px] text-slate-500 uppercase font-black mb-1 group-hover/item:text-cyan-400">{key}</div>
                                                <div className="text-lg font-bold text-white">{val}%</div>
                                                {/* Basis Tooltip */}
                                                <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-slate-900 border border-slate-800 rounded-lg opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity z-50 shadow-2xl">
                                                    <div className="text-[8px] text-cyan-400 uppercase font-black mb-1">Scoring Basis</div>
                                                    <div className="text-[9px] text-slate-400 leading-tight">
                                                        {key === 'projects' && "Weighted by repository health, complexity, and user impact metrics."}
                                                        {key === 'skills' && "Calculated via neural mapping of language proficiency and concept mastery."}
                                                        {key === 'impact' && "Based on derived performance gains and real-world utility benchmarks."}
                                                        {key === 'presentation' && "Evaluates design consistency, accessibility, and professional layout."}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 border-t border-slate-800/50">
                                        <div className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                            <Shield size={10} className="text-slate-600" /> Neural Verification Engine Active
                                        </div>
                                        <p className="text-[10px] text-slate-500 leading-relaxed italic">
                                            This IQ score is a dynamic weighted composite of <span className="text-slate-400">Technical Depth (40%)</span>, <span className="text-slate-400">Project Impact (30%)</span>, and <span className="text-slate-400">Market Readiness (30%)</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Radar Chart */}
                            <div className="mt-12 w-full h-[300px] relative group/radar">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 rounded-full blur-3xl opacity-0 group-hover/radar:opacity-100 transition-opacity duration-1000" />
                                {mounted && (
                                    <ResponsiveContainer id="ai-iq-radar" width="100%" height="100%" minHeight={1}>
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analytics.radarData}>
                                            <PolarGrid stroke="#1e293b" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                                            <Radar
                                                name="Current"
                                                dataKey="A"
                                                stroke="#06b6d4"
                                                fill="#06b6d4"
                                                fillOpacity={0.3}
                                            />
                                            <Radar
                                                name="Goal"
                                                dataKey="B"
                                                stroke="#a855f7"
                                                fill="#a855f7"
                                                fillOpacity={0.1}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Job Eligibility & Recommendations */}
                    <div className="w-full lg:w-1/2 space-y-8 h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800"
                        >
                            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                <Briefcase className="text-purple-500" /> Job Eligibility <span className="text-purple-500">Matcher</span>
                            </h3>
                            <div className="space-y-6">
                                {Object.entries(analytics.marketDemandMatch).map(([role, match], i) => (
                                    <div key={role} className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-bold text-slate-300">{role}</span>
                                            <span className="font-mono text-cyan-400">{match}% Match</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${match}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className="h-full bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 rounded-3xl bg-slate-950/50 border border-slate-800 ring-1 ring-cyan-500/20"
                        >
                            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                <Zap className="text-cyan-500" /> AI-Driven <span className="text-cyan-500">Action Plan</span>
                            </h3>
                            <div className="space-y-4">
                                {generateActionPlan(analytics.strengthScore).map((action, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/20 transition-all group">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform" />
                                        <span className="text-sm font-bold text-slate-300">{action}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* Phase 2: Activity & Achievements */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <GithubActivity />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Achievements />
                    </motion.div>
                </div>

                <div className="mt-8 grid lg:grid-cols-1 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <CodePlayground />
                    </motion.div>
                </div>

                <div className="mt-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <VisitorAnalytics />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AIAnalytics;

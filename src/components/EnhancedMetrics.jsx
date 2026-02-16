import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Award, Zap, ChevronRight, Target } from 'lucide-react';
import { calculatePercentile, analyzeSkillGaps } from '../utils/analyticsEngine';
import { portfolioData } from '../data/portfolioData';

const EnhancedMetrics = () => {
    const [selectedMetric, setSelectedMetric] = useState('overall');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const { analytics } = portfolioData;
    const percentile = calculatePercentile(analytics.strengthScore, selectedMetric);
    const skillGaps = analyzeSkillGaps(portfolioData);

    const metrics = [
        { id: 'overall', label: 'Overall', score: analytics.strengthScore },
        { id: 'technical', label: 'Technical', score: analytics.benchmarks.skills },
        { id: 'projects', label: 'Projects', score: analytics.benchmarks.projects },
        { id: 'impact', label: 'Impact', score: analytics.benchmarks.impact }
    ];

    return (
        <div className="space-y-8">
            {/* Percentile Ranking */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Target className="text-cyan-400" size={24} />
                    <h3 className="text-xl font-black text-white">Industry Percentile Ranking</h3>
                </div>

                {/* Metric Selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {metrics.map(metric => (
                        <button
                            key={metric.id}
                            onClick={() => setSelectedMetric(metric.id)}
                            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                                selectedMetric === metric.id
                                    ? 'bg-cyan-500 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                        >
                            {metric.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedMetric}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-4xl font-black text-cyan-400">
                                    {percentile.percentile}th
                                </div>
                                <div className="text-sm text-slate-400 mt-1">Percentile</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-white">{percentile.rank}</div>
                                <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
                                    Global Rank
                                </div>
                            </div>
                        </div>

                        {/* Benchmark Indicators */}
                        <div className="grid grid-cols-4 gap-3 mt-6">
                            {[
                                { label: 'P25', active: percentile.comparison.aboveP25 },
                                { label: 'P50', active: percentile.comparison.aboveP50 },
                                { label: 'P75', active: percentile.comparison.aboveP75 },
                                { label: 'P90', active: percentile.comparison.aboveP90 }
                            ].map(benchmark => (
                                <div
                                    key={benchmark.label}
                                    className={`p-3 rounded-xl text-center ${
                                        benchmark.active
                                            ? 'bg-cyan-500/20 border-2 border-cyan-500'
                                            : 'bg-slate-800/50 border border-slate-700'
                                    }`}
                                >
                                    <div className={`text-xs font-bold ${
                                        benchmark.active ? 'text-cyan-400' : 'text-slate-500'
                                    }`}>
                                        {benchmark.label}
                                    </div>
                                    <div className="text-xl mt-1">
                                        {benchmark.active ? '✓' : '−'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Skill Gap Analysis */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Zap className="text-amber-400" size={24} />
                        <h3 className="text-xl font-black text-white">Priority Skill Gaps</h3>
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">
                        AI-Powered Analysis
                    </div>
                </div>

                <div className="space-y-4">
                    {skillGaps.slice(0, 3).map((gap, index) => (
                        <motion.div
                            key={gap.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-amber-500/30 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-lg font-bold text-white">{gap.name}</h4>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            gap.trend === 'rising'
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'bg-slate-700 text-slate-400'
                                        }`}>
                                            {gap.trend === 'rising' && <TrendingUp size={10} className="inline mr-1" />}
                                            {gap.trend}
                                        </span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                                            {gap.category}
                                        </span>
                                    </div>
                                    <div className="text-sm text-slate-400">
                                        Impact Score: <span className="text-cyan-400 font-bold">{gap.impactScore}</span>
                                    </div>
                                </div>
                                <div className="text-2xl font-black text-amber-400">
                                    #{index + 1}
                                </div>
                            </div>

                            {/* Learning Path */}
                            <div className="flex items-center gap-2 flex-wrap mt-4">
                                {gap.learningPath.map((step, idx) => (
                                    <React.Fragment key={step}>
                                        <div className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-slate-700 transition-colors">
                                            {step}
                                        </div>
                                        {idx < gap.learningPath.length - 1 && (
                                            <ChevronRight size={12} className="text-slate-600" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-3">
                        <Award className="text-amber-400 flex-shrink-0 mt-0.5" size={18} />
                        <div className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-amber-400 font-bold">Pro Tip:</span> Mastering these 3 skills 
                            could boost your Portfolio IQ by <span className="text-white font-bold">12-15 points</span> and 
                            significantly increase your market competitiveness in DevOps and Cloud roles.
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default EnhancedMetrics;

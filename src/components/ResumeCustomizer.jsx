import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, CheckCircle2, Sliders, Sparkles, Target, Zap } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { portfolioData } from '../data/portfolioData';

const ResumeCustomizer = () => {
    const [selectedSections, setSelectedSections] = useState(['Personal', 'Experience', 'Projects', 'Skills']);
    const [targetRole, setTargetRole] = useState('Fullstack Developer');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [matchScore, setMatchScore] = useState(85);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sectionsList = ['Personal', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications', 'Achievements'];
    const roles = ['Fullstack Developer', 'DevOps Engineer', 'Security Analyst', 'AI/ML Engineer'];

    // Mock role-based matching logic
    const roleBenchmarks = {
        'Fullstack Developer': { Frontend: 95, Backend: 85, Security: 80, DevOps: 75, Database: 90, keywords: ['React', 'Node.js', 'Express', 'JWT', 'REST API', 'PostgreSQL'] },
        'DevOps Engineer': { Frontend: 60, Backend: 85, Security: 90, DevOps: 95, Database: 80, keywords: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Prometheus', 'Linux'] },
        'Security Analyst': { Frontend: 50, Backend: 80, Security: 98, DevOps: 85, Database: 75, keywords: ['Nmap', 'Metasploit', 'SOC', 'Firewalls', 'Wireshark', 'Burp Suite'] },
        'AI/ML Engineer': { Frontend: 55, Backend: 90, Security: 75, DevOps: 70, Database: 95, keywords: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision', 'FastAPI'] },
    };

    useEffect(() => {
        // Dynamic match score calculation simulation
        const baseScore = 75 + Math.floor(Math.random() * 20);
        setMatchScore(baseScore);
    }, [targetRole, selectedSections]);

    const toggleSection = (section) => {
        setSelectedSections(prev =>
            prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
        );
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setIsGenerated(false);
        setTimeout(() => {
            setIsGenerating(false);
            setIsGenerated(true);
        }, 3000);
    };

    const radarData = Object.entries(roleBenchmarks[targetRole]).map(([subject, B]) => ({
        subject,
        A: (portfolioData.analytics.radarData.find(d => d.subject === subject)?.A || 70),
        B,
        fullMark: 100
    }));

    return (
        <section className="py-20 bg-slate-950 border-t border-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                                <Sparkles className="text-cyan-500" /> AI Resume <span className="text-cyan-500">Customizer</span>
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-10 max-w-xl text-sm">
                                Generate a tailored resume in seconds. Our AI optimizes your content for ATS compatibility and highlights relevant experience based on your target role.
                            </p>

                            <div className="space-y-10">
                                <div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Target size={12} className="text-cyan-500" /> Select Target Role
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {roles.map(role => (
                                            <button
                                                key={role}
                                                onClick={() => setTargetRole(role)}
                                                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold transition-all border ${targetRole === role
                                                    ? "bg-cyan-600/20 border-cyan-500 text-cyan-400 shadow-lg shadow-cyan-900/20"
                                                    : "bg-slate-900/50 border-slate-800 text-slate-500 hover:text-white"
                                                    }`}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Sliders size={12} className="text-cyan-500" /> Included Sections
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {sectionsList.map(section => (
                                            <button
                                                key={section}
                                                onClick={() => toggleSection(section)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-bold transition-all border ${selectedSections.includes(section)
                                                    ? "bg-slate-900 border-cyan-500/50 text-white"
                                                    : "bg-slate-950 border-slate-900 text-slate-600"
                                                    }`}
                                            >
                                                {selectedSections.includes(section) ? (
                                                    <CheckCircle2 size={16} className="text-cyan-500" />
                                                ) : (
                                                    <div className="w-4 h-4 rounded-full border border-slate-800" />
                                                )}
                                                {section}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 glass flex items-center gap-6">
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                                            <motion.circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="transparent"
                                                strokeDasharray={176}
                                                initial={{ strokeDashoffset: 176 }}
                                                animate={{ strokeDashoffset: 176 - (176 * matchScore) / 100 }}
                                                className="text-cyan-400"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-white">
                                            {matchScore}%
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white mb-1 tracking-tight flex items-center gap-2">
                                            ATS Neural Optimization <Sparkles size={14} className="text-cyan-400" />
                                        </div>
                                        <div className="text-[10px] text-slate-400 font-medium leading-tight">
                                            Current heuristic: <span className="text-cyan-400">{matchScore > 90 ? 'ELITE_MATCH' : 'HIGH_MATCH'}</span>. Optimized for <span className="text-white font-bold">{targetRole}</span> vectors.
                                        </div>
                                    </div>
                                </div>

                                {/* Keyword Diagnostic */}
                                <div className="space-y-4">
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Heuristic Alignment</div>
                                    <div className="flex flex-wrap gap-2">
                                        {roleBenchmarks[targetRole].keywords.map((kw, i) => (
                                            <div key={kw} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-[10px]">
                                                {i % 2 === 0 ? <CheckCircle2 size={10} className="text-emerald-500" /> : <Zap size={10} className="text-cyan-500" />}
                                                <span className="text-slate-300">{kw}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 space-y-4">
                                <AnimatePresence mode="wait">
                                    {!isGenerated ? (
                                        <motion.button
                                            key="generate-btn"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={handleGenerate}
                                            disabled={isGenerating}
                                            className="w-full md:w-auto px-10 py-5 rounded-2xl bg-cyan-600 text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-cyan-900/40 hover:bg-cyan-500 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden group"
                                        >
                                            <span className="relative z-10">{isGenerating ? "Neural Optimization..." : "Generate Tailored Resume"}</span>
                                            {!isGenerating && <Zap size={20} className="relative z-10 animate-pulse text-yellow-400" />}
                                            {isGenerating && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600"
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                />
                                            )}
                                        </motion.button>
                                    ) : (
                                        <motion.div
                                            key="download-btn"
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            className="flex flex-col md:flex-row gap-4"
                                        >
                                            <a
                                                href={portfolioData.personal.resumeLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-grow px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-900/40 hover:from-emerald-500 hover:to-teal-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                                            >
                                                Download {targetRole} Resume
                                                <FileDown size={20} />
                                            </a>
                                            <button
                                                onClick={() => setIsGenerated(false)}
                                                className="px-8 py-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 font-bold uppercase tracking-widest hover:text-white transition-all"
                                            >
                                                Re-optimize
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {isGenerated && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.3em] flex items-center gap-2"
                                    >
                                        <CheckCircle2 size={12} /> Optimization Engine Synchronized
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Preview Side */}
                    <div className="perspective-1000">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group h-full"
                        >
                            {/* Scanning Line */}
                            {isGenerating && (
                                <motion.div
                                    initial={{ top: '0%' }}
                                    animate={{ top: '100%' }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute left-0 right-0 h-4 bg-gradient-to-b from-cyan-500/50 to-transparent border-t border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.6)] z-20 pointer-events-none"
                                />
                            )}

                            <div className="p-1 rounded-[32px] bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-800 shadow-3xl overflow-hidden">
                                <div className="bg-slate-950 p-8 rounded-[28px] overflow-hidden">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <div className="w-12 h-1 bg-cyan-500 mb-4" />
                                            <h3 className="text-2xl font-black text-white mb-1">{portfolioData.personal.name}</h3>
                                            <p className="text-cyan-500 text-[10px] font-bold uppercase tracking-widest">{targetRole} Resume</p>
                                        </div>
                                        <Zap className="text-slate-800" size={40} />
                                    </div>

                                    <div className="space-y-6">
                                        <AnimatePresence mode="popLayout">
                                            {selectedSections.includes('Personal') && (
                                                <motion.div key="preview-summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Summary</div>
                                                    <div className="h-1.5 w-full bg-slate-900 rounded-full mb-2" />
                                                    <div className="h-1.5 w-3/4 bg-slate-900 rounded-full" />
                                                </motion.div>
                                            )}

                                            <motion.div key={`radar-${targetRole}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full bg-slate-900/30 rounded-2xl border border-slate-800/50 p-4 transition-all glass group/radar">
                                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 flex justify-between">
                                                    <span>Neural Relevance Mesh</span>
                                                    <span className="text-cyan-500/50 animate-pulse">STREAMING_ACTV</span>
                                                </div>
                                                <div className="h-48 w-full relative">
                                                    {mounted && (
                                                        <ResponsiveContainer id="resume-relevance-radar" width="100%" height="100%" minHeight={1}>
                                                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                                                <PolarGrid stroke="#1e293b" />
                                                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 8, fontWeight: 'bold' }} />
                                                                <Radar name="Match" dataKey="B" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
                                                            </RadarChart>
                                                        </ResponsiveContainer>
                                                    )}
                                                </div>
                                            </motion.div>

                                            {selectedSections.includes('Experience') && (
                                                <motion.div key="preview-impact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Technical Impact</div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="h-12 rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-col justify-end">
                                                            <div className="h-1 w-full bg-slate-800 rounded-full" />
                                                        </div>
                                                        <div className="h-12 rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-col justify-end">
                                                            <div className="h-1 w-full bg-slate-800 rounded-full" />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {selectedSections.includes('Projects') && (
                                                <motion.div key="preview-projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Key Repositories</div>
                                                    <div className="space-y-2">
                                                        <div className="h-6 w-full bg-slate-900 rounded-lg flex items-center px-3 gap-2">
                                                            <div className="w-1 h-1 rounded-full bg-cyan-500" />
                                                            <div className="h-1 w-20 bg-slate-800 rounded-full" />
                                                        </div>
                                                        <div className="h-6 w-5/6 bg-slate-900 rounded-lg flex items-center px-3 gap-2">
                                                            <div className="w-1 h-1 rounded-full bg-cyan-500" />
                                                            <div className="h-1 w-16 bg-slate-800 rounded-full" />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ResumeCustomizer;

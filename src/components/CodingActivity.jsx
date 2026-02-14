import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, GitBranch, GitCommit, Clock, Monitor, Code } from 'lucide-react';

const CodingActivity = () => {
    const [status, setStatus] = useState('Active');
    const [currentFile, setCurrentFile] = useState('portfolio-ai/src/engine/analytics.py');
    const [commits, setCommits] = useState([
        { id: '4a2f1b', message: 'feat: integrated radar chart for skill visualization', time: '2m ago' },
        { id: '9c8d3e', message: 'fix: resolved scoring algorithm weighting bias', time: '15m ago' },
        { id: 'b7e6d2', message: 'docs: updated technical architecture diagram', time: '1h ago' },
    ]);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            const files = [
                'src/components/AIAnalytics.jsx',
                'src/engine/scoring.py',
                'src/hooks/useMagnetic.js',
                'src/styles/glassmorphism.css'
            ];
            setCurrentFile(files[Math.floor(Math.random() * files.length)]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-white flex items-center gap-3">
                    <Terminal className="text-cyan-400" /> Coding <span className="text-cyan-400">Activity</span>
                </h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{status}</span>
                </div>
            </div>

            <div className="space-y-8 flex-grow">
                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <Monitor size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Currently Editing</div>
                        <div className="text-sm font-mono text-white truncate max-w-[200px]">{currentFile}</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="text-[10px] text-slate-500 uppercase font-bold px-1">Recent Commits</div>
                    {commits.map((commit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex items-start gap-4 p-4 rounded-xl hover:bg-slate-800/30 transition-colors"
                        >
                            <GitCommit size={18} className="text-slate-600 group-hover:text-cyan-500 shrink-0 mt-1" />
                            <div className="flex-grow min-w-0">
                                <div className="text-xs font-semibold text-slate-300 truncate">{commit.message}</div>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[10px] font-mono text-cyan-500/50">{commit.id}</span>
                                    <span className="text-[10px] text-slate-600 flex items-center gap-1">
                                        <Clock size={10} /> {commit.time}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-800 grid grid-cols-2 gap-4">
                <div className="text-center">
                    <div className="text-2xl font-black text-white leading-none">1,248</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold mt-1">Total Commits</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-black text-white leading-none">12</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold mt-1">Open PRs</div>
                </div>
            </div>
        </div>
    );
};

export default CodingActivity;

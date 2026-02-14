import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitBranch, Terminal } from 'lucide-react';

const GithubActivity = ({ username }) => {
    const [activity, setActivity] = useState([
        { id: 1, type: 'push', repo: 'DevOps-Fraud-Shield', time: '2h ago' },
        { id: 2, type: 'star', repo: 'kubernetes/kubernetes', time: '5h ago' },
        { id: 3, type: 'pr', repo: 'capstack', time: '1d ago' }
    ]);

    return (
        <div className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 backdrop-blur-xl h-full">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-white flex items-center gap-3">
                    <Github className="text-cyan-400" /> Live <span className="text-cyan-400">Activity</span>
                </h3>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-950 px-3 py-1 rounded-lg">Real-time Feed</div>
            </div>

            <div className="space-y-6">
                {activity.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-900 hover:border-cyan-500/20 transition-all"
                    >
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-500">
                            {item.type === 'push' && <GitBranch size={14} />}
                            {item.type === 'star' && <Star size={14} />}
                            {item.type === 'pr' && <Terminal size={14} />}
                        </div>
                        <div className="flex-grow">
                            <div className="text-sm font-bold text-slate-300">
                                {item.type === 'push' ? 'Pushed to' : item.type === 'star' ? 'Starred' : 'Opened PR in'}
                                <span className="text-white ml-1">{item.repo}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">{item.time}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default GithubActivity;

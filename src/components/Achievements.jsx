import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Zap, Shield, Rocket, Globe, Smartphone, Code } from 'lucide-react';

const Achievements = () => {
    const badges = [
        { title: "OSS Contributor", icon: Globe, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", desc: "Merged 5+ PRs in major libraries" },
        { title: "Security Specialist", icon: Shield, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20", desc: "Found 2 critical vulnerabilities" },
        { title: "Speed Demon", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20", desc: "Optimized load time by 60%" },
        { title: "100+ Commits", icon: Rocket, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", desc: "Consistent project velocity" },
    ];

    return (
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 h-full">
            <h3 className="text-xl font-black text-white mb-10 flex items-center gap-3">
                <Award className="text-purple-500" /> Achievement <span className="text-purple-500">Badges</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {badges.map((badge, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-5 rounded-2xl ${badge.bg} ${badge.border} border group hover:scale-[1.02] transition-all cursor-default relative overflow-hidden`}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <badge.icon size={48} className={badge.color} />
                        </div>

                        <div className={`p-3 rounded-xl bg-slate-950/80 border ${badge.border} inline-block mb-4`}>
                            <badge.icon size={20} className={badge.color} />
                        </div>

                        <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2">{badge.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-tight group-hover:text-slate-200 transition-colors">
                            {badge.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-10 p-5 rounded-2xl bg-slate-950 border border-dashed border-slate-800 text-center">
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Locked Achievement</div>
                <div className="text-sm font-bold text-slate-400">Collaborator Extraordinaire</div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-slate-700 w-3/4 rounded-full" />
                </div>
                <div className="text-[8px] text-slate-600 font-bold uppercase mt-2 tracking-widest">75% Complete</div>
            </div>
        </div>
    );
};

export default Achievements;

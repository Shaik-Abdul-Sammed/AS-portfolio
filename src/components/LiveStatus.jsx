import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Music, Code2 } from 'lucide-react';

const LiveStatus = () => {
    return (
        <div className="fixed bottom-32 right-8 z-[100] hidden lg:block space-y-4">
            {/* WakaTime Simulated */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md flex items-center gap-4 w-64 group cursor-pointer hover:border-cyan-500/50 transition-all shadow-2xl"
            >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                    <Code2 size={20} />
                </div>
                <div className="flex-grow">
                    <div className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">Coding Stats</div>
                    <div className="text-xs font-bold text-white">42 hrs this week</div>
                    <div className="text-[10px] text-slate-500 font-medium">Mostly React & Python</div>
                </div>
            </motion.div>
        </div>
    );
};

export default LiveStatus;

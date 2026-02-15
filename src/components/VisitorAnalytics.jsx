import React from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, MousePointer2, Clock, Globe, BarChart3, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const VisitorAnalytics = () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const data = [
        { name: 'Mon', visits: 400, recruiters: 24 },
        { name: 'Tue', visits: 300, recruiters: 13 },
        { name: 'Wed', visits: 200, recruiters: 38 },
        { name: 'Thu', visits: 278, recruiters: 29 },
        { name: 'Fri', visits: 189, recruiters: 48 },
        { name: 'Sat', visits: 239, recruiters: 18 },
        { name: 'Sun', visits: 349, recruiters: 32 },
    ];

    return (
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-white flex items-center gap-3">
                    <BarChart3 className="text-pink-500" /> Visitor <span className="text-pink-500">Analytics</span>
                </h3>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-800 px-3 py-1 rounded-lg">Last 7 Days</div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800">
                    <div className="flex items-center gap-3 mb-3 text-slate-500">
                        <Users size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Total Visits</span>
                    </div>
                    <div className="text-2xl font-black text-white">2,481</div>
                    <div className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-1">
                        <TrendingUp size={10} /> +12%
                    </div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800">
                    <div className="flex items-center gap-3 mb-3 text-slate-500">
                        <Eye size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Recruiters</span>
                    </div>
                    <div className="text-2xl font-black text-purple-400">142</div>
                    <div className="text-[10px] text-purple-500/50 font-bold mt-1 uppercase tracking-widest">Verified</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800">
                    <div className="flex items-center gap-3 mb-3 text-slate-500">
                        <Clock size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Avg. Time</span>
                    </div>
                    <div className="text-2xl font-black text-white">4:25</div>
                    <div className="text-[10px] text-slate-600 font-bold mt-1 uppercase tracking-widest">Minutes</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800">
                    <div className="flex items-center gap-3 mb-3 text-slate-500">
                        <Globe size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Top Region</span>
                    </div>
                    <div className="text-2xl font-black text-cyan-400">India</div>
                    <div className="text-[10px] text-cyan-500/50 font-bold mt-1 uppercase tracking-widest">Andhra Pradesh</div>
                </div>
            </div>

            <div className="w-full h-[250px] min-h-[250px] min-w-0 relative">
                {mounted && (
                    <ResponsiveContainer id="visitor-area-chart" width="100%" height={250} minHeight={250} minWidth={0}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorRecruiters" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)' }}
                                itemStyle={{ color: '#f1f5f9' }}
                                cursor={{ stroke: '#1e293b', strokeWidth: 1 }}
                            />
                            <Area type="monotone" dataKey="visits" stroke="#ec4899" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={3} />
                            <Area type="monotone" dataKey="recruiters" stroke="#a855f7" fillOpacity={1} fill="url(#colorRecruiters)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default VisitorAnalytics;

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, ExternalLink, Filter, Code2, Cpu, Globe, Rocket, Shield, Wallet, TrendingUp, Zap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const TiltCard = ({ children }) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [shine, setShine] = useState({ x: 50, y: 50 });

    const onMouseMove = (e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const xPct = (mouseX / bounds.width - 0.5) * 20; // 20deg max
        const yPct = (mouseY / bounds.height - 0.5) * -20;

        setRotate({ x: yPct, y: xPct });
        setShine({ x: (mouseX / bounds.width) * 100, y: (mouseY / bounds.height) * 100 });
    };

    const onMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setShine({ x: 50, y: 50 });
    };

    return (
        <motion.div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            animate={{ rotateX: rotate.x, rotateY: rotate.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative h-full"
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity z-10"
                style={{
                    background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, white, transparent)`
                }}
            />
            {children}
        </motion.div>
    );
};

const Projects = () => {
    const { projects } = portfolioData;
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...new Set(projects.map(p => p.category))];

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory, projects]);

    const getIcon = (category) => {
        switch (category) {
            case 'Security': return <Shield size={18} />;
            case 'FinTech': return <Wallet size={18} />;
            case 'AgriTech': return <Globe size={18} />;
            case 'Automation': return <Cpu size={18} />;
            default: return <Rocket size={18} />;
        }
    };

    return (
        <section id="projects" className="py-32 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">Project <span className="text-cyan-500 underline decoration-2 underline-offset-8">Chronicles</span></h2>
                    <p className="max-w-2xl mx-auto text-slate-400 leading-relaxed">
                        Exploring the intersection of AI, security, and real-world utility through code.
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-16 bg-slate-900/30 p-8 rounded-3xl border border-slate-800">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects or tech..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-600 text-white"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === cat
                                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/20"
                                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-2 gap-10"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                layout
                                key={project.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative"
                            >
                                <TiltCard>
                                    <div className="p-1 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all overflow-hidden h-full">
                                        <div className="relative p-8 rounded-[22px] bg-slate-950/90 h-full flex flex-col backdrop-blur-3xl" style={{ transform: 'translateZ(20px)' }}>
                                            <div className="flex justify-between items-start mb-8">
                                                <div className="px-4 py-1.5 rounded-full bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                                    {getIcon(project.category)}
                                                    {project.category}
                                                </div>
                                                <div className="flex gap-3">
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                                                    >
                                                        <Github size={20} />
                                                    </a>
                                                    <a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                                                    >
                                                        <ExternalLink size={20} />
                                                    </a>
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors uppercase tracking-tight" style={{ transform: 'translateZ(40px)' }}>{project.title}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow" style={{ transform: 'translateZ(30px)' }}>
                                                {project.description}
                                            </p>

                                            {/* Project Impact Metrics */}
                                            <div className="grid grid-cols-2 gap-4 mb-8" style={{ transform: 'translateZ(25px)' }}>
                                                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-3">
                                                    <TrendingUp className="text-cyan-400" size={16} />
                                                    <div>
                                                        <div className="text-[10px] text-slate-500 uppercase font-bold">Latency</div>
                                                        <div className="text-xs font-bold text-white tracking-tight leading-tight">{project.impact.perfGain}</div>
                                                    </div>
                                                </div>
                                                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-3">
                                                    <Zap className="text-purple-400" size={16} />
                                                    <div>
                                                        <div className="text-[10px] text-slate-500 uppercase font-bold">Complexity</div>
                                                        <div className="text-xs font-bold text-white tracking-tight leading-tight">Score: {project.impact.complexity}/100</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-900" style={{ transform: 'translateZ(25px)' }}>
                                                {project.tech.map(t => (
                                                    <span key={t} className="px-3 py-1 transparent text-[10px] font-bold text-cyan-500/80 border border-cyan-500/20 rounded-md uppercase">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-slate-500 font-mono italic">
                        No projects found matching your search.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;

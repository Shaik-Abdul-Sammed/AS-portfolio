import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
    const calculateReadTime = (text) => {
        const wordsPerMinute = 200;
        const words = text.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    const posts = [
        {
            title: "Securing CI/CD Pipelines with AI",
            content: "CI/CD pipelines are the backbone of modern software development, but they are increasingly becoming targets for supply chain attacks. By integrating AI-driven anomaly detection, we can monitor pipeline behavior in real-time and intercept malicious activities before they reach production. This article explores the implementation of such systems using GitHub Actions and specialized ML models.",
            date: "Feb 12, 2026",
            category: "Security",
            slug: "securing-cicd-ai"
        },
        {
            title: "Building Scalable FinTech Dashboards",
            content: "Financial data requires extreme precision and real-time responsiveness. When building dashboards for platforms like CapStack, we leverage a combination of Next.js for the frontend and FastAPI for the backend. The key is efficient data caching and WebSocket integration to ensure users see the most up-to-date risk assessments without refreshing the page.",
            date: "Jan 28, 2026",
            category: "FinTech",
            slug: "building-fintech-dashboards"
        }
    ];

    const processedPosts = posts.map(post => ({
        ...post,
        readTime: `${calculateReadTime(post.content)} min`
    }));

    return (
        <section id="blog" className="py-32 bg-slate-950 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                            <BookOpen className="text-pink-500" /> Insights & <span className="text-pink-500">Articles</span>
                        </h2>
                        <p className="text-slate-400 mt-4 max-w-xl">
                            Thoughts on the future of secure AI infrastructure and development best practices.
                        </p>
                    </motion.div>
                    <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-800 px-6 py-3 rounded-full hover:border-pink-500/50 hover:text-white transition-all">
                        View All Posts
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {processedPosts.map((post, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-1 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-800 hover:border-pink-500/50 transition-all cursor-pointer"
                        >
                            <div className="bg-slate-950/80 p-8 rounded-[22px] flex flex-col h-full">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest bg-pink-500/10 px-3 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-pink-500 transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                    {post.content}
                                </p>
                                <div className="flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                                    Read Article <ArrowRight size={14} className="text-pink-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;

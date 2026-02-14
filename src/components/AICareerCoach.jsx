import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Briefcase, GraduationCap, Code } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const AICareerCoach = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            content: "Hi! I'm your AI Career Coach. I've analyzed Shaik's portfolio and can help you with hiring him, learning about his tech stack, or getting career advice based on his journey. What's on your mind?",
            type: 'text'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input, type: 'text' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        const { personal, personalInsights } = portfolioData;

        // Simulate AI response
        setTimeout(() => {
            let botResponse = { role: 'bot', content: "I'm processing that based on Shaik's profile...", type: 'text' };

            const query = input.toLowerCase();
            if (query.includes('hire') || query.includes('contact')) {
                botResponse.content = `Shaik is currently open to DevOps and FinTech roles. ${personalInsights.motivation} You can reach him at ${personal.email} or use the contact form below!`;
            } else if (query.includes('stack') || query.includes('tech')) {
                botResponse.content = `Shaik specializes in Python, React, and DevOps Security. His favorite tools are Docker, GitHub Actions, and FastAPI. He is also exploring ${personalInsights.interests.join(', ')}.`;
            } else if (query.includes('project') || query.includes('work')) {
                botResponse.content = `I recommend checking out CAPSTACK for FinTech or DevOps-Fraud-Shield for Security. Both showcase his AI integration skills and align with his goal of ${personalInsights.careerGoals}.`;
            } else if (query.includes('advice') || query.includes('learn') || query.includes('philosophy')) {
                botResponse.content = `${personalInsights.philosophy} He suggests focusing on automating security early in the dev cycle. It's a high-demand skill in the market!`;
            } else if (query.includes('where') || query.includes('from') || query.includes('location')) {
                botResponse.content = `Shaik is originally from ${personalInsights.origin}. He's currently pursuing his B.Tech at RGUKT Idupulapaya.`;
            } else {
                botResponse.content = `That's an interesting question about Shaik! His experience in SIH and his focus on secure AI systems make him a versatile candidate. ${personalInsights.motivation}`;
            }

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-10 right-10 z-[100] p-5 rounded-full bg-gradient-to-br from-cyan-600 to-purple-600 text-white shadow-2xl shadow-cyan-500/40 border border-white/20"
            >
                <Bot size={28} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-28 right-6 md:right-10 z-[100] w-[calc(100vw-3rem)] md:w-96 h-[500px] bg-slate-950 border border-slate-800 rounded-3xl shadow-3xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                                    <Sparkles size={18} />
                                </div>
                                <div>
                                    <div className="text-sm font-black text-white">AI Career Coach</div>
                                    <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online</div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${msg.role === 'user'
                                        ? 'bg-cyan-600 text-white rounded-tr-none shadow-lg shadow-cyan-900/20'
                                        : 'bg-slate-900 text-slate-300 rounded-tl-none border border-slate-800'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-900 p-4 rounded-2xl rounded-tl-none border border-slate-800 flex gap-1">
                                        <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" />
                                        <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-slate-900 border-t border-slate-800">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about Shaik's career..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-5 pr-12 py-4 text-xs text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-600"
                                />
                                <button
                                    onClick={handleSend}
                                    aria-label="Send message"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-50 hover:text-cyan-600 transition-all"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                                {['Experience', 'Hire Shaik', 'Career Advice'].map(pill => (
                                    <button
                                        key={pill}
                                        onClick={() => { setInput(pill); handleSend(); }}
                                        className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                                    >
                                        {pill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AICareerCoach;

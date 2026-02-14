import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Copy, Check, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import toast, { Toaster } from 'react-hot-toast';
import Magnetic from './Magnetic';

const Contact = () => {
    const { personal } = portfolioData;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = "Invalid email";
        if (formData.message.length < 10) newErrors.message = "Message too short";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(r => setTimeout(r, 1500));
            toast.success('Message sent! I will get back to you soon.', {
                style: {
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid #1e293b'
                }
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            toast.error('Failed to send message.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-32 bg-slate-950 relative overflow-hidden">
            <Toaster position="bottom-right" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">Get In <span className="text-cyan-500 underline decoration-2 underline-offset-8">Touch</span></h2>
                    <p className="max-w-2xl mx-auto text-slate-400 leading-relaxed">
                        Ready to secure the future of AI and DevOps. Drop a message to discuss collaborations or opportunities.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-10">
                            <div className="flex gap-6 items-center p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all group">
                                <div className="flex items-center gap-4 group/item">
                                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 group-hover/item:bg-cyan-500 group-hover/item:text-white transition-all">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase font-black">Email Me</div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-slate-300 font-bold">{personal.email}</div>
                                            <button
                                                onClick={() => copyToClipboard(personal.email)}
                                                className="p-1 rounded-md hover:bg-slate-800 text-slate-500 hover:text-cyan-400 transition-all"
                                            >
                                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-6 items-center p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all group">
                                <div className="p-4 rounded-2xl bg-purple-600/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Phone</h4>
                                    <p className="text-lg font-bold text-white tracking-tight">{personal.phone}</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-center p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all group">
                                <div className="p-4 rounded-2xl bg-pink-600/10 text-pink-400 border border-pink-500/20 group-hover:scale-110 transition-transform">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Location</h4>
                                    <p className="text-lg font-bold text-white tracking-tight">{personal.location}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="p-10 rounded-3xl bg-slate-900/30 border border-slate-800 space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full px-6 py-4 bg-slate-950 border ${errors.name ? 'border-red-500/50' : 'border-slate-800'} rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white`}
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full px-6 py-4 bg-slate-950 border ${errors.email ? 'border-red-500/50' : 'border-slate-800'} rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white`}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Message</label>
                            <textarea
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className={`w-full px-6 py-4 bg-slate-950 border ${errors.message ? 'border-red-500/50' : 'border-slate-800'} rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white resize-none`}
                                placeholder="How can I help you?"
                            />
                            {errors.message && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.message}</p>}
                        </div>

                        <Magnetic strength={0.2}>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-cyan-900/20"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </Magnetic>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

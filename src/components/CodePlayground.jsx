import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Play, RotateCcw, Copy, ExternalLink, ChevronRight } from 'lucide-react';

const CodePlayground = () => {
    const [activeTab, setActiveTab] = useState('javascript');
    const [isCoping, setIsCoping] = useState(false);

    const snippets = {
        javascript: {
            title: "Secure Auth Logic",
            code: `const authenticate = async (pin, email) => {
  const hash = await crypto.subtle.digest('SHA-256', pin);
  return api.post('/auth/login', { 
    email, 
    hash: hex(hash) 
  });
};`,
            output: "> auth_service: authenticated\n> Status: 200 OK\n> Session: active"
        },
        python: {
            title: "AI Anomaly Detector",
            code: `import tensorflow as tf

def detect_anomaly(data):
    model = tf.keras.models.load_model('detector.h5')
    prediction = model.predict(data)
    return prediction > 0.85`,
            output: "> loading model...\n> analyzing stream...\n> Result: No anomalies detected"
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(snippets[activeTab].code);
        setIsCoping(true);
        setTimeout(() => setIsCoping(false), 2000);
    };

    return (
        <div className="p-1 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-800 overflow-hidden">
            <div className="bg-slate-950 p-6 rounded-[22px]">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2">
                        {Object.keys(snippets).map(lang => (
                            <button
                                key={lang}
                                onClick={() => setActiveTab(lang)}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === lang ? "bg-cyan-500 text-white" : "bg-slate-900 text-slate-500 hover:text-white"
                                    }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={copyCode} className="p-2 rounded-lg bg-slate-900 text-slate-500 hover:text-white transition-all">
                            <Copy size={16} />
                        </button>
                        <button className="p-2 rounded-lg bg-slate-900 text-slate-500 hover:text-white transition-all">
                            <RotateCcw size={16} />
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2">
                            <Code size={14} className="text-cyan-500" /> {snippets[activeTab].title}
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed text-blue-300 overflow-x-auto min-h-[200px]">
                            <pre><code>{snippets[activeTab].code}</code></pre>
                        </div>
                        <button className="w-full py-3 rounded-xl bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-cyan-500/20 transition-all">
                            <Play size={14} /> Execute Logic
                        </button>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="text-xs font-bold text-slate-500 mb-4 px-2 tracking-widest uppercase">Output Console</div>
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 h-[calc(100%-2rem)] font-mono text-[10px] text-emerald-400">
                            <div className="space-y-2 opacity-80">
                                {snippets[activeTab].output.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                                <div className="animate-pulse">_</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodePlayground;

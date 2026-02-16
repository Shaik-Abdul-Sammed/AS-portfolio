import React, { Suspense, lazy } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import LiveStatus from './components/LiveStatus';
import ThemeCustomizer from './components/ThemeCustomizer';
import CustomCursor from './components/CustomCursor';

// Lazy load components for performance
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Identity = lazy(() => import('./components/Identity'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const AIAnalytics = lazy(() => import('./components/AIAnalytics'));
const AICareerCoach = lazy(() => import('./components/AICareerCoach'));
const ResumeCustomizer = lazy(() => import('./components/ResumeCustomizer'));
const Blog = lazy(() => import('./components/Blog'));
const Timeline = lazy(() => import('./components/Timeline'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const CursorGlow = lazy(() => import('./components/CursorGlow'));

const LoadingFallback = () => (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center gap-4">
            <motion.div
                className="absolute -inset-24 rounded-full bg-cyan-500/10 blur-3xl"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="h-24 w-24 rounded-full border border-cyan-500/40 border-t-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className="absolute h-14 w-14 rounded-full border border-indigo-500/40 border-b-indigo-300"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-cyan-200 font-mono text-lg tracking-[0.35em]"
            >
                AS-PORTFOLIO
                <div className="mt-2 text-xs tracking-[0.2em] text-cyan-400/80">
                    LOADING EXPERIENCE
                </div>
                <div className="mt-3 flex items-center justify-center gap-1">
                    {[0, 1, 2].map((index) => (
                        <motion.span
                            key={index}
                            className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: index * 0.15 }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    </div>
);

export default function App() {
    return (
        <div className="min-h-screen bg-slate-950 selection:bg-cyan-500/30">
            <ScrollProgress />
            <ScrollToTop />
            <LiveStatus />
            <ThemeCustomizer />
            <CustomCursor />

            <Suspense fallback={<LoadingFallback />}>
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Identity />
                    <Skills />
                    <AIAnalytics />
                    <ResumeCustomizer />
                    <Projects />
                    <Blog />
                    <Timeline />
                    <Contact />
                </main>
                <Footer />
                <ScrollToTop />
                <CursorGlow />
                <AICareerCoach />
            </Suspense>
        </div>
    );
}

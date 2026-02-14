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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cyan-500 font-mono text-xl animate-pulse"
        >
            SAMMED.AI_LOADING...
        </motion.div>
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

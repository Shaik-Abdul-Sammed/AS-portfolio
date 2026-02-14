import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorGlow = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mousePosition.x, springConfig);
    const cursorY = useSpring(mousePosition.y, springConfig);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Soft outer glow */}
            <motion.div
                style={{
                    left: cursorX,
                    top: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className={`absolute w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px] transition-opacity duration-300 ${isHovering ? 'opacity-40' : 'opacity-20'
                    }`}
            />

            {/* Core cursor dot */}
            <motion.div
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className={`absolute w-3 h-3 rounded-full bg-cyan-400 border border-white/20 transition-transform duration-300 ${isHovering ? 'scale-[3]' : 'scale-100'
                    } mix-blend-difference`}
            />
        </div>
    );
};

export default CursorGlow;

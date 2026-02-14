import React from 'react';

const Logo = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#logo-gradient)" fillOpacity="0.1" stroke="url(#logo-gradient)" strokeWidth="2" />
        <path d="M35 30H65V45H35V30Z" fill="url(#logo-gradient)" filter="url(#glow)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M35 55H65V70H35V55Z" fill="url(#logo-gradient)" filter="url(#glow)">
            <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
        </path>
        <circle cx="50" cy="50" r="5" fill="white" />
    </svg>
);

export default Logo;

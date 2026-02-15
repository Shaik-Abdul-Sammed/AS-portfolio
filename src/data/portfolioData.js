import { Github, Linkedin, MessageSquare, Code2, Shield, Wallet, Stethoscope, Terminal, Award, Globe, Briefcase, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export const portfolioData = {
    personal: {
        name: "Shaik Abdul Sammed",
        title: "Aspiring AI & Security Engineer",
        email: "samm41236@gmail.com",
        phone: "+91 9010150809",
        location: "Permanent: Dhone, Nandyal Dist | Present: Rajiv Gandhi University of Knowledge Technologies, RK Valley",
        summary: "E2 CSE Student at RGUKT RKV exploring DevOps Security and FinTech. Passionate about automating secure pipelines and building intelligent infrastructure.",
        profileImage: "/assets/PASSPHOTO.jpg",
        socials: [
            { name: 'GitHub', icon: Github, href: 'https://github.com/Abdul9010150809' },
            { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/' },
            { name: 'LeetCode', icon: Code2, href: 'https://leetcode.com/' },
            { name: 'HackerRank', icon: Terminal, href: 'https://hackerrank.com/' }
        ],
        resumeLink: "https://drive.google.com/uc?export=view&id=10hG37eS_C_D_mV7dFEP3Y-nTe5UZTCvN",
        dob: "22/09/2006",
        hobbies: ["Cyber-research", "Open Source Contributing", "Tech Blogging", "Competitive Coding"],
        languages: ["English", "Telugu", "Hindi"]
    },
    education: [
        {
            institution: "RGUKT RKV, Idupulapaya, Vempalli, YSR Kadapa, AP",
            degree: "B.Tech CSE (E2)",
            duration: "2024 – Present",
            status: "Pursuing"
        },
        {
            institution: "RGUKT Idupulapaya",
            degree: "MBiPC PUC",
            duration: "Nov 2022 – May 2024",
            cgpa: "8.91"
        }
    ],
    experience: [
        {
            company: "SkillCraft Technology",
            role: "Web Development Intern",
            duration: "May 2025 – Jun 2025",
            desc: "Developed responsive web interfaces and optimized frontend performance."
        },
        {
            company: "NayePankh Foundation",
            role: "Crowdfunding Intern",
            duration: "Aug 2025 – Sep 2025",
            desc: "Managed digital fundraising campaigns and community engagement."
        }
    ],
    skills: [
        {
            category: "Languages", items: [
                { name: "C", level: 85 }, { name: "Java", level: 80 }, { name: "PHP", level: 75 },
                { name: "JavaScript", level: 90 }, { name: "SQL", level: 85 }, { name: "Python", level: 88 }
            ]
        },
        {
            category: "Frameworks & Libs", items: [
                { name: "React", level: 92 }, { name: "Next.js", level: 85 }, { name: "Node.js", level: 80 },
                { name: "FastAPI", level: 78 }, { name: "TailwindCSS", level: 95 }
            ]
        },
        {
            category: "Tools & Infrastructure", items: [
                { name: "Git", level: 90 }, { name: "GitHub", level: 95 }, { name: "Linux", level: 82 },
                { name: "Docker", level: 75 }, { name: "MySQL", level: 80 }
            ]
        },
        {
            category: "Concepts", items: [
                { name: "SDLC", level: 85 }, { name: "Cloud Basics", level: 70 },
                { name: "DevOps Security", level: 82 }, { name: "AI/ML", level: 75 }
            ]
        }
    ],
    projects: [
        {
            title: "CAPSTACK",
            description: "Smart financial safety net and dashboard with real-time risk assessment.",
            tech: ["Next.js", "FastAPI", "PostgreSQL", "Scikit-learn"],
            github: "https://github.com/Abdul9010150809/capstack",
            live: "#",
            category: "FinTech",
            impact: {
                stars: 12,
                perfGain: "45% reduction in latency",
                users: "Internal Audit Tool",
                complexity: 88
            }
        },
        {
            title: "DevOps-Fraud-Shield",
            description: "AI-driven anomaly detection for CI/CD pipelines to prevent supply chain attacks.",
            tech: ["Python", "GitHub Actions", "Docker", "AI/ML"],
            github: "https://github.com/Abdul9010150809/DevOps-Fraud-Shield",
            live: "#",
            category: "Security",
            impact: {
                stars: 25,
                perfGain: "98.5% anomaly detection accuracy",
                users: "Open Source Tool",
                complexity: 92
            }
        },
        {
            title: "Stone Paper Scissors",
            description: "A classic interactive game built with modern JavaScript and smooth CSS animations.",
            tech: ["JavaScript", "HTML5", "CSS3"],
            github: "https://github.com/Abdul9010150809/stone-paper-scissors",
            live: "https://abdul9010150809.github.io/stone-paper-scissors/",
            category: "Mini Projects",
            impact: {
                stars: 2,
                perfGain: "Instant interaction",
                users: "Game Project",
                complexity: 40
            }
        },
        {
            title: "Vedascan-AI",
            description: "Medical AI diagnostic system for analyzing health records and predicting risks.",
            tech: ["React", "FastAPI", "TensorFlow", "PostgreSQL"],
            github: "https://github.com/Abdul9010150809/Vedascan-AI",
            live: "#",
            category: "Medical AI",
            impact: {
                stars: 18,
                perfGain: "92% prediction accuracy",
                users: "Researchers",
                complexity: 94
            }
        },
        {
            title: "cropyield-pro",
            description: "Agri-tech platform for predicting crop yields using satellite data and AI.",
            tech: ["Python", "Flask", "Azure ML", "Leaflet"],
            github: "https://github.com/Abdul9010150809/cropyield-pro",
            live: "#",
            category: "Agri-Tech",
            impact: {
                stars: 15,
                perfGain: "30% yield optimization",
                users: "Local Farmers Pilot",
                complexity: 89
            }
        },
        {
            title: "GitFolioScore",
            description: "DevOps tool to calculate repository health and contributor impact metrics.",
            tech: ["Node.js", "GitHub API", "Redis", "Chart.js"],
            github: "https://github.com/Abdul9010150809/GitFolioScore",
            live: "#",
            category: "DevOps",
            impact: {
                stars: 22,
                perfGain: "Real-time health auditing",
                users: "Maintainers",
                complexity: 85
            }
        }
    ],
    analytics: {
        strengthScore: 88,
        marketDemandMatch: {
            "Fullstack Developer": 92,
            "DevOps Engineer": 85,
            "AI Engineer": 78,
            "Security Analyst": 82
        },
        radarData: [
            { subject: 'Frontend', A: 95, B: 100, fullMark: 100 },
            { subject: 'Backend', A: 85, B: 95, fullMark: 100 },
            { subject: 'Security', A: 90, B: 100, fullMark: 100 },
            { subject: 'DevOps', A: 82, B: 95, fullMark: 100 },
            { subject: 'AI/ML', A: 75, B: 90, fullMark: 100 },
            { subject: 'Database', A: 88, B: 95, fullMark: 100 },
        ],
        skillGaps: ["Cloud Optimization", "Container Orchestration", "Predictive Analytics"],
        benchmarks: {
            projects: 90,
            skills: 85,
            impact: 82,
            presentation: 95
        }
    },
    certifications: [
        {
            category: "Professional Development",
            items: [
                { name: "Microsoft Learn Git & GitHub", issuer: "Microsoft", date: "2024" },
                { name: "Datanyx Hackathon Participation", issuer: "Datanyx", date: "2025" }
            ]
        },
        {
            category: "Technical Skills",
            items: [
                { name: "Udemy CSS/JS/PHP Mastery", issuer: "Udemy", date: "2024" },
                { name: "FreeCodeCamp Responsive Web Design", issuer: "freeCodeCamp", date: "2024" }
            ]
        }
    ],
    achievements: [
        { title: "GSSoC 2025 Exceptional Contributor", desc: "Recognized as an Exceptional Contributor for GirlScript Summer of Code 2025, contributing to critical open-source security modules." },
        { title: "SIH 2025 Top 50 Finalist", desc: "Secured Top 50 among 200+ teams in the Internal Smart India Hackathon 2025 at RGUKT RKV." },
        { title: "NayePankh Recognition", desc: "Awarded for exceptional digital fundraising and community mobilization during the 2025 internship." }
    ],
    personalInsights: {
        origin: "Dhone, Andhra Pradesh",
        motivation: "Passionate about bridging the gap between secure infrastructure and intelligent AI systems, specifically for the FinTech sector.",
        philosophy: "I believe that security should be proactive, not reactive. This drives my interest in AI-driven anomaly detection for DevOps.",
        careerGoals: "Aiming to build a career as a DevOps Architect specializing in Secure AI infrastructure.",
        interests: ["Cybersecurity", "Blockchain", "Open Source (GSSoC)", "Agricultural Technology"]
    },
    timeline: [
        { date: '2025', title: 'NayePankh Intern', type: 'Experience' },
        { date: '2025', title: 'SkillCraft Intern', type: 'Experience' },
        { date: '2025', title: 'GSSoC Contributor', type: 'Achievement' },
        { date: '2025', title: 'SIH Finalist', type: 'Achievement' },
    ]
};

/**
 * Advanced Portfolio Analytics Engine
 * Provides sophisticated scoring, trend analysis, and recommendations
 */

/**
 * Calculate percentile ranking against industry benchmarks
 * @param {number} score - Current score (0-100)
 * @param {string} metric - Type of metric being evaluated
 * @returns {Object} Percentile ranking and comparison data
 */
export const calculatePercentile = (score, metric = 'overall') => {
    // Industry benchmark data (simplified)
    const benchmarks = {
        overall: { p25: 65, p50: 75, p75: 85, p90: 92 },
        technical: { p25: 70, p50: 80, p75: 88, p90: 95 },
        projects: { p25: 60, p50: 72, p75: 84, p90: 90 },
        impact: { p25: 55, p50: 68, p75: 80, p90: 88 }
    };

    const benchmark = benchmarks[metric] || benchmarks.overall;
    
    let percentile;
    if (score >= benchmark.p90) percentile = 90 + ((score - benchmark.p90) / (100 - benchmark.p90)) * 10;
    else if (score >= benchmark.p75) percentile = 75 + ((score - benchmark.p75) / (benchmark.p90 - benchmark.p75)) * 15;
    else if (score >= benchmark.p50) percentile = 50 + ((score - benchmark.p50) / (benchmark.p75 - benchmark.p50)) * 25;
    else if (score >= benchmark.p25) percentile = 25 + ((score - benchmark.p25) / (benchmark.p50 - benchmark.p25)) * 25;
    else percentile = (score / benchmark.p25) * 25;

    return {
        percentile: Math.round(percentile),
        rank: percentile >= 90 ? 'Top 10%' : 
              percentile >= 75 ? 'Top 25%' : 
              percentile >= 50 ? 'Top 50%' : 'Developing',
        comparison: {
            aboveP25: score > benchmark.p25,
            aboveP50: score > benchmark.p50,
            aboveP75: score > benchmark.p75,
            aboveP90: score > benchmark.p90
        }
    };
};

/**
 * Calculate weighted portfolio IQ based on multiple factors
 * @param {Object} data - Portfolio data including projects, skills, etc.
 * @returns {number} Calculated IQ score (0-100)
 */
export const calculatePortfolioIQ = (data) => {
    const weights = {
        technicalDepth: 0.40,
        projectImpact: 0.30,
        marketReadiness: 0.30
    };

    // Technical Depth (based on skills diversity and proficiency)
    const technicalDepth = calculateTechnicalDepth(data.skills);
    
    // Project Impact (based on complexity, stars, and real-world usage)
    const projectImpact = calculateProjectImpact(data.projects);
    
    // Market Readiness (based on certifications, experience, and trends)
    const marketReadiness = calculateMarketReadiness(data);

    const iq = (
        technicalDepth * weights.technicalDepth +
        projectImpact * weights.projectImpact +
        marketReadiness * weights.marketReadiness
    );

    return Math.round(iq);
};

/**
 * Calculate technical depth score from skills data
 */
const calculateTechnicalDepth = (skills) => {
    if (!skills || skills.length === 0) return 0;

    let totalScore = 0;
    let count = 0;

    skills.forEach(category => {
        category.items.forEach(skill => {
            totalScore += skill.level;
            count++;
        });
    });

    const avgSkillLevel = totalScore / count;
    const diversityBonus = Math.min(skills.length * 2, 10); // Max 10 bonus for diversity
    
    return Math.min(avgSkillLevel + diversityBonus, 100);
};

/**
 * Calculate project impact score
 */
const calculateProjectImpact = (projects) => {
    if (!projects || projects.length === 0) return 0;

    let totalImpact = 0;
    
    projects.forEach(project => {
        const complexityScore = (project.impact?.complexity || 50) * 0.5;
        const starsScore = Math.min((project.impact?.stars || 0) * 2, 25);
        const categoryBonus = getCategoryBonus(project.category);
        
        totalImpact += complexityScore + starsScore + categoryBonus;
    });

    return Math.min((totalImpact / projects.length), 100);
};

/**
 * Get bonus points based on project category relevance
 */
const getCategoryBonus = (category) => {
    const bonuses = {
        'Security': 15,
        'FinTech': 12,
        'AI/ML': 12,
        'DevOps': 10,
        'Medical AI': 14,
        'Agri-Tech': 10
    };
    return bonuses[category] || 5;
};

/**
 * Calculate market readiness score
 */
const calculateMarketReadiness = (data) => {
    let score = 60; // Base score

    // Certifications bonus
    if (data.certifications && data.certifications.length > 0) {
        const certCount = data.certifications.reduce((acc, cat) => acc + cat.items.length, 0);
        score += Math.min(certCount * 3, 15);
    }

    // Experience bonus
    if (data.experience && data.experience.length > 0) {
        score += data.experience.length * 5;
    }

    // Achievements bonus
    if (data.achievements && data.achievements.length > 0) {
        score += Math.min(data.achievements.length * 4, 15);
    }

    return Math.min(score, 100);
};

/**
 * Generate skill gap analysis with prioritized recommendations
 * @param {Object} data - Portfolio data
 * @returns {Array} Prioritized skill gaps with learning paths
 */
export const analyzeSkillGaps = (data) => {
    const currentSkills = new Set();
    
    if (data.skills) {
        data.skills.forEach(category => {
            category.items.forEach(skill => {
                currentSkills.add(skill.name.toLowerCase());
            });
        });
    }

    // Industry-demand skills with priority weights
    const demandSkills = [
        { name: 'Kubernetes', priority: 10, category: 'DevOps', trend: 'rising' },
        { name: 'AWS', priority: 9, category: 'Cloud', trend: 'stable' },
        { name: 'Terraform', priority: 8, category: 'IaC', trend: 'rising' },
        { name: 'GraphQL', priority: 7, category: 'Backend', trend: 'rising' },
        { name: 'TypeScript', priority: 9, category: 'Frontend', trend: 'stable' },
        { name: 'Redis', priority: 6, category: 'Database', trend: 'stable' },
        { name: 'gRPC', priority: 6, category: 'Backend', trend: 'rising' },
        { name: 'Prometheus', priority: 7, category: 'Monitoring', trend: 'rising' }
    ];

    const gaps = demandSkills
        .filter(skill => !currentSkills.has(skill.name.toLowerCase()))
        .map(skill => ({
            ...skill,
            impactScore: calculateSkillImpact(skill, data),
            learningPath: generateLearningPath(skill)
        }))
        .sort((a, b) => b.impactScore - a.impactScore)
        .slice(0, 5);

    return gaps;
};

/**
 * Calculate potential impact of learning a skill
 */
const calculateSkillImpact = (skill, data) => {
    let impact = skill.priority * 10;

    // Bonus for trending skills
    if (skill.trend === 'rising') impact += 15;

    // Bonus based on existing related skills
    const relatedBonus = hasRelatedSkills(skill, data) ? 20 : 0;
    
    return Math.min(impact + relatedBonus, 100);
};

/**
 * Check if user has related skills
 */
const hasRelatedSkills = (skill, data) => {
    const relations = {
        'Kubernetes': ['Docker', 'Linux'],
        'AWS': ['Cloud', 'DevOps'],
        'Terraform': ['DevOps', 'Infrastructure'],
        'GraphQL': ['API', 'Backend'],
        'TypeScript': ['JavaScript', 'Node.js']
    };

    if (!data.skills) return false;

    const userSkills = [];
    data.skills.forEach(cat => {
        cat.items.forEach(s => userSkills.push(s.name));
    });

    const related = relations[skill.name] || [];
    return related.some(r => userSkills.some(us => us.toLowerCase().includes(r.toLowerCase())));
};

/**
 * Generate learning path for a skill
 */
const generateLearningPath = (skill) => {
    const paths = {
        'Kubernetes': ['Docker Basics', 'K8s Fundamentals', 'Helm Charts', 'Production Deployment'],
        'AWS': ['IAM & Security', 'EC2 & VPC', 'S3 & CloudFront', 'Lambda & Serverless'],
        'Terraform': ['IaC Concepts', 'HCL Syntax', 'State Management', 'Modules & Workspaces'],
        'GraphQL': ['Schema Design', 'Resolvers', 'Apollo Server', 'Performance Optimization'],
        'TypeScript': ['Type System', 'Interfaces', 'Generics', 'Advanced Patterns']
    };

    return paths[skill.name] || ['Fundamentals', 'Intermediate', 'Advanced', 'Production'];
};

/**
 * Generate trend analysis for portfolio metrics
 * @param {Array} historicalData - Array of historical score data
 * @returns {Object} Trend analysis including velocity and projection
 */
export const analyzeTrends = (historicalData) => {
    if (!historicalData || historicalData.length < 2) {
        return { trend: 'insufficient_data', velocity: 0, projection: null };
    }

    const sortedData = [...historicalData].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
    );

    const recentScore = sortedData[sortedData.length - 1].score;
    const previousScore = sortedData[sortedData.length - 2].score;
    const velocity = recentScore - previousScore;

    const avgVelocity = sortedData.reduce((acc, item, idx) => {
        if (idx === 0) return 0;
        return acc + (item.score - sortedData[idx - 1].score);
    }, 0) / (sortedData.length - 1);

    return {
        trend: velocity > 0 ? 'improving' : velocity < 0 ? 'declining' : 'stable',
        velocity: Math.round(velocity * 10) / 10,
        avgVelocity: Math.round(avgVelocity * 10) / 10,
        projection: Math.min(recentScore + (avgVelocity * 3), 100), // 3-month projection
        momentum: Math.abs(avgVelocity) > 2 ? 'strong' : 'moderate'
    };
};

/**
 * Generate personalized career path recommendations
 * @param {Object} analytics - Portfolio analytics data
 * @returns {Array} Career path recommendations with fit scores
 */
export const generateCareerPaths = (analytics) => {
    const paths = [
        {
            title: 'Full Stack Engineer',
            fit: calculatePathFit(analytics, ['Frontend', 'Backend', 'Database']),
            skills: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
            timeline: '6-12 months',
            salaryRange: '$80k-$130k'
        },
        {
            title: 'DevOps Engineer',
            fit: calculatePathFit(analytics, ['DevOps', 'Backend', 'Security']),
            skills: ['Kubernetes', 'CI/CD', 'Cloud Platforms', 'Monitoring'],
            timeline: '8-14 months',
            salaryRange: '$90k-$150k'
        },
        {
            title: 'Security Engineer',
            fit: calculatePathFit(analytics, ['Security', 'Backend', 'DevOps']),
            skills: ['Penetration Testing', 'Secure Coding', 'Compliance', 'Incident Response'],
            timeline: '12-18 months',
            salaryRange: '$95k-$160k'
        },
        {
            title: 'AI/ML Engineer',
            fit: calculatePathFit(analytics, ['AI/ML', 'Backend', 'Database']),
            skills: ['TensorFlow', 'PyTorch', 'MLOps', 'Data Engineering'],
            timeline: '10-16 months',
            salaryRange: '$100k-$180k'
        }
    ];

    return paths.sort((a, b) => b.fit - a.fit);
};

/**
 * Calculate fit score for a career path
 */
const calculatePathFit = (analytics, requiredDomains) => {
    if (!analytics.radarData) return 0;

    let totalFit = 0;
    requiredDomains.forEach(domain => {
        const data = analytics.radarData.find(r => r.subject === domain);
        if (data) {
            totalFit += data.A || 0;
        }
    });

    return Math.round((totalFit / requiredDomains.length));
};

/**
 * Validate portfolio data integrity
 * @param {Object} data - Portfolio data to validate
 * @returns {Object} Validation results with errors and warnings
 */
export const validatePortfolioData = (data) => {
    const errors = [];
    const warnings = [];

    // Required fields validation
    if (!data.personal?.name) errors.push('Missing personal name');
    if (!data.personal?.email) errors.push('Missing personal email');
    if (data.personal?.email && !isValidEmail(data.personal.email)) {
        errors.push('Invalid email format');
    }

    // Analytics validation
    if (data.analytics?.strengthScore < 0 || data.analytics?.strengthScore > 100) {
        errors.push('Invalid strength score (must be 0-100)');
    }

    // Projects validation
    if (!data.projects || data.projects.length === 0) {
        warnings.push('No projects found');
    }

    // Skills validation
    if (!data.skills || data.skills.length === 0) {
        warnings.push('No skills found');
    }

    data.skills?.forEach(category => {
        category.items.forEach(skill => {
            if (skill.level < 0 || skill.level > 100) {
                errors.push(`Invalid skill level for ${skill.name}`);
            }
        });
    });

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
        score: Math.max(0, 100 - (errors.length * 10) - (warnings.length * 5))
    };
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default {
    calculatePercentile,
    calculatePortfolioIQ,
    analyzeSkillGaps,
    analyzeTrends,
    generateCareerPaths,
    validatePortfolioData
};

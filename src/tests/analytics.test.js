import { describe, it, expect } from 'vitest';

// Helper functions extracted from AIAnalytics component for testing
export const getScoreColor = (score) => {
    if (score >= 90) return 'text-cyan-400';
    if (score >= 80) return 'text-purple-400';
    return 'text-pink-400';
};

export const generateInsight = (score) => {
    if (score >= 90) return "Global Elite: Your technical depth and project impact align with Tier-1 engineering standards.";
    if (score >= 80) return "Industry Ready: High proficiency in core domains. Strengthening system design will push you to elite status.";
    return "Growth Phase: Strong foundation. Focus on open-source contributions to increase market visibility.";
};

export const generateActionPlan = (score) => {
    if (score >= 90) return ["Lead Open Source Initiatives", "Architect Multi-tenant SaaS", "Publish Research on AI Security"];
    if (score >= 80) return ["Master Kubernetes Orchestration", "Optimize Database Query Latency", "Implement Advanced Auth Patterns"];
    return ["Build Real-time Data Pipelines", "Strengthen Unit Testing Coverage", "Explore Cloud-native Serverless"];
};

describe('Portfolio Analytics Helper Functions', () => {
    describe('getScoreColor', () => {
        it('should return cyan color for scores 90 and above', () => {
            expect(getScoreColor(90)).toBe('text-cyan-400');
            expect(getScoreColor(95)).toBe('text-cyan-400');
            expect(getScoreColor(100)).toBe('text-cyan-400');
        });

        it('should return purple color for scores 80-89', () => {
            expect(getScoreColor(80)).toBe('text-purple-400');
            expect(getScoreColor(85)).toBe('text-purple-400');
            expect(getScoreColor(89)).toBe('text-purple-400');
        });

        it('should return pink color for scores below 80', () => {
            expect(getScoreColor(70)).toBe('text-pink-400');
            expect(getScoreColor(50)).toBe('text-pink-400');
            expect(getScoreColor(0)).toBe('text-pink-400');
        });
    });

    describe('generateInsight', () => {
        it('should return Global Elite insight for scores 90+', () => {
            const insight = generateInsight(90);
            expect(insight).toContain('Global Elite');
            expect(insight).toContain('Tier-1 engineering standards');
        });

        it('should return Industry Ready insight for scores 80-89', () => {
            const insight = generateInsight(85);
            expect(insight).toContain('Industry Ready');
            expect(insight).toContain('High proficiency');
        });

        it('should return Growth Phase insight for scores below 80', () => {
            const insight = generateInsight(75);
            expect(insight).toContain('Growth Phase');
            expect(insight).toContain('open-source contributions');
        });
    });

    describe('generateActionPlan', () => {
        it('should return elite level actions for scores 90+', () => {
            const plan = generateActionPlan(92);
            expect(plan).toHaveLength(3);
            expect(plan).toContain('Lead Open Source Initiatives');
            expect(plan).toContain('Architect Multi-tenant SaaS');
            expect(plan).toContain('Publish Research on AI Security');
        });

        it('should return intermediate level actions for scores 80-89', () => {
            const plan = generateActionPlan(85);
            expect(plan).toHaveLength(3);
            expect(plan).toContain('Master Kubernetes Orchestration');
            expect(plan).toContain('Optimize Database Query Latency');
            expect(plan).toContain('Implement Advanced Auth Patterns');
        });

        it('should return beginner level actions for scores below 80', () => {
            const plan = generateActionPlan(70);
            expect(plan).toHaveLength(3);
            expect(plan).toContain('Build Real-time Data Pipelines');
            expect(plan).toContain('Strengthen Unit Testing Coverage');
            expect(plan).toContain('Explore Cloud-native Serverless');
        });
    });
});

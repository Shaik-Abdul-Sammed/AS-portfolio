import { describe, it, expect } from 'vitest';
import {
    calculatePercentile,
    analyzeSkillGaps,
    analyzeTrends,
    validatePortfolioData
} from '../utils/analyticsEngine';

describe('Advanced Analytics Engine', () => {
    describe('calculatePercentile', () => {
        it('should calculate correct percentile for high scores', () => {
            const result = calculatePercentile(95, 'overall');
            expect(result.percentile).toBeGreaterThanOrEqual(90);
            expect(result.rank).toBe('Top 10%');
        });

        it('should calculate correct percentile for median scores', () => {
            const result = calculatePercentile(75, 'overall');
            expect(result.percentile).toBeGreaterThanOrEqual(40);
            expect(result.percentile).toBeLessThanOrEqual(60);
        });

        it('should identify comparison benchmarks correctly', () => {
            const result = calculatePercentile(85, 'overall');
            expect(result.comparison.aboveP50).toBe(true);
            expect(result.comparison.aboveP75).toBe(false); // 85 is exactly at p75, not above
        });

        it('should handle different metric types', () => {
            const technical = calculatePercentile(88, 'technical');
            const projects = calculatePercentile(88, 'projects');
            expect(technical.percentile).toBeDefined();
            expect(projects.percentile).toBeDefined();
        });
    });

    describe('analyzeSkillGaps', () => {
        const mockData = {
            skills: [
                {
                    category: 'Languages',
                    items: [
                        { name: 'JavaScript', level: 90 },
                        { name: 'Python', level: 88 }
                    ]
                }
            ]
        };

        it('should identify missing high-priority skills', () => {
            const gaps = analyzeSkillGaps(mockData);
            expect(Array.isArray(gaps)).toBe(true);
            expect(gaps.length).toBeGreaterThan(0);
            expect(gaps.length).toBeLessThanOrEqual(5);
        });

        it('should prioritize skills correctly', () => {
            const gaps = analyzeSkillGaps(mockData);
            // First item should have highest impact score
            for (let i = 1; i < gaps.length; i++) {
                expect(gaps[i - 1].impactScore).toBeGreaterThanOrEqual(gaps[i].impactScore);
            }
        });

        it('should provide learning paths for each gap', () => {
            const gaps = analyzeSkillGaps(mockData);
            gaps.forEach(gap => {
                expect(gap).toHaveProperty('learningPath');
                expect(Array.isArray(gap.learningPath)).toBe(true);
                expect(gap.learningPath.length).toBeGreaterThan(0);
            });
        });

        it('should include trend information', () => {
            const gaps = analyzeSkillGaps(mockData);
            gaps.forEach(gap => {
                expect(gap).toHaveProperty('trend');
                expect(['rising', 'stable', 'declining']).toContain(gap.trend);
            });
        });
    });

    describe('analyzeTrends', () => {
        it('should detect improving trend', () => {
            const data = [
                { date: '2024-01-01', score: 75 },
                { date: '2024-02-01', score: 80 },
                { date: '2024-03-01', score: 85 }
            ];
            
            const trend = analyzeTrends(data);
            expect(trend.trend).toBe('improving');
            expect(trend.velocity).toBeGreaterThan(0);
        });

        it('should detect declining trend', () => {
            const data = [
                { date: '2024-01-01', score: 85 },
                { date: '2024-02-01', score: 80 },
                { date: '2024-03-01', score: 75 }
            ];
            
            const trend = analyzeTrends(data);
            expect(trend.trend).toBe('declining');
            expect(trend.velocity).toBeLessThan(0);
        });

        it('should handle insufficient data', () => {
            const data = [{ date: '2024-01-01', score: 85 }];
            const trend = analyzeTrends(data);
            expect(trend.trend).toBe('insufficient_data');
            expect(trend.velocity).toBe(0);
        });

        it('should provide projection', () => {
            const data = [
                { date: '2024-01-01', score: 75 },
                { date: '2024-02-01', score: 80 }
            ];
            
            const trend = analyzeTrends(data);
            expect(trend.projection).toBeDefined();
            expect(trend.projection).toBeGreaterThanOrEqual(0);
            expect(trend.projection).toBeLessThanOrEqual(100);
        });

        it('should calculate momentum', () => {
            const data = [
                { date: '2024-01-01', score: 70 },
                { date: '2024-02-01', score: 75 },
                { date: '2024-03-01', score: 80 }
            ];
            
            const trend = analyzeTrends(data);
            expect(trend.momentum).toBeDefined();
            expect(['strong', 'moderate']).toContain(trend.momentum);
        });
    });

    describe('validatePortfolioData', () => {
        it('should validate correct data structure', () => {
            const validData = {
                personal: {
                    name: 'Test User',
                    email: 'test@example.com'
                },
                analytics: {
                    strengthScore: 85
                },
                projects: [{ title: 'Test Project' }],
                skills: [{ category: 'Test', items: [{ name: 'Skill', level: 80 }] }]
            };

            const result = validatePortfolioData(validData);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should detect missing required fields', () => {
            const invalidData = {
                personal: {}
            };

            const result = validatePortfolioData(invalidData);
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(0);
        });

        it('should detect invalid email format', () => {
            const invalidData = {
                personal: {
                    name: 'Test',
                    email: 'invalid-email'
                }
            };

            const result = validatePortfolioData(invalidData);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Invalid email format');
        });

        it('should detect invalid score ranges', () => {
            const invalidData = {
                personal: {
                    name: 'Test',
                    email: 'test@test.com'
                },
                analytics: {
                    strengthScore: 150 // Invalid: > 100
                }
            };

            const result = validatePortfolioData(invalidData);
            expect(result.isValid).toBe(false);
        });

        it('should generate warnings for missing optional data', () => {
            const dataWithWarnings = {
                personal: {
                    name: 'Test',
                    email: 'test@test.com'
                },
                analytics: {
                    strengthScore: 85
                }
            };

            const result = validatePortfolioData(dataWithWarnings);
            expect(result.warnings.length).toBeGreaterThan(0);
        });

        it('should provide validation score', () => {
            const validData = {
                personal: {
                    name: 'Test',
                    email: 'test@test.com'
                },
                analytics: {
                    strengthScore: 85
                },
                projects: [],
                skills: []
            };

            const result = validatePortfolioData(validData);
            expect(result.score).toBeDefined();
            expect(result.score).toBeGreaterThanOrEqual(0);
            expect(result.score).toBeLessThanOrEqual(100);
        });
    });
});

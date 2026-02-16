import { describe, it, expect } from 'vitest';
import { portfolioData } from '../data/portfolioData';

describe('Portfolio Data Validation', () => {
    describe('Analytics Data Structure', () => {
        it('should have valid strengthScore', () => {
            expect(portfolioData.analytics.strengthScore).toBeDefined();
            expect(portfolioData.analytics.strengthScore).toBeGreaterThanOrEqual(0);
            expect(portfolioData.analytics.strengthScore).toBeLessThanOrEqual(100);
        });

        it('should have marketDemandMatch with valid percentages', () => {
            const { marketDemandMatch } = portfolioData.analytics;
            expect(marketDemandMatch).toBeDefined();
            
            Object.values(marketDemandMatch).forEach(value => {
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThanOrEqual(100);
            });
        });

        it('should have radarData with proper structure', () => {
            const { radarData } = portfolioData.analytics;
            expect(radarData).toBeDefined();
            expect(Array.isArray(radarData)).toBe(true);
            
            radarData.forEach(item => {
                expect(item).toHaveProperty('subject');
                expect(item).toHaveProperty('A');
                expect(item).toHaveProperty('B');
                expect(item).toHaveProperty('fullMark');
                expect(item.fullMark).toBe(100);
            });
        });

        it('should have benchmarks with all required metrics', () => {
            const { benchmarks } = portfolioData.analytics;
            expect(benchmarks).toBeDefined();
            expect(benchmarks).toHaveProperty('projects');
            expect(benchmarks).toHaveProperty('skills');
            expect(benchmarks).toHaveProperty('impact');
            expect(benchmarks).toHaveProperty('presentation');
        });

        it('should have skill gaps defined', () => {
            const { skillGaps } = portfolioData.analytics;
            expect(skillGaps).toBeDefined();
            expect(Array.isArray(skillGaps)).toBe(true);
            expect(skillGaps.length).toBeGreaterThan(0);
        });
    });

    describe('Personal Data', () => {
        it('should have valid personal information', () => {
            const { personal } = portfolioData;
            expect(personal.name).toBeDefined();
            expect(personal.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            expect(personal.title).toBeDefined();
        });
    });

    describe('Projects Data', () => {
        it('should have at least one project', () => {
            expect(portfolioData.projects).toBeDefined();
            expect(Array.isArray(portfolioData.projects)).toBe(true);
            expect(portfolioData.projects.length).toBeGreaterThan(0);
        });

        it('should have proper project structure', () => {
            portfolioData.projects.forEach(project => {
                expect(project).toHaveProperty('title');
                expect(project).toHaveProperty('description');
                expect(project).toHaveProperty('tech');
                expect(project).toHaveProperty('category');
                expect(project).toHaveProperty('impact');
                expect(Array.isArray(project.tech)).toBe(true);
            });
        });

        it('should have impact metrics for each project', () => {
            portfolioData.projects.forEach(project => {
                expect(project.impact).toHaveProperty('stars');
                expect(project.impact).toHaveProperty('complexity');
                expect(project.impact.complexity).toBeGreaterThanOrEqual(0);
                expect(project.impact.complexity).toBeLessThanOrEqual(100);
            });
        });
    });

    describe('Skills Data', () => {
        it('should have categorized skills', () => {
            expect(portfolioData.skills).toBeDefined();
            expect(Array.isArray(portfolioData.skills)).toBe(true);
            
            portfolioData.skills.forEach(category => {
                expect(category).toHaveProperty('category');
                expect(category).toHaveProperty('items');
                expect(Array.isArray(category.items)).toBe(true);
            });
        });

        it('should have valid skill levels', () => {
            portfolioData.skills.forEach(category => {
                category.items.forEach(skill => {
                    expect(skill).toHaveProperty('name');
                    expect(skill).toHaveProperty('level');
                    expect(skill.level).toBeGreaterThanOrEqual(0);
                    expect(skill.level).toBeLessThanOrEqual(100);
                });
            });
        });
    });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import VisitorAnalytics from '../components/VisitorAnalytics';

// Mock Recharts
vi.mock('recharts', () => ({
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    AreaChart: ({ children }) => <div data-testid="area-chart">{children}</div>,
    Area: () => <div data-testid="area" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    Line: () => <div data-testid="line" />,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
}));

describe('VisitorAnalytics Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component with title', () => {
        render(<VisitorAnalytics />);
        expect(screen.getByText(/Visitor/)).toBeInTheDocument();
        expect(screen.getByText(/Analytics/)).toBeInTheDocument();
    });

    it('displays all key metrics', () => {
        render(<VisitorAnalytics />);
        
        expect(screen.getByText('2,481')).toBeInTheDocument(); // Total visits
        expect(screen.getByText('142')).toBeInTheDocument(); // Recruiters
        expect(screen.getByText('4:25')).toBeInTheDocument(); // Avg time
        expect(screen.getByText('India')).toBeInTheDocument(); // Top region
    });

    it('shows time period label', () => {
        render(<VisitorAnalytics />);
        expect(screen.getByText('Last 7 Days')).toBeInTheDocument();
    });

    it('displays metric labels correctly', () => {
        render(<VisitorAnalytics />);
        
        expect(screen.getByText('Total Visits')).toBeInTheDocument();
        expect(screen.getByText('Recruiters')).toBeInTheDocument();
        expect(screen.getByText('Avg. Time')).toBeInTheDocument();
        expect(screen.getByText('Top Region')).toBeInTheDocument();
    });

    it('shows positive trend indicator', () => {
        render(<VisitorAnalytics />);
        expect(screen.getByText('+12%')).toBeInTheDocument();
    });

    it('renders the chart after component mounts', async () => {
        render(<VisitorAnalytics />);
        
        await waitFor(() => {
            expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
        });
    });

    it('displays location details', () => {
        render(<VisitorAnalytics />);
        expect(screen.getByText('Andhra Pradesh')).toBeInTheDocument();
    });
});

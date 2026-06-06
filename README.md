# AS-Portfolio

A modern, high-performance personal portfolio website for **Shaik Abdul Sammed**, designed to showcase technical skills, projects, achievements, and AI-driven insights in a polished and professional format.

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

## Overview

AS-Portfolio is a responsive, production-ready portfolio application built with React and Vite. It combines elegant UI design, reusable component architecture, analytics-driven sections, and AI-inspired portfolio insights to present a compelling professional brand online.

## Highlights

- Professional personal branding and storytelling
- Interactive project and skills showcase
- AI-enhanced analytics and recommendations
- Responsive layout optimized for desktop and mobile
- Automated testing and production build validation

## Key Features

| Feature | Description |
| --- | --- |
| AI Analytics | Portfolio IQ, trend analysis, and performance metrics |
| Career Guidance | Smart recommendations and career-focused insights |
| Project Showcase | Featured repositories, impact summaries, and live links |
| Resume Customizer | Tailored resume-related workflows |
| Visitor Insights | Engagement and activity visualization |
| Modern UI | Smooth animations, theming, and interactive components |

## Tech Stack

### Frontend
- React 19
- Vite 7
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide Icons

### Quality & Testing
- Vitest
- React Testing Library
- JSDOM

## Project Structure

```text
.
├── src/
│   ├── components/     # Reusable UI sections and views
│   ├── data/           # Portfolio content and project metadata
│   ├── utils/          # Analytics and helper logic
│   └── tests/          # Unit and component tests
├── public/             # Static assets and PWA manifest
├── .github/workflows/  # GitHub Pages deployment workflow
├── Dockerfile          # Container deployment support
├── vite.config.js      # Vite configuration
├── vitest.config.js    # Test configuration
└── TEST_REPORT.md      # Validation and test summary
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Testing

```bash
npm test -- --run
```

## Deployment

This project is configured for GitHub Pages deployment through GitHub Actions. After enabling Pages in the repository settings, the workflow in `.github/workflows/deploy.yml` will publish the production build automatically on every push to `main`.

## Live Links

- Portfolio website: https://as-portfolio-main-b16649f.kuberns.cloud/
- GitHub repository: https://github.com/Shaik-Abdul-Sammed/AS-portfolio

## Contact

For collaboration, feedback, or project-related inquiries:

- Email: samm41236@gmail.com
- GitHub: https://github.com/Shaik-Abdul-Sammed


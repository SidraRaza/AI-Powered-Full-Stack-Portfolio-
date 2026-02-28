'use client';

import { HoverButton } from '@/components/animations/hover-effects';
import type { HeroButton } from '@/types/blog';

// Hero section configuration
const heroData = {
  name: 'Sidra Raza',
  title: 'AI Engineer & Agentic Systems Developer',
  description:
    'I design and build intelligent AI systems that automate business workflows, increase efficiency, and drive scalable growth.',
  buttons: [
    {
      label: 'Download My CV',
      href: '/SidraRaza.pdf',
      variant: 'primary' as const,
      external: false
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sidra-raza-9442132b9/',
      variant: 'outline' as const,
      external: true
    },
  
  ]
};

/**
 * HeroSection - Professional hero component for homepage
 * 
 * Displays:
 * - Professional introduction with name and title
 * - Description of expertise and value proposition
 * - Four action buttons: Download CV, LinkedIn, GitHub, Contact Me
 * 
 * Features:
 * - Modern, minimal, professional design
 * - Responsive layout for all devices
 * - Smooth hover animations on buttons
 * - Error handling for missing CV file
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Subtle background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 animate-gradient" />
      
      {/* Content container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
           {heroData.name}
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-8">
          {heroData.title}
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          {heroData.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          {heroData.buttons.map((button, index) => (
            <HeroButtonComponent key={index} button={button} />
          ))}
        </div>

        {/* Note about CV */}
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          Available for freelance projects and consulting opportunities
        </p>
      </div>
    </section>
  );
}

/**
 * HeroButtonComponent - Individual hero button with hover effects
 */
function HeroButtonComponent({ button }: { button: HeroButton }) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400'
  };

  const linkProps = button.external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {};

  return (
    <HoverButton scale={1.05}>
      <a href={button.href} className={`${baseStyles} ${variantStyles[button.variant]}`} {...linkProps}>
        {button.label}
        {button.external && (
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    </HoverButton>
  );
}

/**
 * Background gradient animation component
 */
function BackgroundGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gradient-to-tl from-purple-400/10 to-transparent rounded-full blur-3xl animate-float-delayed" />
    </div>
  );
}

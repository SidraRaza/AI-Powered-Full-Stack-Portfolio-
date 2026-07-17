'use client';

import { HoverButton } from '@/components/animations/hover-effects';
import type { HeroButton } from '@/types/blog';

// Hero section configuration
const heroData = {
  name: 'Sidra Raza',
  location: 'Karachi, Pakistan',
  title: 'Full Stack Developer & Agentic AI Engineer',
  description:
    'I am a Full Stack Developer and Agentic AI Engineer based in Karachi, Pakistan. I build scalable web applications, AI-powered automation systems, and intelligent agents that streamline business workflows, improve productivity, and solve real-world problems.',

  buttons: [
    // {
    //   label: 'Download CV',
    //   href: '/sidra.pdf',
    //   variant: 'primary' as const,
    //   external: false,
    // },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sidra-raza-9442132b9/',
      variant: 'outline' as const,
      external: true,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/your-github-username',
      variant: 'outline' as const,
      external: true,
    },
    // {
    //   label: 'Contact Me',
    //   href: '#contact',
    //   variant: 'outline' as const,
    //   external: false,
    // },
  ],
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background-secondary to-surface w-full">
      {/* Subtle background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient" />

      {/* Content container */}
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-10 text-center">
        <div className="max-w-5xl mx-auto w-full">
        {/* Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
           {heroData.name}
        </h1>

        {/* Title */}
        <h2 className="text-[24px] sm:text-2xl md:text-3xl font-semibold gradient-text mb-4 mx-3">
          {heroData.title}
        </h2>

        {/* Description */}
       <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-5 mb-12 leading-relaxed text-justify">
  {heroData.description}
</p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 ">
          {heroData.buttons.map((button, index) => (
            <HeroButtonComponent key={index} button={button} />
          ))}
        </div>

        {/* Note about CV */}
        <p className="mt-8 text-[16px] text-text-dim">
          Available for freelance projects and consulting opportunities
        </p>
        </div>
      </div>
    </section>
  );
}

/**
 * HeroButtonComponent - Individual hero button with hover effects
 */
function HeroButtonComponent({ button }: { button: HeroButton }) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background w-full sm:w-auto';

  const variantStyles = {
    primary: 'bg-primary text-background hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl',
    secondary: 'bg-surface-light text-foreground hover:bg-surface-elevated border border-border shadow-lg hover:shadow-xl',
    outline: 'border-2 border-border text-text-muted hover:border-primary hover:text-primary focus:ring-primary'
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

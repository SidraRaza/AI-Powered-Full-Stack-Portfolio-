'use client';

import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-13 h-13',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <Link
      href="/"
      className={`flex-shrink-0 flex items-center gap-3 transition-all duration-300 group ${className}`}
    >
      {/* Emblem Icon Box */}
      <div
        className={`relative ${
          iconSizes[size] || iconSizes.md
        } rounded-xl bg-gradient-to-br from-rose-500/20 via-pink-500/15 to-rose-600/10 dark:from-rose-500/25 dark:via-pink-500/20 dark:to-rose-600/15 p-2 border border-rose-500/40 dark:border-rose-400/40 shadow-[0_0_15px_rgba(251,113,133,0.35)] group-hover:shadow-[0_0_25px_rgba(251,113,133,0.6)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center backdrop-blur-md`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(251,113,133,0.6)] transition-transform duration-300 group-hover:rotate-3"
        >
          <defs>
            <linearGradient id="logoIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="50%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>

          {/* Background Shield/Squircle accent */}
          <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#logoIconGrad)" fillOpacity="0.12" stroke="url(#logoIconGrad)" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Intertwined 'S' and 'R' Monogram */}
          <path
            d="M13 15C13 12.7909 14.7909 11 17 11H22C24.2091 11 26 12.7909 26 15C26 17.2091 24.2091 19 22 19H17C14.7909 19 13 20.7909 13 23C13 25.2091 14.7909 27 17 27H23C25.2091 27 27 25.2091 27 23"
            stroke="url(#logoIconGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* AI Sparkle / Tech Node Accents */}
          <circle cx="27" cy="15" r="2" fill="url(#sparkleGrad)" />
          <circle cx="13" cy="23" r="2" fill="url(#sparkleGrad)" />
          <path d="M28 8L29.5 11L32.5 12.5L29.5 14L28 17L26.5 14L23.5 12.5L26.5 11L28 8Z" fill="url(#sparkleGrad)" opacity="0.85" />
        </svg>
      </div>

      {/* Brand Text */}
      <span
        className={`font-extrabold tracking-tight bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 dark:from-[#fb7185] dark:via-[#fda4af] dark:to-[#f472b6] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(251,113,133,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(251,113,133,0.6)] transition-all duration-300 ${
          textSizes[size] || textSizes.md
        }`}
      >
        Sidra Raza
      </span>
    </Link>
  );
}
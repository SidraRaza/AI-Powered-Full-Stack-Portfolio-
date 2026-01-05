'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-16 h-6',
    md: 'w-24 h-8',
    lg: 'w-28 h-10',
  };

  return (
    <Link
      href="/"
      className={`flex items-center transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <div className={`${sizeClasses[size]} flex items-center`}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff"/>
              <stop offset="100%" stopColor="#a855f7"/>
            </linearGradient>
            <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur"/>
              <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.06 0 0 0 0 0.75 0 0 0 0 1 0 0 0 0.1 0"/>
            </filter>
          </defs>

          <text
            x="10"
            y="40"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize={size === 'sm' ? '20' : size === 'lg' ? '32' : '28'}
            fontWeight="600"
            fill="url(#logoGradient)"
            filter="url(#logoGlow)"
            className="transition-all duration-300"
          >
            Sidra Raza
          </text>

          {/* Subtle AI/tech element - neural network inspired dots */}
          <g fill="#00f0ff" opacity="0.6">
            <motion.circle
              cx={size === 'sm' ? '120' : size === 'lg' ? '150' : '140'}
              cy={size === 'sm' ? '12' : size === 'lg' ? '15' : '14'}
              r={size === 'sm' ? '1.5' : '2'}
              className="animate-pulse"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx={size === 'sm' ? '130' : size === 'lg' ? '160' : '150'}
              cy={size === 'sm' ? '10' : size === 'lg' ? '12' : '12'}
              r={size === 'sm' ? '1' : '1.5'}
              className="animate-pulse"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
          </g>
        </svg>
      </div>
    </Link>
  );
}
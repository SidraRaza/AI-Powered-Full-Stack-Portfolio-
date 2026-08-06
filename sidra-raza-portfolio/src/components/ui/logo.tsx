'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const iconSizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <Link
      href="/"
      className={`flex-shrink-0 flex items-center gap-2.5 transition-all duration-300 group ${className}`}
    >
      <div className={`relative ${iconSizes[size] || iconSizes.md} rounded-xl bg-gradient-to-br from-primary/25 via-accent/20 to-primary/10 p-2 border border-primary/40 shadow-[0_0_15px_rgba(251,113,133,0.3)] group-hover:shadow-[0_0_25px_rgba(251,113,133,0.55)] group-hover:scale-105 transition-all flex items-center justify-center`}>
        <Image
          src="/logo/sidralogo.png"
          alt="Sidra Raza Logo"
          width={48}
          height={48}
          className="object-contain drop-shadow-[0_0_10px_rgba(251,113,133,0.7)]"
          priority
        />
      </div>
      <span className={`font-extrabold tracking-tight bg-gradient-to-r from-[#fb7185] via-[#fda4af] to-[#f472b6] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(251,113,133,0.35)] group-hover:drop-shadow-[0_0_20px_rgba(251,113,133,0.65)] transition-all ${textSizes[size] || textSizes.md}`}>
        Sidra Raza
      </span>
    </Link>
  );
}
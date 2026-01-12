'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  // Default sizes if size is not recognized
  const sizes = {
    sm: 'w-20 h-8 sm:w-24 sm:h-10',  // Increased from w-16 h-6
    md: 'w-32 h-12 lg:w-44 lg:h-16', // Increased from w-24 h-8, extra large on lg screens
    lg: 'w-40 h-14 lg:w-52 lg:h-18', // Increased from w-28 h-10, extra large on lg screens
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
   <Link
  href="/"
  className={`flex-shrink-0 flex items-center gap-0 transition-transform duration-300 hover:scale-105 ${className}`}
>
  <div className={`relative w-16 h-16`}> {/* Set explicit size instead of sizeClass */}
    <Image
      src="/logo/sidralogo.png"
      alt="sidralogo"
      fill
      className="object-contain"
      priority
    />
  </div>
  <span className="text-xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent -ml-2">
    Sidra Raza
  </span>
</Link>

  );
}
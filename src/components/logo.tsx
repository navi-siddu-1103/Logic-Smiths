'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  alt?: string;
}

export default function Logo({ size = 48, className = '', alt = 'EmpowerYouth Logo' }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // If image fails to load, show a fallback
  if (imageError) {
    return (
      <div 
        className={`${className} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold`}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          fontSize: `${size * 0.4}px` 
        } satisfies React.CSSProperties}
      >
        EY
      </div>
    );
  }

  return (
    <Image
      src="/images/logo_user.jpg"
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={handleImageError}
      priority
    />
  );
}
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface UserLogoProps {
  size?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function UserLogo({ size = 48, className = '', alt = 'User Logo', priority = false }: UserLogoProps) {
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
          fontSize: `${size * 0.4}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`
        } satisfies React.CSSProperties}
      >
        U
      </div>
    );
  }

  return (
    <Image
      src="/images/logo_user.jpg"
      alt={alt}
      width={size}
      height={size}
      className={`${className} rounded-full object-cover`}
      onError={handleImageError}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`
      } as React.CSSProperties}
    />
  );
}
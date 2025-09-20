'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BotLogoProps {
  size?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function BotLogo({ size = 48, className = '', alt = 'Bot Logo', priority = false }: BotLogoProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // If image fails to load, show a fallback
  if (imageError) {
    return (
      <div 
        className={`${className} bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold`}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          fontSize: `${size * 0.4}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`
        } satisfies React.CSSProperties}
      >
        AI
      </div>
    );
  }

  return (
    <Image
      src="/images/logo_bot.jpg"
      alt={alt}
      width={size}
      height={size}
      className={`${className} rounded-full`}
      onError={handleImageError}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      style={{
        objectFit: 'cover'
      } as React.CSSProperties}
    />
  );
}
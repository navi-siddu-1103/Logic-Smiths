
'use client';

import { useState, useEffect, Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import SplashScreen from '@/components/splash-screen';
import PageLoader from '@/components/page-loader';
import AuthProvider from '@/components/auth-provider';

// Dynamic imports for performance
const MainLayout = lazy(() => import('@/components/main-layout'));

// Loading component for lazy-loaded components
function LoadingFallback() {
  return <PageLoader />;
}

/*
export const metadata: Metadata = {
  title: 'EmpowerYouth',
  description: 'An AI-powered mental wellness platform for youth.',
};
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Show splash screen for 1 second - faster loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>EmpowerYouth</title>
        <meta name="description" content="An AI-powered mental wellness platform for youth." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/logo_user.jpg" as="image" />
        <link rel="preload" href="/images/logo_bot.jpg" as="image" />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
        
        {/* DNS prefetch for potential external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={cn('font-body antialiased')}>
        <AuthProvider>
          {isLoading ? (
            <SplashScreen />
          ) : (
            <SidebarProvider>
              <Suspense fallback={<LoadingFallback />}>
                <MainLayout>{children}</MainLayout>
              </Suspense>
            </SidebarProvider>
          )}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

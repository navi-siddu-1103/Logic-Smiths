'use client';

import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 h-8 w-8 rounded-full border-2 border-primary/20"></div>
        </div>
        <span className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </span>
      </motion.div>
    </div>
  );
}
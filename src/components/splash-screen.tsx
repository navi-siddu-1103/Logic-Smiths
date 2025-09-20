
'use client';

import { motion } from 'framer-motion';
import UserLogo from './user-logo';

export default function SplashScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-4"
      >
        <div className="rounded-full w-32 h-32 flex items-center justify-center">
            <UserLogo size={128} className="rounded-full" priority={true} />
        </div>
        <span className="font-headline text-2xl font-bold text-foreground">
          EmpowerYouth
        </span>
      </motion.div>
    </div>
  );
}

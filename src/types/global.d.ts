import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
  }
}

declare module 'framer-motion' {
  import { FC, ReactNode, CSSProperties } from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    [key: string]: any;
  }

  export const motion: {
    div: FC<MotionProps>;
    span: FC<MotionProps>;
    [key: string]: FC<MotionProps>;
  };

  export const AnimatePresence: FC<{
    mode?: 'wait' | 'sync' | 'popLayout';
    children?: ReactNode;
  }>;
}

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
  }
  
  // Common icons used in the project
  export const MessageSquare: FC<IconProps>;
  export const BarChart3: FC<IconProps>;
  export const LifeBuoy: FC<IconProps>;
  export const User: FC<IconProps>;
  export const Shield: FC<IconProps>;
  export const BrainCircuit: FC<IconProps>;
  export const Bot: FC<IconProps>;
  export const ArrowRight: FC<IconProps>;
  export const ArrowLeft: FC<IconProps>;
  export const X: FC<IconProps>;
  export const PanelLeft: FC<IconProps>;
  export const Lightbulb: FC<IconProps>;
  export const Plus: FC<IconProps>;
  export const Trash2: FC<IconProps>;
  export const RefreshCw: FC<IconProps>;
  export const Play: FC<IconProps>;
  export const Pause: FC<IconProps>;
  export const Brain: FC<IconProps>;
  export const Wind: FC<IconProps>;
  export const Edit: FC<IconProps>;
  export const Smile: FC<IconProps>;
  export const Phone: FC<IconProps>;
  export const Globe: FC<IconProps>;
  export const Frown: FC<IconProps>;
  export const Meh: FC<IconProps>;
  export const Laugh: FC<IconProps>;
  export const Angry: FC<IconProps>;
  export const Lock: FC<IconProps>;
  export const ShieldCheck: FC<IconProps>;
  export const ChevronDown: FC<IconProps>;
  export const ChevronLeft: FC<IconProps>;
  export const ChevronRight: FC<IconProps>;
  export const ChevronUp: FC<IconProps>;
  export const Check: FC<IconProps>;
  export const Circle: FC<IconProps>;
  
  const LucideReact: {
    [key: string]: FC<IconProps>;
  };
  
  export default LucideReact;
}
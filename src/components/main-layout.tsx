
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, BarChart3, LifeBuoy, User, Shield, BrainCircuit } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import PageTransition from './page-transition';
import FloatingChat from './floating-chat';
import UserLogo from './user-logo';
import UserMenu from './user-menu';

const navItems = [
  { href: '/', icon: MessageSquare, label: 'Chat', tooltip: 'AI Chat' },
  { href: '/mood-tracking', icon: BarChart3, label: 'Moods', tooltip: 'Mood Tracking' },
  { href: '/cbt-exercises', icon: BrainCircuit, label: 'Exercises', tooltip: 'CBT Exercises' },
  { href: '/safety-plan', icon: Shield, label: 'Safety', tooltip: 'Safety Plan' },
  { href: '/emergency-resources', icon: LifeBuoy, label: 'Resources', tooltip: 'Emergency Resources' },
  { href: '/privacy', icon: User, label: 'Profile', tooltip: 'Your Profile & Settings' },
];

const pageTitles: { [key: string]: string } = {
  '/': 'AI Chat',
  '/mood-tracking': 'Mood Tracking',
  '/emergency-resources': 'Emergency Resources',
  '/safety-plan': 'Safety Plan',
  '/cbt-exercises': 'CBT Exercises',
  '/cbt-exercises/cognitive-reframing': 'Cognitive Reframing',
  '/cbt-exercises/mindful-breathing': 'Mindful Breathing',
  '/cbt-exercises/journaling': 'Journaling',
  '/cbt-exercises/gratitude-practice': 'Gratitude Practice',
  '/privacy': 'Profile & Privacy',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'EmpowerYouth';

  return (
    <>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarContent>
          <SidebarHeader className="p-4 justify-center items-center">
            <Link href="/" className="flex items-center justify-center gap-2 text-sidebar-foreground no-underline">
              <div className="rounded-full w-12 h-12 flex items-center justify-center transition-all group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10">
                  <UserLogo size={48} className="rounded-full group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 transition-all" />
                </div>
              <span className="font-headline text-xl font-bold transition-opacity group-data-[collapsible=icon]:opacity-0 text-sidebar-foreground">
                EmpowerYouth
              </span>
            </Link>
          </SidebarHeader>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    isActive={pathname.startsWith(item.href) && (item.href === '/' ? pathname === '/' : true)}
                    tooltip={{ children: item.tooltip }}
                    className="justify-start"
                  >
                    <span>
                      <item.icon />
                      <span>{item.label}</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header
          className={cn(
            'flex h-16 items-center gap-4 border-b bg-background/80 px-4 md:px-6 backdrop-blur-sm sticky top-0 z-30',
            'md:peer-data-[variant=inset]:border-none md:peer-data-[variant=inset]:bg-transparent md:peer-data-[variant=inset]:backdrop-blur-none'
          )}
        >
          <SidebarTrigger className="flex md:hidden" />
          <h1 className="text-xl font-bold md:text-2xl font-headline flex-1">{title}</h1>
          <UserMenu />
        </header>
        <div className="flex-1 p-4 md:p-6">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
        <FloatingChat />
      </SidebarInset>
    </>
  );
}

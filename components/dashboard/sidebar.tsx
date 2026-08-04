'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  HandHeart,
  QrCode,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  CalendarCheck2,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNav: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Events', href: '/events', icon: CalendarDays, badge: '7' },
  { label: 'Attendees', href: '/attendees', icon: Users },
  { label: 'Volunteers', href: '/volunteers', icon: HandHeart },
  { label: 'QR Check-In', href: '/qr-checkin', icon: QrCode, badge: 'New' },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Notifications', href: '/notifications', icon: Bell, badge: '5' },
  { label: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300 ease-in-out',
          collapsed ? 'w-[76px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <CalendarCheck2 className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">EventOps</span>
              <span className="text-[11px] text-muted-foreground">Volunteer Portal</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hidden h-8 w-8 md:flex"
            onClick={onToggle}
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-thin p-3">
          {mainNav.map((item) => {
            const active = isActive(item.href);
            const link = (
              <Link
                href={item.href}
                onClick={onMobileClose}
                className={cn(
                  'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  collapsed && 'justify-center px-0'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 shrink-0 transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                      item.badge === 'New'
                        ? 'bg-success/15 text-success'
                        : 'bg-primary/15 text-primary'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
                )}
              </Link>
            );
            return collapsed ? (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div key={item.href} className="relative">
                {link}
              </div>
            );
          })}
        </nav>

        <div className="border-t p-3">
          <div
            className={cn(
              'rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3',
              collapsed && 'p-2'
            )}
          >
            {!collapsed ? (
              <>
                <p className="text-xs font-semibold">Need help?</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Check the admin guide or contact support.
                </p>
                <Button size="sm" className="mt-3 h-8 w-full text-xs">
                  View Guide
                </Button>
              </>
            ) : (
              <div className="flex justify-center">
                <Button size="icon" className="h-8 w-8">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

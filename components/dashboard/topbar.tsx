'use client';

import * as React from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  PanelLeft,
  ChevronDown,
  UserCircle,
  Settings,
  LogOut,
  CalendarCheck2,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { notifications as notifData } from '@/lib/data';

interface TopbarProps {
  onMobileMenu: () => void;
  onCollapseToggle: () => void;
}

export function Topbar({ onMobileMenu, onCollapseToggle }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const unreadCount = notifData.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMobileMenu}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:flex"
        onClick={onCollapseToggle}
        aria-label="Toggle sidebar"
      >
        <PanelLeft className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2 md:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <CalendarCheck2 className="h-4 w-4" />
        </div>
      </div>

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events, attendees, volunteers..."
          className="h-9 pl-9 pr-4 bg-muted/50 border-transparent focus-visible:bg-background"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 md:gap-2">
        <div className="hidden items-center gap-2 rounded-lg border bg-card px-3 py-1.5 lg:flex">
          <span className="h-2 w-2 rounded-full bg-success pulse-ring" />
          <span className="text-xs font-medium tabular-nums">
            {mounted && now
              ? now.toLocaleString('en-US', {
                  weekday: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
              : 'Loading…'}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {mounted && theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary" className="text-[10px]">
                {unreadCount} new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifData.slice(0, 4).map((n) => (
              <div
                key={n.id}
                className={cn(
                  'flex gap-3 rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-accent',
                  n.unread && 'bg-accent/40'
                )}
              >
                <div
                  className={cn(
                    'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                    n.unread ? 'bg-primary' : 'bg-muted-foreground/40'
                  )}
                />
                <div className="flex-1">
                  <p className="font-medium leading-tight">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.description}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/70">{n.time}</p>
                </div>
              </div>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm font-medium text-primary" asChild>
              <Link href="/notifications">View all notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg border bg-card p-1 pl-1 pr-2 transition-colors hover:bg-accent">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  AH
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left leading-tight md:block">
                <p className="text-xs font-semibold">Alex Harper</p>
                <p className="text-[10px] text-muted-foreground">Administrator</p>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-semibold">Alex Harper</p>
              <p className="text-xs font-normal text-muted-foreground">
                alex.harper@eventops.io
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings"><UserCircle className="mr-2 h-4 w-4" /> Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

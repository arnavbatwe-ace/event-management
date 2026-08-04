'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div
        className={cn(
          'flex min-h-screen flex-col transition-all duration-300',
          collapsed ? 'md:pl-[76px]' : 'md:pl-64'
        )}
      >
        <Topbar
          onMobileMenu={() => setMobileOpen(true)}
          onCollapseToggle={() => setCollapsed((c) => !c)}
        />
        <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">{children}</main>
        <footer className="border-t px-4 py-5 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground md:flex-row">
            <p>Event & Volunteer Management Portal · v2.4.0</p>
            <p>Last updated: Aug 1, 2026 · 09:42 AM</p>
            <p>© 2026 EventOps. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

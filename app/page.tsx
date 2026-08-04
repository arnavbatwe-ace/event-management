'use client';

import { AppShell } from '@/components/dashboard/app-shell';
import { HeroSection } from '@/components/dashboard/hero-section';
import { StatsCard } from '@/components/dashboard/stats-card';
import { EventCard } from '@/components/dashboard/event-card';
import { ActivityCard } from '@/components/dashboard/activity-card';
import { NotificationPanel } from '@/components/dashboard/notification-panel';
import { SystemStatusCard } from '@/components/dashboard/system-status-card';
import { QrMonitor } from '@/components/dashboard/qr-monitor';
import { VolunteerTable } from '@/components/dashboard/volunteer-table';
import { RegistrationTable } from '@/components/dashboard/registration-table';
import { ChartsSection } from '@/components/dashboard/charts-section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { stats, todayEvents, activityFeed } from '@/lib/data';

export default function DashboardPage() {
  return (
    <AppShell>
      <HeroSection />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s, i) => (
          <StatsCard key={s.id} stat={s} index={i} />
        ))}
      </section>

      <ChartsSection />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Live Activity Feed</CardTitle>
            <CardDescription>Real-time event and volunteer activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[360px] overflow-y-auto scrollbar-thin pr-2">
              {activityFeed.map((a) => (
                <ActivityCard key={a.id} activity={a} />
              ))}
            </div>
          </CardContent>
        </Card>
        <NotificationPanel />
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">Today's Events</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {todayEvents.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <QrMonitor />
        <SystemStatusCard />
      </section>

      <RegistrationTable />
      <VolunteerTable />
    </AppShell>
  );
}

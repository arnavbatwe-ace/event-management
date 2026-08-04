'use client';

import { useRouter } from 'next/navigation';
import { CalendarPlus, QrCode, UserPlus, FileDown, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { heroStats } from '@/lib/data';

const quickActions = [
  { label: 'Create Event', icon: CalendarPlus, route: '/events/create' },
  { label: 'Generate QR', icon: QrCode, route: '/qr-checkin' },
  { label: 'Register Volunteer', icon: UserPlus, route: '/volunteers/register' },
  { label: 'Export Report', icon: FileDown, route: '/reports' },
];

const heroItems = [
  { label: 'Active events today', value: heroStats.activeEventsToday },
  { label: "Today's registrations", value: heroStats.todayRegistrations },
  { label: "Today's check-ins", value: heroStats.todayCheckins },
];

export function HeroSection() {
  const router = useRouter();

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Admin Dashboard
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Welcome back, Alex
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here's what's happening across your events today.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {heroItems.map((h) => (
              <div key={h.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tabular-nums">{h.value}</span>
                <span className="text-xs text-muted-foreground">{h.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((a) => (
            <Button
              key={a.label}
              variant={a.label === 'Create Event' ? 'default' : 'outline'}
              className="h-10 gap-2"
              onClick={() => router.push(a.route)}
            >
              <a.icon className="h-4 w-4" />
              {a.label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}

'use client';

import * as React from 'react';
import {
  UserPlus,
  QrCode,
  HandHeart,
  CalendarPlus,
  CalendarCog,
  UserMinus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ActivityItem } from '@/lib/data';

const config: Record<
  ActivityItem['type'],
  { icon: React.ElementType; color: string }
> = {
  registered: { icon: UserPlus, color: 'bg-primary/10 text-primary' },
  scanned: { icon: QrCode, color: 'bg-success/10 text-success' },
  volunteer: { icon: HandHeart, color: 'bg-warning/10 text-warning' },
  event_created: { icon: CalendarPlus, color: 'bg-primary/10 text-primary' },
  event_updated: { icon: CalendarCog, color: 'bg-chart-4/15 text-chart-4' },
  cancelled: { icon: UserMinus, color: 'bg-destructive/10 text-destructive' },
};

export function ActivityCard({ activity }: { activity: ActivityItem }) {
  const { icon: Icon, color } = config[activity.type];
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={cn('flex h-8 w-8 items-center justify-center rounded-full', color)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="w-px flex-1 bg-border" />
      </div>
      <div className="flex-1 pb-5">
        <p className="text-sm leading-snug">{activity.message}</p>
        <p className="mt-1 text-xs text-muted-foreground">{activity.timestamp}</p>
      </div>
    </div>
  );
}

'use client';

import { MapPin, Clock, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { EventItem } from '@/lib/data';

const statusStyles: Record<EventItem['status'], string> = {
  Upcoming: 'bg-primary/10 text-primary border-primary/20',
  Ongoing: 'bg-success/10 text-success border-success/20',
  Completed: 'bg-muted text-muted-foreground border-border',
};

export function EventCard({ event }: { event: EventItem }) {
  const pct = Math.round((event.registered / event.capacity) * 100);
  const full = event.registered >= event.capacity;

  return (
    <Card className="group overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={cn('relative h-24 bg-gradient-to-br', event.banner)}>
        <div className="absolute inset-0 bg-black/10" />
        <Badge
          variant="outline"
          className={cn(
            'absolute right-3 top-3 backdrop-blur-md',
            statusStyles[event.status]
          )}
        >
          {event.status}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold leading-tight tracking-tight line-clamp-2">
          {event.name}
        </h3>
        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span>
              {event.date} · {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{event.organizer}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {event.registered} / {event.capacity}
            </span>
            <span className={cn('font-semibold', full ? 'text-destructive' : 'text-foreground')}>
              {pct}%
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-700',
                full ? 'bg-destructive' : 'bg-primary'
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

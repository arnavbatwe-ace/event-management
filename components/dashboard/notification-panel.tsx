'use client';

import * as React from 'react';
import { UserPlus, BellRing, HandHeart, QrCode, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { notifications as initialData, type NotificationItem } from '@/lib/data';

const config: Record<NotificationItem['category'], { icon: React.ElementType; color: string }> = {
  registration: { icon: UserPlus, color: 'bg-primary/10 text-primary' },
  reminder: { icon: BellRing, color: 'bg-warning/10 text-warning' },
  volunteer: { icon: HandHeart, color: 'bg-chart-4/15 text-chart-4' },
  checkin: { icon: QrCode, color: 'bg-success/10 text-success' },
  system: { icon: Settings, color: 'bg-muted text-muted-foreground' },
};

export function NotificationPanel() {
  const [items, setItems] = React.useState(initialData);
  const unread = items.filter((n) => n.unread).length;

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>{unread} unread</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAll}>
          Mark all read
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[340px] px-6 pb-6">
          <div className="space-y-2">
            {items.map((n) => {
              const { icon: Icon, color } = config[n.category];
              return (
                <div
                  key={n.id}
                  className={cn(
                    'flex gap-3 rounded-xl border p-3 transition-colors hover:bg-accent/40',
                    n.unread && 'bg-accent/30'
                  )}
                >
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 leading-tight">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{n.title}</p>
                      {n.unread && <Badge className="h-1.5 w-1.5 rounded-full bg-primary p-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{n.description}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground/70">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

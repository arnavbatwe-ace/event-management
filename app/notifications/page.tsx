'use client';

import { useState } from 'react';
import { AppShell } from '@/components/dashboard/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCheck, Trash2, Filter, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { notifications as allNotifs } from '@/lib/data';
import { toast } from 'sonner';

const typeConfig: Record<string, { icon: typeof Bell; color: string; label: string }> = {
  registration: { icon: Bell, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', label: 'Registration' },
  reminder: { icon: Bell, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', label: 'Event Reminder' },
  volunteer: { icon: Bell, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', label: 'Volunteer' },
  checkin: { icon: Bell, color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400', label: 'Check-in' },
  system: { icon: Bell, color: 'bg-muted text-muted-foreground', label: 'System' },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(allNotifs);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? notifs : notifs.filter((n) => n.category === filter);
  const unreadCount = notifs.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast('All notifications marked as read');
  };

  const clearAll = () => {
    setNotifs([]);
    toast('All notifications cleared');
  };

  const toggleRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));
  };

  const deleteNotif = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount} unread · {notifs.length} total notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={markAllRead} disabled={unreadCount === 0}>
            <CheckCheck className="h-4 w-4" /> Mark all read
          </Button>
          <Button variant="outline" className="gap-2" onClick={clearAll} disabled={notifs.length === 0}>
            <Trash2 className="h-4 w-4" /> Clear all
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'registration', 'reminder', 'volunteer', 'checkin', 'system'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'secondary' : 'outline'}
            size="sm"
            className="gap-1.5 capitalize"
            onClick={() => setFilter(f)}
          >
            {f === 'all' && <Filter className="h-3.5 w-3.5" />}
            {f === 'all' ? 'All' : typeConfig[f]?.label || f}
            {f === 'all' && ` (${notifs.length})`}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Inbox className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mt-4 text-sm font-medium">No notifications</p>
          <p className="text-xs text-muted-foreground">You're all caught up.</p>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filtered.map((n) => {
                const cfg = typeConfig[n.category] || typeConfig.system;
                return (
                  <div
                    key={n.id}
                    className={cn(
                      'flex items-start gap-3 p-4 transition-colors hover:bg-accent/50',
                      !n.unread && 'bg-primary/5'
                    )}
                  >
                    <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', cfg.color)}>
                      <cfg.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{n.title}</p>
                        {!n.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{n.description}</p>
                      <div className="mt-1.5 flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">{cfg.label}</Badge>
                        <span className="text-xs text-muted-foreground">{n.time}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleRead(n.id)}
                      >
                        <CheckCheck className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteNotif(n.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}

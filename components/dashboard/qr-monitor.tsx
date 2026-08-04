'use client';

import { QrCode, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { qrMonitor } from '@/lib/data';

const counters = [
  { label: 'Successful', value: qrMonitor.successful, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
  { label: 'Failed', value: qrMonitor.failed, icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  { label: 'Pending', value: qrMonitor.pending, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
];

const scanStyle: Record<string, string> = {
  success: 'bg-success/10 text-success',
  failed: 'bg-destructive/10 text-destructive',
  pending: 'bg-warning/10 text-warning',
};

export function QrMonitor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <QrCode className="h-4 w-4 text-primary" />
          QR Check-In Monitor
        </CardTitle>
        <CardDescription>Live scan activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {counters.map((c) => (
            <div key={c.label} className={cn('rounded-xl p-3', c.bg)}>
              <c.icon className={cn('h-4 w-4', c.color)} />
              <p className="mt-2 text-2xl font-bold tabular-nums">{c.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Recent scans</p>
          {qrMonitor.recent.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="leading-tight">
                  <p className="font-medium">{s.attendee}</p>
                  <p className="text-xs text-muted-foreground">{s.code}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs tabular-nums text-muted-foreground">{s.time}</span>
                <Badge variant="secondary" className={scanStyle[s.status]}>
                  {s.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

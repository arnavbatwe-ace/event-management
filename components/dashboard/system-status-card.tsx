'use client';

import * as React from 'react';
import { Server, Database, Radio, HardDrive, Wifi, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { systemHealth } from '@/lib/data';

const icons: Record<string, React.ElementType> = {
  'Backend API': Server,
  Database: Database,
  'Socket.io Connection': Radio,
  'Local Server': HardDrive,
  'Internet Connectivity': Wifi,
  'Last Synchronization': RefreshCw,
};

const statusColor: Record<string, string> = {
  operational: 'bg-success',
  degraded: 'bg-warning',
  down: 'bg-destructive',
};

const statusLabel: Record<string, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  down: 'Down',
};

export function SystemStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">System Health</CardTitle>
        <CardDescription>Real-time infrastructure monitoring</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {systemHealth.map((s) => {
          const Icon = icons[s.label] ?? Server;
          return (
            <div
              key={s.id}
              className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-accent/40"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 leading-tight">
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.detail}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn('h-2.5 w-2.5 rounded-full', statusColor[s.status])}>
                  {s.status === 'operational' && <span className="block h-full w-full rounded-full pulse-ring" />}
                </span>
                <span className="text-xs font-medium">{statusLabel[s.status]}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

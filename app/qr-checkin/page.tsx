'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/dashboard/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { QrCode, CheckCircle2, XCircle, Clock, ScanLine, RefreshCw, Camera, ArrowRight, User, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ScanRecord {
  id: string;
  name: string;
  event: string;
  time: string;
  status: 'success' | 'failed' | 'pending';
}

interface CheckinResult {
  name: string;
  event: string;
  time: string;
  status: 'success' | 'failed';
}

const initialScans: ScanRecord[] = [
  { id: 's1', name: 'Sophia Patel', event: 'TechFest 2026', time: '09:42:18', status: 'success' },
  { id: 's2', name: 'James Lee', event: 'AI & Robotics Workshop', time: '09:41:55', status: 'success' },
  { id: 's3', name: 'Unknown', event: '—', time: '09:41:32', status: 'failed' },
  { id: 's4', name: 'Olivia Brown', event: 'Hackathon Kickoff', time: '09:40:48', status: 'success' },
  { id: 's5', name: 'William Davis', event: 'TechFest 2026', time: '09:40:15', status: 'pending' },
  { id: 's6', name: 'Ava Martinez', event: 'Career Fair 2026', time: '09:39:52', status: 'success' },
];

const statusConfig = {
  success: { icon: CheckCircle2, label: 'Success', class: 'bg-success/10 text-success' },
  failed: { icon: XCircle, label: 'Failed', class: 'bg-destructive/10 text-destructive' },
  pending: { icon: Clock, label: 'Pending', class: 'bg-warning/10 text-warning' },
};

export default function QrCheckinPage() {
  const [scans, setScans] = useState<ScanRecord[]>(initialScans);
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [lastResult, setLastResult] = useState<CheckinResult | null>(null);

  useEffect(() => {
    if (!scanning) return;
    const names = ['Ethan Hunt', 'Chloe Anderson', 'Liam Walker', 'Emma Stone', 'Noah Reyes'];
    const events = ['TechFest 2026', 'AI & Robotics Workshop', 'Hackathon Kickoff', 'Career Fair 2026'];
    const statuses: ScanRecord['status'][] = ['success', 'success', 'success', 'failed', 'pending'];
    const interval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      const event = events[Math.floor(Math.random() * events.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour12: false });
      setScans((prev) => [
        { id: `s${Date.now()}`, name: status === 'failed' ? 'Unknown' : name, event: status === 'failed' ? '—' : event, time, status },
        ...prev,
      ].slice(0, 20));
      if (status !== 'pending') {
        setLastResult({ name: status === 'failed' ? 'Unknown' : name, event: status === 'failed' ? '—' : event, time, status });
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [scanning]);

  const handleManualSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!manualCode.trim()) {
      toast.error('Please enter a QR code');
      return;
    }
    const names = ['Sophia Patel', 'James Lee', 'Olivia Brown', 'Noah Patel', 'Mason Cole'];
    const events = ['TechFest 2026', 'AI & Robotics Workshop', 'Hackathon Kickoff', 'Career Fair 2026'];
    const name = names[Math.floor(Math.random() * names.length)];
    const event = events[Math.floor(Math.random() * events.length)];
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    setScans((prev) => [{ id: `s${Date.now()}`, name, event, time, status: 'success' as const }, ...prev].slice(0, 20));
    setLastResult({ name, event, time, status: 'success' as const });
    toast.success('Check-in successful', { description: `${name} checked in for ${event}` });
    setManualCode('');
  };

  const successCount = scans.filter((s) => s.status === 'success').length;
  const failedCount = scans.filter((s) => s.status === 'failed').length;
  const pendingCount = scans.filter((s) => s.status === 'pending').length;

  return (
    <AppShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">QR Check-In Monitor</h1>
        <p className="text-sm text-muted-foreground">
          Live QR scan monitoring and check-in management for all events.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Successful Scans</p>
              <p className="mt-1 text-3xl font-bold tabular-nums text-success">{successCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Failed Scans</p>
              <p className="mt-1 text-3xl font-bold tabular-nums text-destructive">{failedCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
              <XCircle className="h-6 w-6 text-destructive" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Pending Scans</p>
              <p className="mt-1 text-3xl font-bold tabular-nums text-warning">{pendingCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
              <Clock className="h-6 w-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">QR Scanner</CardTitle>
            <CardDescription>Camera-based check-in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={cn(
              'relative flex aspect-square items-center justify-center rounded-xl border-2 border-dashed transition-colors',
              scanning ? 'border-primary bg-primary/5' : 'border-muted bg-muted/30'
            )}>
              {scanning && (
                <div className="absolute inset-x-8 top-8 bottom-8 overflow-hidden">
                  <div className="absolute inset-x-0 h-0.5 bg-primary animate-scan-line" />
                </div>
              )}
              <div className="flex flex-col items-center gap-3 text-center">
                <div className={cn(
                  'flex h-16 w-16 items-center justify-center rounded-2xl transition-colors',
                  scanning ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}>
                  <Camera className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-medium">{scanning ? 'Scanning...' : 'Scanner Ready'}</p>
                  <p className="text-xs text-muted-foreground">
                    {scanning ? 'Point camera at QR code' : 'Press start to begin'}
                  </p>
                </div>
              </div>
            </div>
            <Button
              className="mt-4 w-full gap-2"
              variant={scanning ? 'destructive' : 'default'}
              onClick={() => setScanning((s) => !s)}
            >
              {scanning ? <RefreshCw className="h-4 w-4" /> : <ScanLine className="h-4 w-4" />}
              {scanning ? 'Stop Scanning' : 'Start Scanning'}
            </Button>

            <div className="mt-4 border-t pt-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Manual QR Input</p>
              <form onSubmit={handleManualSubmit} className="flex gap-2">
                <Input
                  placeholder="Enter QR code..."
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                />
                <Button type="submit" size="icon" className="shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
              <p className="mt-2 text-xs text-muted-foreground">Enter a QR code manually for manual check-in.</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          {lastResult && (
            <Card className={cn(
              'border-2',
              lastResult.status === 'success' ? 'border-success/30' : 'border-destructive/30'
            )}>
              <CardHeader>
                <CardTitle className="text-base">Last Check-in Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-2xl',
                    lastResult.status === 'success' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  )}>
                    {lastResult.status === 'success' ? (
                      <CheckCircle2 className="h-7 w-7" />
                    ) : (
                      <XCircle className="h-7 w-7" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="font-semibold">{lastResult.name}</p>
                      <Badge className={statusConfig[lastResult.status].class}>
                        {statusConfig[lastResult.status].label}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>{lastResult.event}</span>
                      <span>·</span>
                      <span className="tabular-nums">{lastResult.time}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Scan History</CardTitle>
                  <CardDescription>Real-time check-in stream</CardDescription>
                </div>
                <Badge variant="outline" className="gap-1.5">
                  <span className={cn('h-2 w-2 rounded-full', scanning ? 'bg-success animate-pulse' : 'bg-muted-foreground')} />
                  {scanning ? 'Live' : 'Idle'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="max-h-[360px] space-y-2 overflow-y-auto scrollbar-thin pr-1">
                {scans.map((s) => {
                  const cfg = statusConfig[s.status];
                  return (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50"
                    >
                      <div className={cn('flex h-9 w-9 items-center justify-center rounded-full', cfg.class)}>
                        <cfg.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{s.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{s.event}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={cfg.class}>{cfg.label}</Badge>
                        <p className="mt-1 text-xs text-muted-foreground tabular-nums">{s.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

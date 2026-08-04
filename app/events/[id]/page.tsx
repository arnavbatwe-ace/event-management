'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/dashboard/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Clock,
  User,
  Users,
  CheckCircle2,
  HandHeart,
  Edit,
  Trash2,
  BarChart3,
  QrCode,
  Mail,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { allEvents, allAttendees, eventDetailStats } from '@/lib/data';
import { toast } from 'sonner';

const statusStyles: Record<string, string> = {
  Upcoming: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Ongoing: 'bg-success/10 text-success',
  Completed: 'bg-muted text-muted-foreground',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const event = allEvents.find((e) => e.id === id);
  if (!event) {
    return (
      <AppShell>
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <CalendarDays className="h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-sm font-medium">Event not found</p>
          <Button variant="outline" className="mt-4 gap-2" onClick={() => router.push('/events')}>
            <ArrowLeft className="h-4 w-4" /> Back to Events
          </Button>
        </Card>
      </AppShell>
    );
  }

  const detail = eventDetailStats[id] || { volunteerCount: 0, checkinCount: 0 };
  const registeredAttendees = allAttendees.filter((a) => a.event === event.name);
  const pct = Math.round((event.registered / event.capacity) * 100);

  return (
    <AppShell>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push('/events')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{event.name}</h1>
            <p className="text-sm text-muted-foreground">{event.category} · {event.status}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => toast('Edit Event — demo action', { description: 'Connect a REST API to enable this.' })}>
            <Edit className="h-4 w-4" /> Edit
          </Button>
          <Button variant="outline" className="gap-2 text-destructive hover:text-destructive" onClick={() => toast('Delete Event — demo action', { description: 'This would remove the event.' })}>
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
          <Button className="gap-2" onClick={() => router.push('/reports')}>
            <BarChart3 className="h-4 w-4" /> View Reports
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className={cn('relative h-48 bg-gradient-to-br md:h-64', event.banner)}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <Badge className={statusStyles[event.status]}>{event.status}</Badge>
            <span className="rounded-md bg-black/30 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {event.category}
            </span>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div>
                <h2 className="text-lg font-semibold">About this event</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{event.description}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoRow icon={CalendarDays} label="Date" value={event.date} />
                <InfoRow icon={Clock} label="Time" value={event.time} />
                <InfoRow icon={MapPin} label="Venue" value={event.venue} />
                <InfoRow icon={User} label="Organizer" value={event.organizer} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-4 w-4" /> Registrations
                  </span>
                  <span className="font-semibold tabular-nums">{event.registered}/{event.capacity}</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn('h-full rounded-full', pct >= 100 ? 'bg-destructive' : 'bg-primary')}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{pct}% full</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="Registered" value={event.registered} color="bg-primary/10 text-primary" />
        <StatCard icon={CheckCircle2} label="Checked In" value={detail.checkinCount} color="bg-success/10 text-success" />
        <StatCard icon={HandHeart} label="Volunteers" value={detail.volunteerCount} color="bg-warning/10 text-warning" />
        <StatCard icon={Users} label="Capacity" value={event.capacity} color="bg-blue-500/10 text-blue-600 dark:text-blue-400" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Registered Attendees</CardTitle>
          <CardDescription>
            {registeredAttendees.length} attendee{registeredAttendees.length !== 1 ? 's' : ''} registered for this event
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registeredAttendees.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-sm font-medium">No attendees registered yet</p>
              <p className="text-xs text-muted-foreground">Registrations will appear here once available.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attendee</TableHead>
                    <TableHead>QR Status</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registeredAttendees.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={cn('flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white', a.avatarColor)}>
                            {a.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium">{a.name}</p>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Mail className="h-3 w-3" /> {a.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {a.qrGenerated ? (
                          <Badge className="bg-primary/10 text-primary"><QrCode className="mr-1 h-3 w-3" /> Generated</Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {a.checkedIn ? (
                          <Badge className="bg-success/10 text-success"><CheckCircle2 className="mr-1 h-3 w-3" /> Checked In</Badge>
                        ) : (
                          <Badge variant="outline"><XCircle className="mr-1 h-3 w-3" /> Not Checked In</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{a.registeredAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: typeof Users; label: string; value: number; color: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums">{value.toLocaleString()}</p>
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', color)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}

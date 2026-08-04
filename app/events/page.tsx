'use client';

import { useState } from 'react';
import { AppShell } from '@/components/dashboard/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CalendarDays,
  MapPin,
  Clock,
  User,
  Users,
  Search,
  CalendarPlus,
  LayoutGrid,
  List,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { allEvents } from '@/lib/data';

const statusStyles: Record<string, string> = {
  Upcoming: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Ongoing: 'bg-success/10 text-success',
  Completed: 'bg-muted text-muted-foreground',
};

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  const filtered = allEvents.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppShell>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Events Management</h1>
        <p className="text-sm text-muted-foreground">
          Create, manage, and track all your events in one place.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Ongoing">Ongoing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center rounded-lg border">
            <Button
              variant={view === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-9 w-9 rounded-r-none"
              onClick={() => setView('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-9 w-9 rounded-l-none"
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button
            className="gap-2"
            onClick={() => router.push('/events/create')}
          >
            <CalendarPlus className="h-4 w-4" />
            Create Event
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <CalendarDays className="h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-sm font-medium">No events found</p>
          <p className="text-xs text-muted-foreground">Try adjusting your search or filters.</p>
        </Card>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => {
            const pct = Math.round((e.registered / e.capacity) * 100);
            const full = pct >= 100;
            return (
              <Card key={e.id} className="group overflow-hidden transition-all hover:shadow-lg">
                <div className={cn('relative h-28 bg-gradient-to-br', e.banner)}>
                  <div className="absolute inset-0 bg-black/10" />
                  <Badge className={cn('absolute right-3 top-3', statusStyles[e.status])}>
                    {e.status}
                  </Badge>
                  <div className="absolute bottom-3 left-4">
                    <span className="rounded-md bg-black/30 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {e.category}
                    </span>
                  </div>
                </div>
                <CardContent className="space-y-3 p-4">
                  <div>
                    <h3 className="font-semibold leading-tight transition-colors group-hover:text-primary">
                      {e.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{e.description}</p>
                  </div>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5" /> {e.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" /> {e.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" /> {e.venue}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5" /> {e.organizer}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3.5 w-3.5" /> {e.registered}/{e.capacity}
                      </span>
                      <span className={cn('font-medium', full ? 'text-destructive' : 'text-primary')}>
                        {pct}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-700',
                          full ? 'bg-destructive' : 'bg-primary'
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/events/${e.id}`}>View Details</Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => router.push(`/events/${e.id}`)}>Edit</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filtered.map((e) => {
                const pct = Math.round((e.registered / e.capacity) * 100);
                return (
                  <div
                    key={e.id}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-accent/50"
                  >
                    <div className={cn('h-12 w-2 rounded-full bg-gradient-to-b', e.banner)} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate">{e.name}</h3>
                        <Badge className={statusStyles[e.status]}>{e.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {e.date} · {e.time} · {e.venue}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="tabular-nums">{e.registered}/{e.capacity}</span>
                    </div>
                    <div className="hidden lg:block w-32">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn('h-full rounded-full', pct >= 100 ? 'bg-destructive' : 'bg-primary')}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/events/${e.id}`}>View</Link>
                    </Button>
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

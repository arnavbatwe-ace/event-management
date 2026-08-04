'use client';

import { useState, useMemo } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  QrCode,
  CheckCircle2,
  XCircle,
  UserPlus,
  Download,
  ChevronLeft,
  ChevronRight,
  Mail,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { allAttendees, allEvents } from '@/lib/data';
import { toast } from 'sonner';

const PAGE_SIZE = 8;

export default function AttendeesPage() {
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [qrFilter, setQrFilter] = useState('all');
  const [page, setPage] = useState(0);
  const router = useRouter();

  const filtered = useMemo(() => {
    return allAttendees.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase());
      const matchesEvent = eventFilter === 'all' || a.event === eventFilter;
      const matchesQr =
        qrFilter === 'all' ||
        (qrFilter === 'generated' && a.qrGenerated) ||
        (qrFilter === 'pending' && !a.qrGenerated);
      return matchesSearch && matchesEvent && matchesQr;
    });
  }, [search, eventFilter, qrFilter]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <AppShell>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendees</h1>
          <p className="text-sm text-muted-foreground">
            Manage all event attendees, registrations, and check-in status.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => toast('Exporting attendees...', { description: 'Demo action — connect API to enable.' })}>
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2" onClick={() => router.push('/attendees/register')}>
            <UserPlus className="h-4 w-4" /> Register Attendee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Total Attendees</p>
          <p className="mt-1 text-2xl font-bold tabular-nums">{allAttendees.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Checked In</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-success">
            {allAttendees.filter((a) => a.checkedIn).length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">QR Generated</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-primary">
            {allAttendees.filter((a) => a.qrGenerated).length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Pending Check-in</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-warning">
            {allAttendees.filter((a) => !a.checkedIn).length}
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">All Attendees</CardTitle>
              <CardDescription>{filtered.length} records found</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name or email..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                  className="pl-9 w-full sm:w-56"
                />
              </div>
              <Select value={eventFilter} onValueChange={(v) => { setEventFilter(v); setPage(0); }}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="Event" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {allEvents.map((e) => (
                    <SelectItem key={e.id} value={e.name}>{e.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={qrFilter} onValueChange={(v) => { setQrFilter(v); setPage(0); }}>
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="QR Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All QR</SelectItem>
                  <SelectItem value="generated">Generated</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {pageData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-sm font-medium">No attendees found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attendee</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>QR Status</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageData.map((a) => (
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
                        <TableCell className="text-sm text-muted-foreground">{a.phone || '—'}</TableCell>
                        <TableCell className="text-sm">{a.event}</TableCell>
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
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" onClick={() => toast('View attendee — demo', { description: a.name })}>View</Button>
                            <Button variant="ghost" size="sm" onClick={() => toast('Edit attendee — demo', { description: a.name })}>Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => toast('Delete attendee — demo', { description: a.name })}>Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between pt-4">
                <p className="text-xs text-muted-foreground">
                  Page {page + 1} of {Math.max(1, pageCount)} · {filtered.length} total
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 0}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= pageCount - 1}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}

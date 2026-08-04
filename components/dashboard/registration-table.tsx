'use client';

import * as React from 'react';
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  QrCode,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { registrations as initialData, type Registration } from '@/lib/data';

type SortKey = 'name' | 'event' | 'registeredAt';
type SortDir = 'asc' | 'desc';

const initials = (name: string) =>
  name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

export function RegistrationTable() {
  const [query, setQuery] = React.useState('');
  const [eventFilter, setEventFilter] = React.useState('all');
  const [sortKey, setSortKey] = React.useState<SortKey>('registeredAt');
  const [sortDir, setSortDir] = React.useState<SortDir>('desc');
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const events = React.useMemo(
    () => Array.from(new Set(initialData.map((r) => r.event))),
    []
  );

  const filtered = React.useMemo(() => {
    let rows = initialData.filter((r) => {
      const matchesQuery =
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.email.toLowerCase().includes(query.toLowerCase());
      const matchesEvent = eventFilter === 'all' || r.event === eventFilter;
      return matchesQuery && matchesEvent;
    });
    rows = [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = av.localeCompare(bv);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return rows;
  }, [query, eventFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const pageRows = filtered.slice((current - 1) * pageSize, current * pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [query, eventFilter]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />;
    return sortDir === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5" />
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-base">Recent Registrations</CardTitle>
          <CardDescription>{filtered.length} records found</CardDescription>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-full pl-9 sm:w-56"
            />
          </div>
          <Select value={eventFilter} onValueChange={setEventFilter}>
            <SelectTrigger className="h-9 w-full sm:w-48">
              <SelectValue placeholder="Filter by event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All events</SelectItem>
              {events.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-10" />
                <TableHead>
                  <button
                    className="flex items-center gap-1.5 font-medium hover:text-foreground"
                    onClick={() => toggleSort('name')}
                  >
                    Name {sortIcon('name')}
                  </button>
                </TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>
                  <button
                    className="flex items-center gap-1.5 font-medium hover:text-foreground"
                    onClick={() => toggleSort('event')}
                  >
                    Event {sortIcon('event')}
                  </button>
                </TableHead>
                <TableHead className="hidden lg:table-cell">QR</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>
                  <button
                    className="flex items-center gap-1.5 font-medium hover:text-foreground"
                    onClick={() => toggleSort('registeredAt')}
                  >
                    Time {sortIcon('registeredAt')}
                  </button>
                </TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                    No registrations match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                pageRows.map((r: Registration) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn('text-[11px] text-white', r.avatarColor)}>
                          {initials(r.name)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {r.email}
                    </TableCell>
                    <TableCell className="max-w-[180px] truncate text-muted-foreground">
                      {r.event}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {r.qrGenerated ? (
                        <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
                          <QrCode className="h-3 w-3" /> Yes
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          No
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {r.checkedIn ? (
                        <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
                          <CheckCircle2 className="h-3 w-3" /> Checked in
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1 text-muted-foreground">
                          <XCircle className="h-3 w-3" /> Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">{r.registeredAt}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Page {current} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              disabled={current <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              disabled={current >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

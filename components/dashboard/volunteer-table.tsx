'use client';

import { HandHeart, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { volunteers, volunteerSummary, type Volunteer } from '@/lib/data';

const statusStyle: Record<Volunteer['status'], string> = {
  Available: 'bg-success/10 text-success',
  Busy: 'bg-warning/10 text-warning',
  'Off-duty': 'bg-muted text-muted-foreground',
};

const initials = (name: string) =>
  name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

const summaryCards = [
  { label: 'Total Volunteers', value: volunteerSummary.total },
  { label: 'Assigned Today', value: volunteerSummary.assignedToday },
  { label: 'Available', value: volunteerSummary.available },
  { label: 'Busy', value: volunteerSummary.busy },
];

export function VolunteerTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <HandHeart className="h-4 w-4 text-primary" />
          Volunteer Management
        </CardTitle>
        <CardDescription>Team status and assignments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {summaryCards.map((c) => (
            <div key={c.label} className="rounded-xl border bg-muted/30 p-3">
              <p className="text-2xl font-bold tabular-nums">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Volunteer</TableHead>
                <TableHead className="hidden sm:table-cell">Assigned Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn('text-[11px] text-white', v.avatarColor)}>
                          {initials(v.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{v.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden max-w-[180px] truncate text-muted-foreground sm:table-cell">
                    {v.assignedEvent}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn('gap-1', statusStyle[v.status])}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {v.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden items-center gap-1.5 text-muted-foreground md:table-cell">
                    <Phone className="h-3.5 w-3.5" />
                    {v.contact}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

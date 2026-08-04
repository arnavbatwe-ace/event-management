'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  UserPlus,
  Phone,
  CalendarDays,
  Briefcase,
  LayoutGrid,
  List,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { allVolunteers } from '@/lib/data';
import { toast } from 'sonner';

const statusStyles: Record<string, string> = {
  Available: 'bg-success/10 text-success',
  Busy: 'bg-warning/10 text-warning',
  'Off-duty': 'bg-muted text-muted-foreground',
};

export default function VolunteersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  const filtered = allVolunteers.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.assignedEvent.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppShell>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Volunteers</h1>
          <p className="text-sm text-muted-foreground">
            Manage volunteer assignments, roles, and availability.
          </p>
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
          <Button className="gap-2" onClick={() => router.push('/volunteers/register')}>
            <UserPlus className="h-4 w-4" /> Register Volunteer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Total Volunteers</p>
          <p className="mt-1 text-2xl font-bold tabular-nums">{allVolunteers.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Available</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-success">
            {allVolunteers.filter((v) => v.status === 'Available').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Busy</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-warning">
            {allVolunteers.filter((v) => v.status === 'Busy').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Off-duty</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-muted-foreground">
            {allVolunteers.filter((v) => v.status === 'Off-duty').length}
          </p>
        </Card>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search volunteers..."
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
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Busy">Busy</SelectItem>
            <SelectItem value="Off-duty">Off-duty</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-sm font-medium">No volunteers found</p>
          <p className="text-xs text-muted-foreground">Try adjusting your search or filters.</p>
        </Card>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((v) => (
            <Card key={v.id} className="group overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  {v.profilePhoto ? (
                    <img
                      src={v.profilePhoto}
                      alt={v.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className={cn('flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white', v.avatarColor)}>
                      {v.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold leading-tight">{v.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Briefcase className="h-3 w-3" /> {v.role}
                    </p>
                    <Badge className={cn('mt-2', statusStyles[v.status])}>{v.status}</Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 -mt-1 -mr-1">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast('Assign volunteer — demo', { description: v.name })}>
                        Assign
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast('Edit volunteer — demo', { description: v.name })}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => toast('Remove volunteer — demo', { description: v.name })}>
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{v.assignedEvent}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0" /> {v.contact}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => toast('Assign volunteer — demo', { description: v.name })}>
                    Assign
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toast('View profile — demo', { description: v.name })}>
                    Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Assigned Event</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {v.profilePhoto ? (
                            <img src={v.profilePhoto} alt={v.name} className="h-9 w-9 rounded-full object-cover" />
                          ) : (
                            <div className={cn('flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white', v.avatarColor)}>
                              {v.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                          )}
                          <span className="font-medium">{v.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{v.assignedEvent}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{v.role}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{v.contact}</TableCell>
                      <TableCell>
                        <Badge className={statusStyles[v.status]}>{v.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast('Assign volunteer — demo', { description: v.name })}>
                              Assign
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast('Edit volunteer — demo', { description: v.name })}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => toast('Remove volunteer — demo', { description: v.name })}>
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}

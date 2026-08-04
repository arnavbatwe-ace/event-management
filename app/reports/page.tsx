'use client';

import { AppShell } from '@/components/dashboard/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  FileText,
  Download,
  FileSpreadsheet,
  FileType,
  Calendar,
  User,
  Clock,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { monthlyAttendance, eventCategoryData, checkinRateData, reports } from '@/lib/data';
import { toast } from 'sonner';

const reportTypes = [
  { name: 'Attendance Report', icon: FileText, desc: 'Event-wise attendance & check-in rates', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { name: 'Volunteer Report', icon: FileSpreadsheet, desc: 'Hours, assignments & performance', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { name: 'Registration Report', icon: FileType, desc: 'Registration trends & conversion', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
];

const statusStyles: Record<string, string> = {
  Ready: 'bg-success/10 text-success',
  Generating: 'bg-warning/10 text-warning',
  Scheduled: 'bg-muted text-muted-foreground',
};

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
      {label && <p className="mb-1 font-semibold">{label}</p>}
      {payload.map((p: any) => (
        <p key={p.dataKey || p.name} className="flex items-center gap-1.5 text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color || p.payload?.color }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-medium text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Generate, export, and analyze event data across all metrics.
          </p>
        </div>
        <Button className="gap-2" onClick={() => toast('Generating report...', { description: 'Demo action — connect API to enable.' })}>
          <BarChart3 className="h-4 w-4" /> Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {reportTypes.map((r) => (
          <Card key={r.name} className="transition-all hover:shadow-lg">
            <CardContent className="p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${r.color}`}>
                <r.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold">{r.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={() => toast(`Exporting ${r.name} as PDF...`, { description: 'Demo action.' })}>
                  <Download className="h-3.5 w-3.5" /> PDF
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={() => toast(`Exporting ${r.name} as Excel...`, { description: 'Demo action.' })}>
                  <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={() => toast(`Exporting ${r.name} as CSV...`, { description: 'Demo action.' })}>
                  <FileType className="h-3.5 w-3.5" /> CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Monthly Attendance vs Registrations</CardTitle>
            <CardDescription>Year-over-year comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyAttendance} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="attendance" name="Attendance" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <Bar dataKey="registrations" name="Registrations" fill="hsl(var(--chart-3))" radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Event Category Distribution</CardTitle>
            <CardDescription>Events by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={eventCategoryData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3} stroke="none">
                  {eventCategoryData.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Check-in Rate by Event</CardTitle>
            <CardDescription>Percentage of registered attendees checked in</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={checkinRateData} layout="vertical" margin={{ left: 20, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                <YAxis type="category" dataKey="event" tickLine={false} axisLine={false} fontSize={11} stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
                <Bar dataKey="rate" name="Check-in %" fill="hsl(var(--chart-2))" radius={[0, 6, 6, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Generated Reports</CardTitle>
          <CardDescription>Recently generated and scheduled reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {reports.map((r) => (
              <div
                key={r.id}
                className="flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {r.type}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {r.period}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {r.generatedBy}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {r.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{r.size}</span>
                  <Badge className={statusStyles[r.status]}>{r.status}</Badge>
                  <Button variant="outline" size="sm" className="gap-1.5" disabled={r.status !== 'Ready'} onClick={() => toast(`Downloading ${r.name}...`, { description: 'Demo action.' })}>
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}

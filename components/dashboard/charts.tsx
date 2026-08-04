'use client';

import * as React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  attendanceTrend,
  eventAttendance,
  volunteerDistribution,
  registrationTrend,
} from '@/lib/data';

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-1.5 text-muted-foreground">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: p.color || p.payload?.color }}
          />
          <span className="capitalize">{p.name}:</span>
          <span className="font-medium text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export function AttendanceTrendChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base">Attendance Trend</CardTitle>
          <CardDescription>Weekly attendance vs registrations</CardDescription>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-chart-1" /> Attendance
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-chart-3" /> Registrations
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={attendanceTrend} margin={{ left: -16, right: 8, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2.5}
              dot={{ r: 3, fill: 'hsl(var(--chart-1))' }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="registrations"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2.5}
              dot={{ r: 3, fill: 'hsl(var(--chart-3))' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function VolunteerDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Volunteer Distribution</CardTitle>
        <CardDescription>Allocation by team</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={volunteerDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              stroke="none"
            >
              {volunteerDistribution.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function EventAttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Event-wise Attendance</CardTitle>
        <CardDescription>Attendance across recent events</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={eventAttendance} margin={{ left: -16, right: 8, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="event" tickLine={false} axisLine={false} fontSize={11} stroke="hsl(var(--muted-foreground))" />
            <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
            <Bar dataKey="attendance" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function RegistrationTrendChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base">Registration Trend</CardTitle>
        <CardDescription>Daily registrations over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={registrationTrend} margin={{ left: -16, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.35} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="registrations"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2.5}
              fill="url(#regGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

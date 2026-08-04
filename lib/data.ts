import type { LucideIcon } from 'lucide-react';
import {
  CalendarDays,
  Users,
  HandHeart,
  QrCode,
  UserPlus,
  Activity,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Completed';

export interface EventItem {
  id: string;
  name: string;
  banner: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  capacity: number;
  registered: number;
  status: EventStatus;
}

export interface Registration {
  id: string;
  name: string;
  email: string;
  phone?: string;
  event: string;
  qrGenerated: boolean;
  checkedIn: boolean;
  registeredAt: string;
  avatarColor: string;
}

export interface Volunteer {
  id: string;
  name: string;
  assignedEvent: string;
  status: 'Available' | 'Busy' | 'Off-duty';
  contact: string;
  avatarColor: string;
  profilePhoto?: string;
  role?: string;
}

export interface ActivityItem {
  id: string;
  type:
    | 'registered'
    | 'scanned'
    | 'volunteer'
    | 'event_created'
    | 'event_updated'
    | 'cancelled';
  message: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  category: 'registration' | 'reminder' | 'volunteer' | 'checkin' | 'system';
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  icon: LucideIcon;
  accent: string;
}

export const stats: StatItem[] = [
  {
    id: 'total-events',
    label: 'Total Events',
    value: 128,
    change: 12.5,
    trend: 'up',
    icon: CalendarDays,
    accent: 'text-primary bg-primary/10',
  },
  {
    id: 'total-attendees',
    label: 'Total Attendees',
    value: 8420,
    change: 8.2,
    trend: 'up',
    icon: Users,
    accent: 'text-success bg-success/10',
  },
  {
    id: 'volunteers',
    label: 'Registered Volunteers',
    value: 342,
    change: 5.1,
    trend: 'up',
    icon: HandHeart,
    accent: 'text-warning bg-warning/10',
  },
  {
    id: 'checkins',
    label: 'Live Check-ins',
    value: 1284,
    change: 3.4,
    trend: 'up',
    icon: QrCode,
    accent: 'text-primary bg-primary/10',
  },
  {
    id: 'pending',
    label: 'Pending Registrations',
    value: 96,
    change: 4.7,
    trend: 'down',
    icon: UserPlus,
    accent: 'text-destructive bg-destructive/10',
  },
  {
    id: 'running-today',
    label: 'Events Running Today',
    value: 7,
    change: 2.0,
    trend: 'up',
    icon: Activity,
    accent: 'text-success bg-success/10',
  },
];

export const todayEvents: EventItem[] = [
  {
    id: 'e1',
    name: 'TechFest 2026 — Opening Keynote',
    banner: 'from-blue-500 to-cyan-400',
    date: 'Aug 1, 2026',
    time: '09:00 — 11:00',
    venue: 'Main Auditorium, Block A',
    organizer: 'Dr. Amelia Hart',
    capacity: 500,
    registered: 472,
    status: 'Ongoing',
  },
  {
    id: 'e2',
    name: 'AI & Robotics Workshop',
    banner: 'from-emerald-500 to-teal-400',
    date: 'Aug 1, 2026',
    time: '11:30 — 13:30',
    venue: 'Innovation Lab 2',
    organizer: 'Prof. Liam Carter',
    capacity: 120,
    registered: 118,
    status: 'Upcoming',
  },
  {
    id: 'e3',
    name: 'Hackathon Kickoff Night',
    banner: 'from-orange-500 to-amber-400',
    date: 'Aug 1, 2026',
    time: '18:00 — 22:00',
    venue: 'Grand Hall, Campus Center',
    organizer: 'Maya Rodriguez',
    capacity: 300,
    registered: 300,
    status: 'Upcoming',
  },
  {
    id: 'e4',
    name: 'Community Cleanup Drive',
    banner: 'from-rose-500 to-pink-400',
    date: 'Aug 1, 2026',
    time: '07:00 — 09:00',
    venue: 'Riverside Park, North Gate',
    organizer: 'Green Earth NGO',
    capacity: 80,
    registered: 64,
    status: 'Completed',
  },
];

export const registrations: Registration[] = [
  {
    id: 'r1',
    name: 'Sophia Bennett',
    email: 'sophia.bennett@university.edu',
    phone: '+1 (415) 555-0112',
    event: 'TechFest 2026 — Opening Keynote',
    qrGenerated: true,
    checkedIn: true,
    registeredAt: '08:42 AM',
    avatarColor: 'bg-blue-500',
  },
  {
    id: 'r2',
    name: 'Ethan Wright',
    email: 'ethan.wright@university.edu',
    phone: '+1 (415) 555-0118',
    event: 'AI & Robotics Workshop',
    qrGenerated: true,
    checkedIn: false,
    registeredAt: '08:35 AM',
    avatarColor: 'bg-emerald-500',
  },
  {
    id: 'r3',
    name: 'Olivia Hayes',
    email: 'olivia.hayes@university.edu',
    phone: '+1 (415) 555-0144',
    event: 'Hackathon Kickoff Night',
    qrGenerated: false,
    checkedIn: false,
    registeredAt: '08:21 AM',
    avatarColor: 'bg-orange-500',
  },
  {
    id: 'r4',
    name: 'Noah Patel',
    email: 'noah.patel@university.edu',
    phone: '+1 (415) 555-0156',
    event: 'TechFest 2026 — Opening Keynote',
    qrGenerated: true,
    checkedIn: true,
    registeredAt: '08:18 AM',
    avatarColor: 'bg-rose-500',
  },
  {
    id: 'r5',
    name: 'Ava Mitchell',
    email: 'ava.mitchell@university.edu',
    phone: '+1 (415) 555-0167',
    event: 'Community Cleanup Drive',
    qrGenerated: true,
    checkedIn: true,
    registeredAt: '07:52 AM',
    avatarColor: 'bg-violet-500',
  },
  {
    id: 'r6',
    name: 'James Foster',
    email: 'james.foster@university.edu',
    phone: '+1 (415) 555-0173',
    event: 'AI & Robotics Workshop',
    qrGenerated: false,
    checkedIn: false,
    registeredAt: '07:40 AM',
    avatarColor: 'bg-cyan-500',
  },
  {
    id: 'r7',
    name: 'Isabella Reyes',
    email: 'isabella.reyes@university.edu',
    phone: '+1 (415) 555-0189',
    event: 'Hackathon Kickoff Night',
    qrGenerated: true,
    checkedIn: false,
    registeredAt: '07:31 AM',
    avatarColor: 'bg-amber-500',
  },
  {
    id: 'r8',
    name: 'Mason Cole',
    email: 'mason.cole@university.edu',
    phone: '+1 (415) 555-0145',
    event: 'TechFest 2026 — Opening Keynote',
    qrGenerated: true,
    checkedIn: true,
    registeredAt: '07:22 AM',
    avatarColor: 'bg-teal-500',
  },
  {
    id: 'r9',
    name: 'Mia Sanders',
    email: 'mia.sanders@university.edu',
    phone: '+1 (415) 555-0133',
    event: 'Community Cleanup Drive',
    qrGenerated: true,
    checkedIn: true,
    registeredAt: '07:10 AM',
    avatarColor: 'bg-indigo-500',
  },
  {
    id: 'r10',
    name: 'Lucas Brooks',
    email: 'lucas.brooks@university.edu',
    phone: '+1 (415) 555-0198',
    event: 'AI & Robotics Workshop',
    qrGenerated: false,
    checkedIn: false,
    registeredAt: '06:58 AM',
    avatarColor: 'bg-pink-500',
  },
];

export const volunteers: Volunteer[] = [
  {
    id: 'v1',
    name: 'Charlotte Nguyen',
    assignedEvent: 'TechFest 2026 — Opening Keynote',
    status: 'Busy',
    contact: '+1 (415) 555-0142',
    avatarColor: 'bg-blue-500',
  },
  {
    id: 'v2',
    name: 'Daniel Kim',
    assignedEvent: 'AI & Robotics Workshop',
    status: 'Available',
    contact: '+1 (415) 555-0188',
    avatarColor: 'bg-emerald-500',
  },
  {
    id: 'v3',
    name: 'Grace Thompson',
    assignedEvent: 'Hackathon Kickoff Night',
    status: 'Busy',
    contact: '+1 (415) 555-0173',
    avatarColor: 'bg-orange-500',
  },
  {
    id: 'v4',
    name: 'Henry Walker',
    assignedEvent: '—',
    status: 'Off-duty',
    contact: '+1 (415) 555-0129',
    avatarColor: 'bg-rose-500',
  },
  {
    id: 'v5',
    name: 'Zoe Edwards',
    assignedEvent: 'Community Cleanup Drive',
    status: 'Available',
    contact: '+1 (415) 555-0167',
    avatarColor: 'bg-violet-500',
  },
];

export const activityFeed: ActivityItem[] = [
  {
    id: 'a1',
    type: 'scanned',
    message: 'QR code scanned — Sophia Bennett checked in to TechFest 2026',
    timestamp: '2 min ago',
  },
  {
    id: 'a2',
    type: 'registered',
    message: 'New attendee registered — Ethan Wright joined AI & Robotics Workshop',
    timestamp: '5 min ago',
  },
  {
    id: 'a3',
    type: 'volunteer',
    message: 'Volunteer checked in — Charlotte Nguyen at Main Auditorium',
    timestamp: '9 min ago',
  },
  {
    id: 'a4',
    type: 'event_updated',
    message: 'Event updated — Hackathon Kickoff Night capacity raised to 300',
    timestamp: '14 min ago',
  },
  {
    id: 'a5',
    type: 'event_created',
    message: 'Event created — "Community Cleanup Drive" published by Green Earth NGO',
    timestamp: '22 min ago',
  },
  {
    id: 'a6',
    type: 'cancelled',
    message: 'Registration cancelled — Lucas Brooks withdrew from AI & Robotics Workshop',
    timestamp: '31 min ago',
  },
  {
    id: 'a7',
    type: 'scanned',
    message: 'QR code scanned — Noah Patel checked in to TechFest 2026',
    timestamp: '38 min ago',
  },
];

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    category: 'registration',
    title: 'New registration',
    description: 'Isabella Reyes registered for Hackathon Kickoff Night',
    time: '3 min ago',
    unread: true,
  },
  {
    id: 'n2',
    category: 'reminder',
    title: 'Event starting soon',
    description: 'AI & Robotics Workshop begins in 25 minutes',
    time: '12 min ago',
    unread: true,
  },
  {
    id: 'n3',
    category: 'volunteer',
    title: 'Volunteer update',
    description: 'Daniel Kim is now available for assignment',
    time: '24 min ago',
    unread: true,
  },
  {
    id: 'n4',
    category: 'checkin',
    title: 'Check-in alert',
    description: 'TechFest 2026 has reached 90% check-in capacity',
    time: '40 min ago',
    unread: false,
  },
  {
    id: 'n5',
    category: 'system',
    title: 'System notification',
    description: 'Scheduled maintenance window tonight at 02:00 UTC',
    time: '1 hr ago',
    unread: false,
  },
];

export const attendanceTrend = [
  { day: 'Mon', attendance: 420, registrations: 180 },
  { day: 'Tue', attendance: 510, registrations: 240 },
  { day: 'Wed', attendance: 680, registrations: 320 },
  { day: 'Thu', attendance: 590, registrations: 290 },
  { day: 'Fri', attendance: 820, registrations: 410 },
  { day: 'Sat', attendance: 1040, registrations: 520 },
  { day: 'Sun', attendance: 940, registrations: 480 },
];

export const eventAttendance = [
  { event: 'TechFest', attendance: 472 },
  { event: 'AI Workshop', attendance: 118 },
  { event: 'Hackathon', attendance: 300 },
  { event: 'Cleanup', attendance: 64 },
  { event: 'Career Fair', attendance: 210 },
  { event: 'Panel Talk', attendance: 156 },
];

export const volunteerDistribution = [
  { name: 'Logistics', value: 86, color: 'hsl(var(--chart-1))' },
  { name: 'Registration', value: 72, color: 'hsl(var(--chart-2))' },
  { name: 'Tech Support', value: 64, color: 'hsl(var(--chart-3))' },
  { name: 'Hospitality', value: 58, color: 'hsl(var(--chart-4))' },
  { name: 'Security', value: 62, color: 'hsl(var(--chart-5))' },
];

export const registrationTrend = [
  { day: 'Mon', registrations: 120 },
  { day: 'Tue', registrations: 190 },
  { day: 'Wed', registrations: 260 },
  { day: 'Thu', registrations: 230 },
  { day: 'Fri', registrations: 380 },
  { day: 'Sat', registrations: 470 },
  { day: 'Sun', registrations: 410 },
];

export const qrMonitor = {
  successful: 1284,
  failed: 23,
  pending: 14,
  recent: [
    { id: 'q1', code: 'EVT-A042', attendee: 'Sophia Bennett', status: 'success', time: '08:42:11' },
    { id: 'q2', code: 'EVT-A043', attendee: 'Noah Patel', status: 'success', time: '08:41:55' },
    { id: 'q3', code: 'EVT-A044', attendee: 'Unknown', status: 'failed', time: '08:41:30' },
    { id: 'q4', code: 'EVT-A045', attendee: 'Ava Mitchell', status: 'success', time: '08:40:12' },
    { id: 'q5', code: 'EVT-A046', attendee: 'Pending scan', status: 'pending', time: '08:39:48' },
  ],
};

export const systemHealth = [
  { id: 's1', label: 'Backend API', status: 'operational' as const, detail: '47 ms response' },
  { id: 's2', label: 'Database', status: 'operational' as const, detail: '99.98% uptime' },
  { id: 's3', label: 'Socket.io Connection', status: 'operational' as const, detail: '128 clients' },
  { id: 's4', label: 'Local Server', status: 'degraded' as const, detail: 'High load 78%' },
  { id: 's5', label: 'Internet Connectivity', status: 'operational' as const, detail: '1.2 Gbps' },
  { id: 's6', label: 'Last Synchronization', status: 'operational' as const, detail: '12 sec ago' },
];

export const volunteerSummary = {
  total: 342,
  assignedToday: 128,
  available: 96,
  busy: 118,
};

export const heroStats = {
  activeEventsToday: 7,
  todayRegistrations: 184,
  todayCheckins: 312,
};

export const allEvents: (EventItem & { category: string; description: string })[] = [
  {
    id: 'e1',
    name: 'TechFest 2026 — Opening Keynote',
    banner: 'from-blue-500 to-cyan-400',
    date: 'Aug 1, 2026',
    time: '09:00 — 11:00',
    venue: 'Main Auditorium, Block A',
    organizer: 'Dr. Amelia Hart',
    capacity: 500,
    registered: 472,
    status: 'Ongoing',
    category: 'Conference',
    description: 'Annual tech festival opening keynote featuring industry leaders.',
  },
  {
    id: 'e2',
    name: 'AI & Robotics Workshop',
    banner: 'from-emerald-500 to-teal-400',
    date: 'Aug 1, 2026',
    time: '11:30 — 13:30',
    venue: 'Innovation Lab 2',
    organizer: 'Prof. Liam Carter',
    capacity: 120,
    registered: 118,
    status: 'Upcoming',
    category: 'Workshop',
    description: 'Hands-on workshop on AI and robotics integration.',
  },
  {
    id: 'e3',
    name: 'Hackathon Kickoff Night',
    banner: 'from-orange-500 to-amber-400',
    date: 'Aug 1, 2026',
    time: '18:00 — 22:00',
    venue: 'Grand Hall, Campus Center',
    organizer: 'Maya Rodriguez',
    capacity: 300,
    registered: 300,
    status: 'Upcoming',
    category: 'Hackathon',
    description: '36-hour hackathon kickoff with team formation and prizes.',
  },
  {
    id: 'e4',
    name: 'Community Cleanup Drive',
    banner: 'from-rose-500 to-pink-400',
    date: 'Aug 1, 2026',
    time: '07:00 — 09:00',
    venue: 'Riverside Park, North Gate',
    organizer: 'Green Earth NGO',
    capacity: 80,
    registered: 64,
    status: 'Completed',
    category: 'Community',
    description: 'Community volunteer drive to clean Riverside Park.',
  },
  {
    id: 'e5',
    name: 'Career Fair 2026',
    banner: 'from-violet-500 to-purple-400',
    date: 'Aug 5, 2026',
    time: '10:00 — 16:00',
    venue: 'Sports Complex',
    organizer: 'Career Services',
    capacity: 1000,
    registered: 780,
    status: 'Upcoming',
    category: 'Career',
    description: 'Annual career fair with 50+ companies recruiting.',
  },
  {
    id: 'e6',
    name: 'Research Symposium',
    banner: 'from-cyan-500 to-blue-400',
    date: 'Aug 8, 2026',
    time: '09:00 — 17:00',
    venue: 'Science Block, Hall C',
    organizer: 'Dr. Noah Bennett',
    capacity: 200,
    registered: 156,
    status: 'Upcoming',
    category: 'Academic',
    description: 'Postgraduate research poster presentations and talks.',
  },
  {
    id: 'e7',
    name: 'Startup Pitch Day',
    banner: 'from-amber-500 to-yellow-400',
    date: 'Aug 12, 2026',
    time: '14:00 — 18:00',
    venue: 'Innovation Hub',
    organizer: 'Entrepreneurship Cell',
    capacity: 150,
    registered: 92,
    status: 'Upcoming',
    category: 'Business',
    description: 'Student startups pitch to investors and accelerators.',
  },
  {
    id: 'e8',
    name: 'Cultural Night',
    banner: 'from-pink-500 to-rose-400',
    date: 'Jul 28, 2026',
    time: '18:00 — 21:00',
    venue: 'Open Air Theatre',
    organizer: 'Cultural Committee',
    capacity: 800,
    registered: 800,
    status: 'Completed',
    category: 'Cultural',
    description: 'Annual cultural night with performances and food stalls.',
  },
];

export const allAttendees: Registration[] = [
  ...registrations,
  {
    id: 'r11',
    name: 'Ethan Hunt',
    email: 'ethan.hunt@university.edu',
    phone: '+1 (415) 555-0177',
    event: 'Career Fair 2026',
    qrGenerated: true,
    checkedIn: false,
    registeredAt: '06:45 AM',
    avatarColor: 'bg-sky-500',
  },
  {
    id: 'r12',
    name: 'Chloe Anderson',
    email: 'chloe.anderson@university.edu',
    phone: '+1 (415) 555-0162',
    event: 'Research Symposium',
    qrGenerated: true,
    checkedIn: false,
    registeredAt: '06:30 AM',
    avatarColor: 'bg-lime-500',
  },
  {
    id: 'r13',
    name: 'Daniel Radcliffe',
    email: 'daniel.r@university.edu',
    phone: '+1 (415) 555-0184',
    event: 'Startup Pitch Day',
    qrGenerated: false,
    checkedIn: false,
    registeredAt: '06:15 AM',
    avatarColor: 'bg-fuchsia-500',
  },
  {
    id: 'r14',
    name: 'Emma Stone',
    email: 'emma.stone@university.edu',
    phone: '+1 (415) 555-0191',
    event: 'Cultural Night',
    qrGenerated: true,
    checkedIn: true,
    registeredAt: '05:50 AM',
    avatarColor: 'bg-red-500',
  },
];

export const allVolunteers: (Volunteer & { role: string })[] = [
  {
    id: 'v1',
    name: 'Charlotte Nguyen',
    assignedEvent: 'TechFest 2026 — Opening Keynote',
    status: 'Busy',
    contact: '+1 (415) 555-0142',
    avatarColor: 'bg-blue-500',
    role: 'Team Lead',
  },
  {
    id: 'v2',
    name: 'Daniel Kim',
    assignedEvent: 'AI & Robotics Workshop',
    status: 'Available',
    contact: '+1 (415) 555-0188',
    avatarColor: 'bg-emerald-500',
    role: 'Logistics',
  },
  {
    id: 'v3',
    name: 'Grace Thompson',
    assignedEvent: 'Hackathon Kickoff Night',
    status: 'Busy',
    contact: '+1 (415) 555-0173',
    avatarColor: 'bg-orange-500',
    profilePhoto: 'https://i.pravatar.cc/150?img=5',
    role: 'Registration',
  },
  {
    id: 'v4',
    name: 'Henry Walker',
    assignedEvent: '—',
    status: 'Off-duty',
    contact: '+1 (415) 555-0129',
    avatarColor: 'bg-rose-500',
    role: 'Tech Support',
  },
  {
    id: 'v5',
    name: 'Zoe Edwards',
    assignedEvent: 'Community Cleanup Drive',
    status: 'Available',
    contact: '+1 (415) 555-0167',
    avatarColor: 'bg-violet-500',
    role: 'Hospitality',
  },
  {
    id: 'v6',
    name: 'Mason Allen',
    assignedEvent: 'Career Fair 2026',
    status: 'Available',
    contact: '+1 (415) 555-0192',
    avatarColor: 'bg-cyan-500',
    role: 'Security',
  },
  {
    id: 'v7',
    name: 'Lily Chen',
    assignedEvent: 'Research Symposium',
    status: 'Busy',
    contact: '+1 (415) 555-0155',
    avatarColor: 'bg-amber-500',
    role: 'Logistics',
  },
  {
    id: 'v8',
    name: 'Oscar Martinez',
    assignedEvent: 'Startup Pitch Day',
    status: 'Available',
    contact: '+1 (415) 555-0148',
    avatarColor: 'bg-teal-500',
    role: 'Tech Support',
  },
];

export interface ReportItem {
  id: string;
  name: string;
  type: 'Attendance' | 'Volunteer' | 'Registration';
  period: string;
  generatedBy: string;
  date: string;
  status: 'Ready' | 'Generating' | 'Scheduled';
  size: string;
}

export const reports: ReportItem[] = [
  {
    id: 'rep1',
    name: 'TechFest 2026 — Attendance Report',
    type: 'Attendance',
    period: 'Aug 2026',
    generatedBy: 'System',
    date: 'Aug 1, 2026',
    status: 'Ready',
    size: '2.4 MB',
  },
  {
    id: 'rep2',
    name: 'Q2 Volunteer Hours Report',
    type: 'Volunteer',
    period: 'Apr — Jun 2026',
    generatedBy: 'Alex Harper',
    date: 'Jul 15, 2026',
    status: 'Ready',
    size: '1.8 MB',
  },
  {
    id: 'rep3',
    name: 'Monthly Registration Summary',
    type: 'Registration',
    period: 'Jul 2026',
    generatedBy: 'System',
    date: 'Aug 1, 2026',
    status: 'Generating',
    size: '—',
  },
  {
    id: 'rep4',
    name: 'Hackathon Check-in Report',
    type: 'Attendance',
    period: 'Aug 1, 2026',
    generatedBy: 'Maya Rodriguez',
    date: 'Aug 1, 2026',
    status: 'Scheduled',
    size: '—',
  },
  {
    id: 'rep5',
    name: 'Volunteer Allocation Report',
    type: 'Volunteer',
    period: 'Aug 2026',
    generatedBy: 'System',
    date: 'Aug 1, 2026',
    status: 'Ready',
    size: '3.1 MB',
  },
];

export const monthlyAttendance = [
  { month: 'Jan', attendance: 3200, registrations: 2800 },
  { month: 'Feb', attendance: 4100, registrations: 3500 },
  { month: 'Mar', attendance: 5200, registrations: 4600 },
  { month: 'Apr', attendance: 4800, registrations: 4200 },
  { month: 'May', attendance: 6100, registrations: 5400 },
  { month: 'Jun', attendance: 7200, registrations: 6100 },
  { month: 'Jul', attendance: 8400, registrations: 7200 },
  { month: 'Aug', attendance: 5900, registrations: 4800 },
];

export const eventCategoryData = [
  { name: 'Conference', value: 32, color: 'hsl(var(--chart-1))' },
  { name: 'Workshop', value: 28, color: 'hsl(var(--chart-2))' },
  { name: 'Hackathon', value: 18, color: 'hsl(var(--chart-3))' },
  { name: 'Community', value: 22, color: 'hsl(var(--chart-4))' },
  { name: 'Career', value: 28, color: 'hsl(var(--chart-5))' },
];

export const checkinRateData = [
  { event: 'TechFest', rate: 94 },
  { event: 'AI Workshop', rate: 98 },
  { event: 'Hackathon', rate: 100 },
  { event: 'Cleanup', rate: 80 },
  { event: 'Career Fair', rate: 78 },
  { event: 'Symposium', rate: 78 },
];

export const eventDetailStats: Record<string, { volunteerCount: number; checkinCount: number }> = {
  e1: { volunteerCount: 12, checkinCount: 445 },
  e2: { volunteerCount: 5, checkinCount: 0 },
  e3: { volunteerCount: 18, checkinCount: 0 },
  e4: { volunteerCount: 8, checkinCount: 64 },
  e5: { volunteerCount: 22, checkinCount: 0 },
  e6: { volunteerCount: 6, checkinCount: 0 },
  e7: { volunteerCount: 4, checkinCount: 0 },
  e8: { volunteerCount: 15, checkinCount: 800 },
};

export const settingsSections = [
  { id: 'profile', label: 'Profile', icon: 'UserCircle' },
  { id: 'organization', label: 'Organization', icon: 'Building2' },
  { id: 'theme', label: 'Theme', icon: 'Palette' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell' },
  { id: 'security', label: 'Security', icon: 'ShieldCheck' },
];

export { TrendingUp, TrendingDown };

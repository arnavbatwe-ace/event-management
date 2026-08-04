'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/dashboard/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CalendarPlus,
  Upload,
  ArrowLeft,
  Image as ImageIcon,
  CalendarDays,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const categories = [
  'Conference', 'Workshop', 'Hackathon', 'Community', 'Career', 'Academic', 'Cultural', 'Business',
];

const statuses = ['Upcoming', 'Ongoing', 'Completed'];

interface FormData {
  name: string;
  description: string;
  category: string;
  organizer: string;
  venue: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  capacity: string;
  deadline: string;
  status: string;
}

const initialForm: FormData = {
  name: '', description: '', category: '', organizer: '', venue: '',
  startDate: '', endDate: '', startTime: '', endTime: '', capacity: '', deadline: '', status: 'Upcoming',
};

export default function CreateEventPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [bannerName, setBannerName] = useState('');

  const set = (key: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = 'Event name is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.category) e.category = 'Please select a category';
    if (!form.organizer.trim()) e.organizer = 'Organizer name is required';
    if (!form.venue.trim()) e.venue = 'Venue is required';
    if (!form.startDate) e.startDate = 'Start date is required';
    if (!form.endDate) e.endDate = 'End date is required';
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      e.endDate = 'End date cannot be before start date';
    if (!form.startTime) e.startTime = 'Start time is required';
    if (!form.endTime) e.endTime = 'End time is required';
    if (!form.capacity) e.capacity = 'Capacity is required';
    else if (Number(form.capacity) < 1) e.capacity = 'Capacity must be at least 1';
    if (!form.deadline) e.deadline = 'Registration deadline is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form', { description: 'Required fields are marked below.' });
      return;
    }
    toast.success('Event created successfully', {
      description: `${form.name} has been added to your events.`,
    });
    router.push('/events');
  };

  return (
    <AppShell>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push('/events')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Event</h1>
          <p className="text-sm text-muted-foreground">Fill in the details below to create a new event.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarPlus className="h-5 w-5 text-primary" /> Basic Information
                </CardTitle>
                <CardDescription>Core event details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Event Name <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="e.g., TechFest 2026 Opening Keynote"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Event Description <span className="text-destructive">*</span></Label>
                  <Textarea
                    placeholder="Describe what this event is about..."
                    rows={4}
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                  />
                  {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Event Category <span className="text-destructive">*</span></Label>
                    <Select value={form.category} onValueChange={(v) => set('category', v)}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Event Status <span className="text-destructive">*</span></Label>
                    <Select value={form.status} onValueChange={(v) => set('status', v)}>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Organizer Name <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="e.g., Dr. Amelia Hart"
                    value={form.organizer}
                    onChange={(e) => set('organizer', e.target.value)}
                  />
                  {errors.organizer && <p className="text-xs text-destructive">{errors.organizer}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Venue & Schedule
                </CardTitle>
                <CardDescription>When and where the event takes place</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Venue <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="e.g., Main Auditorium, Block A"
                    value={form.venue}
                    onChange={(e) => set('venue', e.target.value)}
                  />
                  {errors.venue && <p className="text-xs text-destructive">{errors.venue}</p>}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date <span className="text-destructive">*</span></Label>
                    <Input type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} />
                    {errors.startDate && <p className="text-xs text-destructive">{errors.startDate}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>End Date <span className="text-destructive">*</span></Label>
                    <Input type="date" value={form.endDate} onChange={(e) => set('endDate', e.target.value)} />
                    {errors.endDate && <p className="text-xs text-destructive">{errors.endDate}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Time <span className="text-destructive">*</span></Label>
                    <Input type="time" value={form.startTime} onChange={(e) => set('startTime', e.target.value)} />
                    {errors.startTime && <p className="text-xs text-destructive">{errors.startTime}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>End Time <span className="text-destructive">*</span></Label>
                    <Input type="time" value={form.endTime} onChange={(e) => set('endTime', e.target.value)} />
                    {errors.endTime && <p className="text-xs text-destructive">{errors.endTime}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" /> Capacity & Registration
                </CardTitle>
                <CardDescription>Set limits and deadlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Maximum Capacity <span className="text-destructive">*</span></Label>
                  <Input
                    type="number"
                    placeholder="e.g., 500"
                    value={form.capacity}
                    onChange={(e) => set('capacity', e.target.value)}
                  />
                  {errors.capacity && <p className="text-xs text-destructive">{errors.capacity}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Registration Deadline <span className="text-destructive">*</span></Label>
                  <Input type="date" value={form.deadline} onChange={(e) => set('deadline', e.target.value)} />
                  {errors.deadline && <p className="text-xs text-destructive">{errors.deadline}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" /> Event Banner
                </CardTitle>
                <CardDescription>Upload a banner image</CardDescription>
              </CardHeader>
              <CardContent>
                <label
                  className={cn(
                    'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer',
                    bannerName ? 'border-primary/40 bg-primary/5' : 'border-muted hover:border-primary/30'
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Upload className="h-6 w-6" />
                  </div>
                  {bannerName ? (
                    <div>
                      <p className="text-sm font-medium text-primary">{bannerName}</p>
                      <p className="text-xs text-muted-foreground mt-1">Click to replace</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium">Click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        setBannerName(f.name);
                        toast.success('Banner uploaded', { description: f.name });
                      }
                    }}
                  />
                </label>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preview</CardTitle>
                <CardDescription>How your event card will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-4">
                  <div className={cn(
                    'mb-3 h-20 rounded-lg bg-gradient-to-br',
                    form.category ? 'from-primary/20 to-primary/5' : 'from-muted to-muted/50'
                  )} />
                  <h3 className="font-semibold text-sm">{form.name || 'Event Name'}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {form.description || 'Event description will appear here...'}
                  </p>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {form.venue && <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {form.venue}</p>}
                    {form.startDate && <p className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3" /> {form.startDate}</p>}
                    {form.startTime && <p className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {form.startTime}{form.endTime && ` — ${form.endTime}`}</p>}
                    {form.capacity && <p className="flex items-center gap-1.5"><Users className="h-3 w-3" /> Capacity: {form.capacity}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 gap-2">
                <CalendarPlus className="h-4 w-4" /> Create Event
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push('/events')}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </AppShell>
  );
}

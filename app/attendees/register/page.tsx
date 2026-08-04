'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/dashboard/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ArrowLeft,
  UserPlus,
  QrCode,
  CheckCircle2,
  Mail,
  Phone,
  Building,
  Hash,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { allEvents } from '@/lib/data';
import { toast } from 'sonner';

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate'];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  rollNumber: string;
  gender: string;
  event: string;
}

const initialForm: FormData = {
  fullName: '', email: '', phone: '', college: '', department: '', year: '', rollNumber: '', gender: '', event: '',
};

export default function RegisterAttendeePage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.college.trim()) e.college = 'College name is required';
    if (!form.department.trim()) e.department = 'Department is required';
    if (!form.year) e.year = 'Please select a year';
    if (!form.rollNumber.trim()) e.rollNumber = 'Roll number is required';
    if (!form.gender) e.gender = 'Please select gender';
    if (!form.event) e.event = 'Please select an event';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form', { description: 'Required fields are marked below.' });
      return;
    }
    setSubmitted(true);
    toast.success('Registration successful', {
      description: `${form.fullName} has been registered for ${form.event}.`,
    });
  };

  if (submitted) {
    return (
      <AppShell>
        <Card className="mx-auto max-w-2xl">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h2 className="mt-6 text-xl font-bold">Registration Successful</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {form.fullName} has been registered for {form.event}.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5">
                <QrCode className="h-32 w-32 text-primary/40" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  QR Code Preview
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                This QR code will be emailed to {form.email}
              </p>
            </div>

            <div className="mt-8 flex gap-2">
              <Button onClick={() => { setForm(initialForm); setSubmitted(false); }} className="gap-2">
                <UserPlus className="h-4 w-4" /> Register Another
              </Button>
              <Button variant="outline" onClick={() => router.push('/attendees')}>
                Back to Attendees
              </Button>
            </div>
          </CardContent>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push('/attendees')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Register Attendee</h1>
          <p className="text-sm text-muted-foreground">Fill in attendee details to register for an event.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" /> Personal Information
                </CardTitle>
                <CardDescription>Attendee's personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g., Sophia Patel" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
                  {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Email <span className="text-destructive">*</span></Label>
                    <Input type="email" placeholder="e.g., sophia@university.edu" value={form.email} onChange={(e) => set('email', e.target.value)} />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number <span className="text-destructive">*</span></Label>
                    <Input placeholder="e.g., +1 (415) 555-0100" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Gender <span className="text-destructive">*</span></Label>
                  <RadioGroup
                    value={form.gender}
                    onValueChange={(v) => set('gender', v)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Male" id="male" />
                      <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Female" id="female" />
                      <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Other" id="other" />
                      <Label htmlFor="other" className="font-normal cursor-pointer">Other</Label>
                    </div>
                  </RadioGroup>
                  {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" /> Academic Information
                </CardTitle>
                <CardDescription>College and department details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>College <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g., State University" value={form.college} onChange={(e) => set('college', e.target.value)} />
                  {errors.college && <p className="text-xs text-destructive">{errors.college}</p>}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Department <span className="text-destructive">*</span></Label>
                    <Input placeholder="e.g., Computer Science" value={form.department} onChange={(e) => set('department', e.target.value)} />
                    {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Year <span className="text-destructive">*</span></Label>
                    <Select value={form.year} onValueChange={(v) => set('year', v)}>
                      <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                      <SelectContent>
                        {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.year && <p className="text-xs text-destructive">{errors.year}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Roll Number <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g., CS2026001" value={form.rollNumber} onChange={(e) => set('rollNumber', e.target.value)} />
                  {errors.rollNumber && <p className="text-xs text-destructive">{errors.rollNumber}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" /> Event Selection
                </CardTitle>
                <CardDescription>Choose which event to register for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Event <span className="text-destructive">*</span></Label>
                  <Select value={form.event} onValueChange={(v) => set('event', v)}>
                    <SelectTrigger><SelectValue placeholder="Choose an event" /></SelectTrigger>
                    <SelectContent>
                      {allEvents.map((e) => (
                        <SelectItem key={e.id} value={e.name}>{e.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.event && <p className="text-xs text-destructive">{errors.event}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" /> QR Code Preview
                </CardTitle>
                <CardDescription>Generated after registration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={cn(
                  'relative flex aspect-square items-center justify-center rounded-xl border-2 border-dashed transition-colors',
                  form.event ? 'border-primary/30 bg-primary/5' : 'border-muted bg-muted/20'
                )}>
                  <div className="flex flex-col items-center gap-3 text-center">
                    <QrCode className={cn('h-24 w-24', form.event ? 'text-primary/40' : 'text-muted-foreground/30')} />
                    <p className="text-xs text-muted-foreground">
                      {form.event ? 'QR will be generated on submit' : 'Select an event first'}
                    </p>
                  </div>
                </div>
                {form.fullName && (
                  <div className="mt-4 space-y-2 rounded-lg border p-3">
                    <p className="text-xs font-semibold text-muted-foreground">Registration Summary</p>
                    <div className="space-y-1.5 text-xs">
                      <p className="flex items-center gap-1.5"><Mail className="h-3 w-3 text-muted-foreground" /> {form.email}</p>
                      <p className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-muted-foreground" /> {form.phone}</p>
                      <p className="flex items-center gap-1.5"><Building className="h-3 w-3 text-muted-foreground" /> {form.department}</p>
                      <p className="flex items-center gap-1.5"><Hash className="h-3 w-3 text-muted-foreground" /> {form.rollNumber}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 gap-2">
                <UserPlus className="h-4 w-4" /> Register
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push('/attendees')}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </AppShell>
  );
}

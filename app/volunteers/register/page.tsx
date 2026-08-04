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
  ArrowLeft,
  UserPlus,
  Mail,
  Phone,
  Briefcase,
  Shield,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { allEvents } from '@/lib/data';
import { toast } from 'sonner';

const roles = ['Team Lead', 'Logistics', 'Registration', 'Tech Support', 'Hospitality', 'Security'];
const availabilities = ['Full-time', 'Part-time', 'Weekends Only', 'Event Day Only'];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  skills: string;
  preferredRole: string;
  assignedEvent: string;
  availability: string;
  emergencyContact: string;
}

const initialForm: FormData = {
  fullName: '', email: '', phone: '', department: '', skills: '', preferredRole: '',
  assignedEvent: '', availability: '', emergencyContact: '',
};

export default function RegisterVolunteerPage() {
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
    if (!form.department.trim()) e.department = 'Department is required';
    if (!form.skills.trim()) e.skills = 'Please list at least one skill';
    if (!form.preferredRole) e.preferredRole = 'Please select a preferred role';
    if (!form.availability) e.availability = 'Please select availability';
    if (!form.emergencyContact.trim()) e.emergencyContact = 'Emergency contact is required';
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
    toast.success('Volunteer registered successfully', {
      description: `${form.fullName} has been added as a volunteer.`,
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
            <h2 className="mt-6 text-xl font-bold">Volunteer Registered</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {form.fullName} has been successfully registered as a volunteer
              {form.assignedEvent ? ` for ${form.assignedEvent}` : ''}.
            </p>
            <div className="mt-8 flex gap-2">
              <Button onClick={() => { setForm(initialForm); setSubmitted(false); }} className="gap-2">
                <UserPlus className="h-4 w-4" /> Register Another
              </Button>
              <Button variant="outline" onClick={() => router.push('/volunteers')}>
                Back to Volunteers
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
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push('/volunteers')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Register Volunteer</h1>
          <p className="text-sm text-muted-foreground">Add a new volunteer to your team.</p>
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
                <CardDescription>Volunteer's personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g., Charlotte Nguyen" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
                  {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Email <span className="text-destructive">*</span></Label>
                    <Input type="email" placeholder="e.g., charlotte@university.edu" value={form.email} onChange={(e) => set('email', e.target.value)} />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number <span className="text-destructive">*</span></Label>
                    <Input placeholder="e.g., +1 (415) 555-0142" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Department <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g., Computer Science" value={form.department} onChange={(e) => set('department', e.target.value)} />
                  {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" /> Skills & Role
                </CardTitle>
                <CardDescription>What can this volunteer do?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Skills <span className="text-destructive">*</span></Label>
                  <Textarea
                    placeholder="e.g., Photography, Crowd Management, First Aid, Public Speaking..."
                    rows={3}
                    value={form.skills}
                    onChange={(e) => set('skills', e.target.value)}
                  />
                  {errors.skills && <p className="text-xs text-destructive">{errors.skills}</p>}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Preferred Role <span className="text-destructive">*</span></Label>
                    <Select value={form.preferredRole} onValueChange={(v) => set('preferredRole', v)}>
                      <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.preferredRole && <p className="text-xs text-destructive">{errors.preferredRole}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Assigned Event</Label>
                    <Select value={form.assignedEvent} onValueChange={(v) => set('assignedEvent', v)}>
                      <SelectTrigger><SelectValue placeholder="Optional — assign later" /></SelectTrigger>
                      <SelectContent>
                        {allEvents.map((e) => <SelectItem key={e.id} value={e.name}>{e.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Availability <span className="text-destructive">*</span></Label>
                  <Select value={form.availability} onValueChange={(v) => set('availability', v)}>
                    <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                    <SelectContent>
                      {availabilities.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.availability && <p className="text-xs text-destructive">{errors.availability}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> Emergency Contact
                </CardTitle>
                <CardDescription>For safety purposes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Emergency Contact <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g., John Nguyen — +1 (415) 555-0199" value={form.emergencyContact} onChange={(e) => set('emergencyContact', e.target.value)} />
                  {errors.emergencyContact && <p className="text-xs text-destructive">{errors.emergencyContact}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
                <CardDescription>Review before submitting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <SummaryRow icon={Mail} label="Email" value={form.email} />
                  <SummaryRow icon={Phone} label="Phone" value={form.phone} />
                  <SummaryRow icon={Briefcase} label="Role" value={form.preferredRole} />
                  <SummaryRow icon={Calendar} label="Event" value={form.assignedEvent || 'Not assigned'} />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 gap-2">
                <UserPlus className="h-4 w-4" /> Register
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push('/volunteers')}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </AppShell>
  );
}

function SummaryRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium truncate">{value || '—'}</p>
      </div>
    </div>
  );
}

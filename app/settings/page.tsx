'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { AppShell } from '@/components/dashboard/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  UserCircle,
  Building2,
  Palette,
  Bell,
  ShieldCheck,
  Save,
  Moon,
  Sun,
  Monitor,
  KeyRound,
  Smartphone,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const sections = [
  { id: 'profile', label: 'Profile', icon: UserCircle },
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: ShieldCheck },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('profile');
  const [notifSettings, setNotifSettings] = useState({
    email: true,
    push: true,
    registrations: true,
    reminders: true,
    volunteers: false,
    checkins: true,
    system: true,
  });

  const toggleNotif = (key: keyof typeof notifSettings) => {
    setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AppShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile, organization, theme, and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap',
                active === s.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <s.icon className="h-4 w-4 shrink-0" />
              {s.label}
            </button>
          ))}
        </nav>

        <div>
          {active === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      AH
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="mt-2 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Alex Harper" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue="alex.harper@eventops.io" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input defaultValue="Administrator" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue="+1 (415) 555-0100" />
                  </div>
                </div>
                <Button className="gap-2" onClick={() => toast('Profile saved successfully')}>
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          )}

          {active === 'organization' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Organization Settings</CardTitle>
                <CardDescription>Manage your organization details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Organization Name</Label>
                    <Input defaultValue="EventOps University" />
                  </div>
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <Input defaultValue="https://eventops.university.edu" />
                  </div>
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input defaultValue="Education" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Input defaultValue="UTC-08:00 (Pacific Time)" />
                  </div>
                </div>
                <Button className="gap-2" onClick={() => toast('Organization saved successfully')}>
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          )}

          {active === 'theme' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Theme Settings</CardTitle>
                <CardDescription>Customize the appearance of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'light', label: 'Light', icon: Sun },
                    { value: 'dark', label: 'Dark', icon: Moon },
                    { value: 'system', label: 'System', icon: Monitor },
                  ].map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTheme(t.value)}
                      className={cn(
                        'flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all',
                        theme === t.value
                          ? 'border-primary bg-primary/5'
                          : 'border-muted hover:border-primary/30'
                      )}
                    >
                      <t.icon className="h-8 w-8" />
                      <span className="text-sm font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {active === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notification Preferences</CardTitle>
                <CardDescription>Choose what you want to be notified about</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {[
                  { key: 'email' as const, label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'push' as const, label: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'registrations' as const, label: 'New Registrations', desc: 'When someone registers for an event' },
                  { key: 'reminders' as const, label: 'Event Reminders', desc: 'Reminders before events start' },
                  { key: 'volunteers' as const, label: 'Volunteer Updates', desc: 'Changes to volunteer assignments' },
                  { key: 'checkins' as const, label: 'Check-in Alerts', desc: 'QR check-in activity' },
                  { key: 'system' as const, label: 'System Messages', desc: 'System health and maintenance' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between border-b py-4 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifSettings[item.key]}
                      onCheckedChange={() => toggleNotif(item.key)}
                    />
                  </div>
                ))}
                <div className="pt-4">
                  <Button className="gap-2" onClick={() => toast('Notification preferences saved')}>
                    <Save className="h-4 w-4" /> Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {active === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button className="gap-2" onClick={() => toast('Password updated successfully')}>
                    <KeyRound className="h-4 w-4" /> Update Password
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Login Alerts</p>
                        <p className="text-xs text-muted-foreground">Get notified on new logins</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm font-medium">Active Sessions</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium">MacBook Pro · Chrome</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA · Active now</p>
                      </div>
                      <Badge className="bg-success/10 text-success">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium">iPhone 15 · Safari</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA · 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}

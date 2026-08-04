'use client';

import {
  AttendanceTrendChart,
  EventAttendanceChart,
  VolunteerDistributionChart,
  RegistrationTrendChart,
} from '@/components/dashboard/charts';

export function ChartsSection() {
  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <AttendanceTrendChart />
      <VolunteerDistributionChart />
      <RegistrationTrendChart />
      <EventAttendanceChart />
    </section>
  );
}

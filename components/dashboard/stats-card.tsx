'use client';

import * as React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import type { StatItem } from '@/lib/data';

interface StatsCardProps {
  stat: StatItem;
  index?: number;
}

export function StatsCard({ stat, index = 0 }: StatsCardProps) {
  const Icon = stat.icon;
  const positive = stat.trend === 'up';

  return (
    <Card
      className={cn(
        'group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        'animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
      <div className="flex items-start justify-between">
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', stat.accent)}>
          <Icon className="h-5 w-5" />
        </div>
        <div
          className={cn(
            'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold',
            positive
              ? 'bg-success/10 text-success'
              : 'bg-destructive/10 text-destructive'
          )}
        >
          {positive ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          {stat.change}%
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold tracking-tight tabular-nums">
          {stat.value.toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700',
            positive ? 'bg-success' : 'bg-destructive'
          )}
          style={{ width: `${Math.min(100, Math.max(20, stat.change * 8))}%` }}
        />
      </div>
    </Card>
  );
}

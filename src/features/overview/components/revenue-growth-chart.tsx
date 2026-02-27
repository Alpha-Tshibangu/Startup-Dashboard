'use client';

import * as React from 'react';
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { revenueGrowthData } from '@/lib/startup-metrics-data';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(220, 70%, 50%)'
  },
  target: {
    label: 'Target',
    color: 'hsl(45, 70%, 55%)'
  },
  lastYear: {
    label: 'Last Year',
    color: 'hsl(220, 70%, 65%)'
  }
} satisfies ChartConfig;

interface RevenueGrowthChartProps {}

export function RevenueGrowthChart({}: RevenueGrowthChartProps) {
  const totalRevenue = revenueGrowthData.reduce(
    (acc, curr) => acc + curr.revenue,
    0
  );
  const avgMonthly = totalRevenue / revenueGrowthData.length;
  const yoyGrowth = (
    ((revenueGrowthData[11].revenue - revenueGrowthData[11].lastYear) /
      revenueGrowthData[11].lastYear) *
    100
  ).toFixed(1);

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>Industry Revenue Growth</CardTitle>
          <CardDescription>
            Aggregate monthly performance across surveyed startups
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='mb-4 grid grid-cols-3 gap-4'>
          <div>
            <p className='text-muted-foreground text-sm'>Total Revenue</p>
            <p className='text-2xl font-bold'>
              ${(totalRevenue / 1000000).toFixed(2)}M
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Avg Monthly</p>
            <p className='text-2xl font-bold'>
              ${(avgMonthly / 1000).toFixed(0)}K
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>YoY Growth</p>
            <p className='text-2xl font-bold'>
              <span className='text-green-600'>+{yoyGrowth}%</span>
            </p>
          </div>
        </div>
        <ChartContainer config={chartConfig} className='h-[300px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={revenueGrowthData}>
              <defs>
                <linearGradient
                  id='revenueGradient'
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop
                    offset='0%'
                    stopColor='var(--primary)'
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='100%'
                    stopColor='var(--primary)'
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis dataKey='month' tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}K`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      `$${((value as number) / 1000).toFixed(0)}K`
                    }
                  />
                }
              />
              <Legend />
              <Line
                type='monotone'
                dataKey='revenue'
                stroke='var(--color-revenue)'
                strokeWidth={3}
                dot={{ r: 4, fill: 'var(--color-revenue)' }}
                activeDot={{ r: 6, fill: 'var(--color-revenue)' }}
              />
              <Line
                type='monotone'
                dataKey='target'
                stroke='var(--color-target)'
                strokeDasharray='5 5'
                strokeWidth={2}
                dot={false}
              />
              <Line
                type='monotone'
                dataKey='lastYear'
                stroke='var(--color-lastYear)'
                strokeWidth={2}
                dot={false}
                opacity={0.7}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

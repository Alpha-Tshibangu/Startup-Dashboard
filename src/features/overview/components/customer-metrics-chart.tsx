'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
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
import { customerMetricsData } from '@/lib/startup-metrics-data';

const chartConfig = {
  total: {
    label: 'Total Customers',
    color: 'hsl(220, 70%, 50%)'
  },
  newCustomers: {
    label: 'New Customers',
    color: 'hsl(45, 70%, 55%)'
  },
  churned: {
    label: 'Churned',
    color: 'hsl(220, 70%, 65%)'
  }
} satisfies ChartConfig;

interface CustomerMetricsChartProps {}

export function CustomerMetricsChart({}: CustomerMetricsChartProps) {
  const totalCustomers =
    customerMetricsData[customerMetricsData.length - 1].total;
  const totalNew = customerMetricsData.reduce(
    (acc, curr) => acc + curr.newCustomers,
    0
  );
  const totalChurned = customerMetricsData.reduce(
    (acc, curr) => acc + curr.churned,
    0
  );
  const avgChurn = ((totalChurned / totalCustomers) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>Industry Customer Trends</CardTitle>
          <CardDescription>
            Aggregate acquisition and retention patterns
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='mb-4 grid grid-cols-4 gap-4'>
          <div>
            <p className='text-muted-foreground text-sm'>Total</p>
            <p className='text-2xl font-bold'>
              {totalCustomers.toLocaleString()}
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>New (YTD)</p>
            <p className='text-2xl font-bold'>
              <span className='text-white'>+</span>
              {totalNew}
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Churned</p>
            <p className='text-2xl font-bold'>
              <span className='text-white'>-</span>
              {totalChurned}
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Churn Rate</p>
            <p className='text-2xl font-bold'>{avgChurn}%</p>
          </div>
        </div>
        <ChartContainer config={chartConfig} className='h-[300px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={customerMetricsData}>
              <defs>
                <linearGradient id='totalGradient' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='0%'
                    stopColor='var(--color-total)'
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='100%'
                    stopColor='var(--color-total)'
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id='newGradient' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='0%'
                    stopColor='var(--color-newCustomers)'
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='100%'
                    stopColor='var(--color-newCustomers)'
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis dataKey='month' tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Area
                type='monotoneX'
                dataKey='total'
                stroke='var(--color-total)'
                fill='url(#totalGradient)'
                strokeWidth={2}
              />
              <Area
                type='monotoneX'
                dataKey='newCustomers'
                stroke='var(--color-newCustomers)'
                fill='url(#newGradient)'
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

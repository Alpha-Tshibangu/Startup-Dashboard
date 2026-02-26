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
import { IconEye } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

const chartConfig = {
  total: {
    label: 'Total Customers',
    color: 'hsl(var(--primary))'
  },
  newCustomers: {
    label: 'New Customers',
    color: 'hsl(var(--success))'
  },
  churned: {
    label: 'Churned',
    color: 'hsl(var(--destructive))'
  }
} satisfies ChartConfig;

interface CustomerMetricsChartProps {
  onExpand?: () => void;
}

export function CustomerMetricsChart({ onExpand }: CustomerMetricsChartProps) {
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
    <Card className='col-span-4'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>Customer Acquisition & Retention</CardTitle>
          <CardDescription>Customer growth and churn metrics</CardDescription>
        </div>
        {onExpand && (
          <Button variant='ghost' size='icon' onClick={onExpand}>
            <IconEye className='h-4 w-4' />
          </Button>
        )}
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
            <p className='text-2xl font-bold text-green-600'>+{totalNew}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Churned</p>
            <p className='text-2xl font-bold text-red-600'>-{totalChurned}</p>
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
                    stopColor='hsl(var(--primary))'
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='100%'
                    stopColor='hsl(var(--primary))'
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id='newGradient' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='0%'
                    stopColor='hsl(var(--success))'
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='100%'
                    stopColor='hsl(var(--success))'
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
                type='monotone'
                dataKey='total'
                stroke='hsl(var(--primary))'
                fill='url(#totalGradient)'
                strokeWidth={2}
              />
              <Area
                type='monotone'
                dataKey='newCustomers'
                stroke='hsl(var(--success))'
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

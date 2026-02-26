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
import { IconEye } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))'
  },
  target: {
    label: 'Target',
    color: 'hsl(var(--muted-foreground))'
  },
  lastYear: {
    label: 'Last Year',
    color: 'hsl(var(--secondary))'
  }
} satisfies ChartConfig;

interface RevenueGrowthChartProps {
  onExpand?: () => void;
}

export function RevenueGrowthChart({ onExpand }: RevenueGrowthChartProps) {
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
    <Card className='col-span-4'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>Revenue Growth Trajectory</CardTitle>
          <CardDescription>
            Monthly revenue vs target and prior year
          </CardDescription>
        </div>
        {onExpand && (
          <Button variant='ghost' size='icon' onClick={onExpand}>
            <IconEye className='h-4 w-4' />
          </Button>
        )}
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
            <p className='text-2xl font-bold text-green-600'>+{yoyGrowth}%</p>
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
                stroke='hsl(var(--primary))'
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type='monotone'
                dataKey='target'
                stroke='hsl(var(--muted-foreground))'
                strokeDasharray='5 5'
                strokeWidth={2}
                dot={false}
              />
              <Line
                type='monotone'
                dataKey='lastYear'
                stroke='hsl(var(--secondary))'
                strokeWidth={1}
                dot={false}
                opacity={0.6}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

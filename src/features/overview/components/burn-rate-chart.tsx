'use client';

import * as React from 'react';
import {
  Bar,
  BarChart,
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
import { burnRateData } from '@/lib/startup-metrics-data';

const chartConfig = {
  burn: {
    label: 'Total Burn',
    color: 'hsl(220, 70%, 50%)'
  },
  revenue: {
    label: 'Revenue',
    color: 'hsl(45, 70%, 55%)'
  },
  netBurn: {
    label: 'Net Burn',
    color: 'hsl(220, 70%, 65%)'
  }
} satisfies ChartConfig;

interface BurnRateChartProps {}

export function BurnRateChart({}: BurnRateChartProps) {
  const currentBurn = burnRateData[burnRateData.length - 1].burn;
  const currentNetBurn = burnRateData[burnRateData.length - 1].netBurn;
  const avgBurn =
    burnRateData.reduce((acc, curr) => acc + curr.burn, 0) /
    burnRateData.length;
  const runway = 8100000 / currentNetBurn;

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>Industry Burn Rate Trends</CardTitle>
          <CardDescription>
            Aggregate spend patterns and runway analysis
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='mb-4 grid grid-cols-3 gap-4'>
          <div>
            <p className='text-muted-foreground text-sm'>Current Burn</p>
            <p className='text-xl font-bold'>
              ${(currentBurn / 1000).toFixed(0)}K
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Net Burn</p>
            <p className='text-xl font-bold'>
              ${(currentNetBurn / 1000).toFixed(0)}K
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Runway</p>
            <p className='text-xl font-bold'>{runway.toFixed(0)} mo</p>
          </div>
        </div>
        <ChartContainer config={chartConfig} className='h-[250px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={burnRateData}>
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
              <Bar
                dataKey='burn'
                fill='var(--color-burn)'
                opacity={0.8}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey='revenue'
                fill='var(--color-revenue)'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

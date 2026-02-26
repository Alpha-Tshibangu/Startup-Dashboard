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
import { IconEye } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

const chartConfig = {
  burn: {
    label: 'Total Burn',
    color: 'hsl(var(--destructive))'
  },
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))'
  },
  netBurn: {
    label: 'Net Burn',
    color: 'hsl(var(--warning))'
  }
} satisfies ChartConfig;

interface BurnRateChartProps {
  onExpand?: () => void;
}

export function BurnRateChart({ onExpand }: BurnRateChartProps) {
  const currentBurn = burnRateData[burnRateData.length - 1].burn;
  const currentNetBurn = burnRateData[burnRateData.length - 1].netBurn;
  const avgBurn =
    burnRateData.reduce((acc, curr) => acc + curr.burn, 0) /
    burnRateData.length;
  const runway = 8100000 / currentNetBurn;

  return (
    <Card className='col-span-4 md:col-span-3'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>Burn Rate Analysis</CardTitle>
          <CardDescription>
            Monthly burn rate and runway projection
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
            <p className='text-muted-foreground text-sm'>Current Burn</p>
            <p className='text-xl font-bold text-red-600'>
              ${(currentBurn / 1000).toFixed(0)}K
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Net Burn</p>
            <p className='text-xl font-bold text-orange-600'>
              ${(currentNetBurn / 1000).toFixed(0)}K
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Runway</p>
            <p className='text-xl font-bold text-green-600'>
              {runway.toFixed(0)} mo
            </p>
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
                fill='hsl(var(--destructive))'
                opacity={0.6}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey='revenue'
                fill='hsl(var(--primary))'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

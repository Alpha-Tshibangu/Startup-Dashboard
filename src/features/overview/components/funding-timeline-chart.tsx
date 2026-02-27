'use client';

import * as React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
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
import { fundingRoundsData } from '@/lib/startup-metrics-data';

const chartConfig = {
  amount: {
    label: 'Funding Amount',
    color: 'hsl(220, 70%, 50%)'
  },
  valuation: {
    label: 'Valuation',
    color: 'hsl(45, 70%, 55%)'
  }
} satisfies ChartConfig;

interface FundingTimelineChartProps {}

export function FundingTimelineChart({}: FundingTimelineChartProps) {
  const totalRaised = fundingRoundsData.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const latestValuation =
    fundingRoundsData[fundingRoundsData.length - 1].valuation;
  const multipleX = (latestValuation / totalRaised).toFixed(1);

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>Funding Timeline</CardTitle>
          <CardDescription>Funding rounds and valuation growth</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='mb-4 grid grid-cols-3 gap-4'>
          <div>
            <p className='text-muted-foreground text-sm'>Total Raised</p>
            <p className='text-xl font-bold'>
              ${(totalRaised / 1000000).toFixed(1)}M
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Valuation</p>
            <p className='text-xl font-bold'>
              ${(latestValuation / 1000000).toFixed(0)}M
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Multiple</p>
            <p className='text-xl font-bold'>
              <span className='text-green-600'>{multipleX}x</span>
            </p>
          </div>
        </div>
        <ChartContainer config={chartConfig} className='h-[250px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={fundingRoundsData}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis dataKey='round' tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000000}M`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      `$${((value as number) / 1000000).toFixed(1)}M`
                    }
                  />
                }
              />
              <Bar
                dataKey='amount'
                fill='var(--color-amount)'
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className='mt-4 space-y-2'>
          {fundingRoundsData.map((round, index) => (
            <div
              key={index}
              className='flex items-center justify-between text-sm'
            >
              <span className='font-medium'>{round.round}</span>
              <span className='text-muted-foreground'>{round.date}</span>
              <span className='font-bold'>
                ${(round.amount / 1000000).toFixed(1)}M
              </span>
              <span className='text-muted-foreground'>
                Val: ${(round.valuation / 1000000).toFixed(0)}M
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

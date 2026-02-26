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
import { IconEye } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

const chartConfig = {
  amount: {
    label: 'Funding Amount',
    color: 'hsl(var(--primary))'
  },
  valuation: {
    label: 'Valuation',
    color: 'hsl(var(--secondary))'
  }
} satisfies ChartConfig;

interface FundingTimelineChartProps {
  onExpand?: () => void;
}

export function FundingTimelineChart({ onExpand }: FundingTimelineChartProps) {
  const totalRaised = fundingRoundsData.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const latestValuation =
    fundingRoundsData[fundingRoundsData.length - 1].valuation;
  const multipleX = (latestValuation / totalRaised).toFixed(1);

  return (
    <Card className='col-span-4 md:col-span-3'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>Funding Timeline</CardTitle>
          <CardDescription>Funding rounds and valuation growth</CardDescription>
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
            <p className='text-xl font-bold text-green-600'>{multipleX}x</p>
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
                fill='hsl(var(--primary))'
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

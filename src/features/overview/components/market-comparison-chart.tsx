'use client';

import * as React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
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
import { marketComparisonData } from '@/lib/startup-metrics-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const radarData = [
  { metric: 'Revenue', yourStartup: 75, industryAvg: 65, leader: 100 },
  { metric: 'Growth Rate', yourStartup: 85, industryAvg: 70, leader: 75 },
  { metric: 'Customers', yourStartup: 60, industryAvg: 70, leader: 95 },
  { metric: 'Efficiency', yourStartup: 80, industryAvg: 75, leader: 85 },
  { metric: 'Market Share', yourStartup: 45, industryAvg: 50, leader: 90 },
  { metric: 'Innovation', yourStartup: 90, industryAvg: 65, leader: 80 }
];

const chartConfig = {
  yourStartup: {
    label: 'Case Study',
    color: 'hsl(220, 70%, 50%)'
  },
  industryAvg: {
    label: 'Industry Avg',
    color: 'hsl(45, 70%, 55%)'
  },
  leader: {
    label: 'Market Leader',
    color: 'hsl(220, 70%, 65%)'
  }
} satisfies ChartConfig;

interface MarketComparisonChartProps {}

export function MarketComparisonChart({}: MarketComparisonChartProps) {
  const [activeTab, setActiveTab] = React.useState('radar');

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>Startup Performance Comparison</CardTitle>
          <CardDescription>
            Benchmarking across leading tech startups
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='radar'>Performance Radar</TabsTrigger>
            <TabsTrigger value='table'>Comparison Table</TabsTrigger>
          </TabsList>

          <TabsContent value='radar' className='mt-4'>
            <ChartContainer config={chartConfig} className='h-[350px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <RadarChart data={radarData}>
                  <PolarGrid stroke='hsl(var(--border))' />
                  <PolarAngleAxis dataKey='metric' />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Radar
                    name='Case Study'
                    dataKey='yourStartup'
                    stroke='var(--color-yourStartup)'
                    fill='var(--color-yourStartup)'
                    fillOpacity={0.3}
                  />
                  <Radar
                    name='Industry Avg'
                    dataKey='industryAvg'
                    stroke='var(--color-industryAvg)'
                    fill='var(--color-industryAvg)'
                    fillOpacity={0.2}
                  />
                  <Radar
                    name='Market Leader'
                    dataKey='leader'
                    stroke='var(--color-leader)'
                    fill='var(--color-leader)'
                    fillOpacity={0.1}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value='table' className='mt-4'>
            <div className='space-y-4'>
              <div className='rounded-lg border'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b'>
                      <th className='p-2 text-left text-sm font-medium'>
                        Company
                      </th>
                      <th className='p-2 text-right text-sm font-medium'>
                        Revenue
                      </th>
                      <th className='p-2 text-right text-sm font-medium'>
                        Growth
                      </th>
                      <th className='p-2 text-right text-sm font-medium'>
                        Customers
                      </th>
                      <th className='p-2 text-right text-sm font-medium'>
                        Valuation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketComparisonData.map((company, index) => (
                      <tr key={index} className='border-b'>
                        <td className='p-2 text-sm font-medium'>
                          {company.company}
                          {company.company === 'Case Study' && (
                            <span className='text-primary ml-2 text-xs'>
                              (Example)
                            </span>
                          )}
                        </td>
                        <td className='p-2 text-right text-sm'>
                          ${(company.revenue / 1000000).toFixed(1)}M
                        </td>
                        <td className='p-2 text-right text-sm'>
                          <span
                            className={
                              company.growth > 25 ? 'text-green-600' : ''
                            }
                          >
                            {company.growth}%
                          </span>
                        </td>
                        <td className='p-2 text-right text-sm'>
                          {company.customers.toLocaleString()}
                        </td>
                        <td className='p-2 text-right text-sm'>
                          ${company.valuation}M
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='bg-muted/50 grid grid-cols-2 gap-4 rounded-lg border p-4'>
                <div>
                  <p className='text-muted-foreground text-sm'>
                    Median Position
                  </p>
                  <p className='text-lg font-bold'>3rd of 5</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm'>
                    Growth Potential
                  </p>
                  <p className='text-lg font-bold text-green-600'>
                    +45% upside
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

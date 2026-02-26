'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import { RecentSales } from './recent-sales';
import { RevenueGrowthChart } from './revenue-growth-chart';
import { BurnRateChart } from './burn-rate-chart';
import { CustomerMetricsChart } from './customer-metrics-chart';
import { FundingTimelineChart } from './funding-timeline-chart';
import { MarketComparisonChart } from './market-comparison-chart';
import { CohortRetentionChart } from './cohort-retention-chart';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconCurrencyDollar,
  IconUsers,
  IconFlame,
  IconRocket,
  IconEye,
  IconMaximize
} from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { mockStartupMetrics } from '@/lib/startup-metrics-data';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

export default function OverViewPage() {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const metrics = mockStartupMetrics;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Startup Performance Dashboard
          </h2>
          <div className='hidden items-center space-x-2 md:flex'>
            <Button>Export Report</Button>
          </div>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Financial Metrics</TabsTrigger>
            <TabsTrigger value='analytics'>Growth Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription className='flex items-center gap-1'>
                    <IconCurrencyDollar className='size-4' />
                    Annual Recurring Revenue
                  </CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {formatCurrency(metrics.revenue.arr)}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline' className='text-green-600'>
                      <IconTrendingUp className='size-3' />+
                      {metrics.revenue.growth}%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    MRR: {formatCurrency(metrics.revenue.mrr)}
                  </div>
                  <div className='text-muted-foreground'>
                    Year-over-year growth rate
                  </div>
                </CardFooter>
              </Card>
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription className='flex items-center gap-1'>
                    <IconFlame className='size-4' />
                    Monthly Burn Rate
                  </CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {formatCurrency(metrics.financials.burnRate)}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline' className='text-orange-600'>
                      {metrics.financials.runway} months
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Runway: {metrics.financials.runway} months
                  </div>
                  <div className='text-muted-foreground'>
                    Cash flow:{' '}
                    {formatCurrency(Math.abs(metrics.financials.cashFlow))}
                  </div>
                </CardFooter>
              </Card>
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription className='flex items-center gap-1'>
                    <IconUsers className='size-4' />
                    Active Customers
                  </CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {metrics.customers.active.toLocaleString()}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline' className='text-blue-600'>
                      {metrics.customers.churnRate}% churn
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    LTV/CAC:{' '}
                    {(metrics.customers.ltv / metrics.customers.cac).toFixed(1)}
                    x
                  </div>
                  <div className='text-muted-foreground'>
                    Payback: {metrics.customers.paybackPeriod} months
                  </div>
                </CardFooter>
              </Card>
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription className='flex items-center gap-1'>
                    <IconRocket className='size-4' />
                    Company Valuation
                  </CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {formatCurrency(metrics.funding.valuation)}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline' className='text-purple-600'>
                      {metrics.funding.currentRound}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Raised: {formatCurrency(metrics.funding.totalRaised)}
                  </div>
                  <div className='text-muted-foreground'>
                    {metrics.funding.investors} investors
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <RevenueGrowthChart
                onExpand={() => setSelectedChart('revenue')}
              />
              <BurnRateChart onExpand={() => setSelectedChart('burn')} />
              <CustomerMetricsChart
                onExpand={() => setSelectedChart('customers')}
              />
              <FundingTimelineChart
                onExpand={() => setSelectedChart('funding')}
              />
              <MarketComparisonChart
                onExpand={() => setSelectedChart('market')}
              />
              <CohortRetentionChart
                onExpand={() => setSelectedChart('cohort')}
              />
            </div>
          </TabsContent>
          <TabsContent value='analytics' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <div className='col-span-4'>
                <BarGraph />
              </div>
              <Card className='col-span-4 md:col-span-3'>
                <RecentSales />
              </Card>
              <div className='col-span-4'>
                <AreaGraph />
              </div>
              <MarketComparisonChart
                onExpand={() => setSelectedChart('market')}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog
        open={!!selectedChart}
        onOpenChange={() => setSelectedChart(null)}
      >
        <DialogContent className='max-w-6xl'>
          <DialogHeader>
            <DialogTitle>
              {selectedChart === 'revenue' && 'Revenue Growth Analysis'}
              {selectedChart === 'burn' && 'Burn Rate & Runway Details'}
              {selectedChart === 'customers' && 'Customer Metrics Deep Dive'}
              {selectedChart === 'funding' && 'Funding History & Valuation'}
              {selectedChart === 'market' && 'Market Position & Competition'}
              {selectedChart === 'cohort' && 'Cohort Retention Analysis'}
            </DialogTitle>
          </DialogHeader>
          <div className='mt-4'>
            {selectedChart === 'revenue' && <RevenueGrowthChart />}
            {selectedChart === 'burn' && <BurnRateChart />}
            {selectedChart === 'customers' && <CustomerMetricsChart />}
            {selectedChart === 'funding' && <FundingTimelineChart />}
            {selectedChart === 'market' && <MarketComparisonChart />}
            {selectedChart === 'cohort' && <CohortRetentionChart />}
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}

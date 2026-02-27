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
  IconRocket
} from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { mockStartupMetrics } from '@/lib/startup-metrics-data';
export default function OverViewPage() {
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
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Startup Industry Report
            </h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              Financial performance analysis across tech startups
            </p>
          </div>
          <div className='hidden items-center space-x-2 md:flex'>
            <Button variant='outline'>Export Report</Button>
          </div>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Industry Overview</TabsTrigger>
            <TabsTrigger value='analytics'>Market Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-6'>
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription className='flex items-center gap-1'>
                    <IconCurrencyDollar className='size-4' />
                    Industry Avg ARR
                  </CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {formatCurrency(metrics.revenue.arr)}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='secondary'>
                      <IconTrendingUp className='size-3' />+
                      {metrics.revenue.growth}%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Avg MRR: {formatCurrency(metrics.revenue.mrr)}
                  </div>
                  <div className='text-muted-foreground'>
                    Growth rate across surveyed startups
                  </div>
                </CardFooter>
              </Card>
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription className='flex items-center gap-1'>
                    <IconFlame className='size-4' />
                    Avg Burn Rate
                  </CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {formatCurrency(metrics.financials.burnRate)}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='secondary'>
                      {metrics.financials.runway} mo runway
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Median runway: {metrics.financials.runway} months
                  </div>
                  <div className='text-muted-foreground'>
                    Based on 200+ startups surveyed
                  </div>
                </CardFooter>
              </Card>
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription className='flex items-center gap-1'>
                    <IconUsers className='size-4' />
                    Avg Customer Base
                  </CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {metrics.customers.active.toLocaleString()}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='secondary'>
                      {metrics.customers.churnRate}% churn
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Avg LTV/CAC:{' '}
                    {(metrics.customers.ltv / metrics.customers.cac).toFixed(1)}
                    x
                  </div>
                  <div className='text-muted-foreground'>
                    Median payback: {metrics.customers.paybackPeriod} months
                  </div>
                </CardFooter>
              </Card>
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription className='flex items-center gap-1'>
                    <IconRocket className='size-4' />
                    Median Valuation
                  </CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {formatCurrency(metrics.funding.valuation)}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='secondary'>
                      {metrics.funding.currentRound}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Avg raised: {formatCurrency(metrics.funding.totalRaised)}
                  </div>
                  <div className='text-muted-foreground'>
                    Across {metrics.funding.investors} funding rounds
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <RevenueGrowthChart />
              <BurnRateChart />
            </div>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <CustomerMetricsChart />
              <FundingTimelineChart />
            </div>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <MarketComparisonChart />
              <CohortRetentionChart />
            </div>
          </TabsContent>
          <TabsContent value='analytics' className='space-y-4'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <MarketComparisonChart />
              <CohortRetentionChart />
            </div>
            <div className='grid grid-cols-1 gap-6'>
              <RevenueGrowthChart />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}

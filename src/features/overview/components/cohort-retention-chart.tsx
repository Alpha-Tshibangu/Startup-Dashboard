'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cohortRetentionData } from '@/lib/startup-metrics-data';

interface CohortRetentionChartProps {}

export function CohortRetentionChart({}: CohortRetentionChartProps) {
  const getRetentionColor = (value: number) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 80) return 'bg-green-400';
    if (value >= 70) return 'bg-yellow-400';
    if (value >= 60) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const getRetentionOpacity = (value: number) => {
    return `opacity-${Math.floor((value / 100) * 100)}`;
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>Cohort Retention Analysis</CardTitle>
          <CardDescription>
            Customer retention by monthly cohort
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='mb-4'>
          <p className='text-muted-foreground mb-2 text-sm'>
            Retention percentage by month
          </p>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='p-2 text-left font-medium'>Cohort</th>
                <th className='p-2 text-center font-medium'>Month 1</th>
                <th className='p-2 text-center font-medium'>Month 2</th>
                <th className='p-2 text-center font-medium'>Month 3</th>
                <th className='p-2 text-center font-medium'>Month 4</th>
                <th className='p-2 text-center font-medium'>Month 5</th>
                <th className='p-2 text-center font-medium'>Month 6</th>
              </tr>
            </thead>
            <tbody>
              {cohortRetentionData.map((cohort, index) => (
                <tr key={index} className='border-b'>
                  <td className='p-2 font-medium'>{cohort.cohort}</td>
                  <td className='p-2 text-center'>
                    <div
                      className={`inline-flex h-8 w-12 items-center justify-center rounded ${getRetentionColor(cohort.month1)}`}
                      style={{ opacity: cohort.month1 / 100 }}
                    >
                      <span className='text-xs font-bold text-white'>
                        {cohort.month1}%
                      </span>
                    </div>
                  </td>
                  <td className='p-2 text-center'>
                    <div
                      className={`inline-flex h-8 w-12 items-center justify-center rounded ${getRetentionColor(cohort.month2)}`}
                      style={{ opacity: cohort.month2 / 100 }}
                    >
                      <span className='text-xs font-bold text-white'>
                        {cohort.month2}%
                      </span>
                    </div>
                  </td>
                  <td className='p-2 text-center'>
                    <div
                      className={`inline-flex h-8 w-12 items-center justify-center rounded ${getRetentionColor(cohort.month3)}`}
                      style={{ opacity: cohort.month3 / 100 }}
                    >
                      <span className='text-xs font-bold text-white'>
                        {cohort.month3}%
                      </span>
                    </div>
                  </td>
                  <td className='p-2 text-center'>
                    <div
                      className={`inline-flex h-8 w-12 items-center justify-center rounded ${getRetentionColor(cohort.month4)}`}
                      style={{ opacity: cohort.month4 / 100 }}
                    >
                      <span className='text-xs font-bold text-white'>
                        {cohort.month4}%
                      </span>
                    </div>
                  </td>
                  <td className='p-2 text-center'>
                    <div
                      className={`inline-flex h-8 w-12 items-center justify-center rounded ${getRetentionColor(cohort.month5)}`}
                      style={{ opacity: cohort.month5 / 100 }}
                    >
                      <span className='text-xs font-bold text-white'>
                        {cohort.month5}%
                      </span>
                    </div>
                  </td>
                  <td className='p-2 text-center'>
                    <div
                      className={`inline-flex h-8 w-12 items-center justify-center rounded ${getRetentionColor(cohort.month6)}`}
                      style={{ opacity: cohort.month6 / 100 }}
                    >
                      <span className='text-xs font-bold text-white'>
                        {cohort.month6}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='text-muted-foreground mt-4 flex items-center gap-4 text-xs'>
          <div className='flex items-center gap-2'>
            <div className='h-3 w-3 rounded bg-green-500'></div>
            <span>Excellent (90%+)</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-3 w-3 rounded bg-yellow-400'></div>
            <span>Good (70-80%)</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-3 w-3 rounded bg-red-400'></div>
            <span>Poor (&lt;60%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

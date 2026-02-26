export interface StartupMetrics {
  revenue: {
    current: number;
    previous: number;
    growth: number;
    mrr: number;
    arr: number;
  };
  financials: {
    burnRate: number;
    runway: number;
    cashFlow: number;
    grossMargin: number;
    netMargin: number;
  };
  customers: {
    total: number;
    active: number;
    churnRate: number;
    ltv: number;
    cac: number;
    paybackPeriod: number;
  };
  funding: {
    totalRaised: number;
    currentRound: string;
    valuation: number;
    investors: number;
  };
}

export const mockStartupMetrics: StartupMetrics = {
  revenue: {
    current: 2850000,
    previous: 2280000,
    growth: 25,
    mrr: 237500,
    arr: 2850000
  },
  financials: {
    burnRate: 450000,
    runway: 18,
    cashFlow: -125000,
    grossMargin: 72,
    netMargin: -15
  },
  customers: {
    total: 4250,
    active: 3825,
    churnRate: 5.2,
    ltv: 24500,
    cac: 1850,
    paybackPeriod: 8.5
  },
  funding: {
    totalRaised: 15000000,
    currentRound: 'Series A',
    valuation: 75000000,
    investors: 12
  }
};

export const revenueGrowthData = [
  { month: 'Jan', revenue: 185000, target: 200000, lastYear: 120000 },
  { month: 'Feb', revenue: 198000, target: 210000, lastYear: 135000 },
  { month: 'Mar', revenue: 215000, target: 220000, lastYear: 145000 },
  { month: 'Apr', revenue: 225000, target: 230000, lastYear: 160000 },
  { month: 'May', revenue: 232000, target: 240000, lastYear: 175000 },
  { month: 'Jun', revenue: 248000, target: 250000, lastYear: 180000 },
  { month: 'Jul', revenue: 265000, target: 260000, lastYear: 195000 },
  { month: 'Aug', revenue: 278000, target: 270000, lastYear: 210000 },
  { month: 'Sep', revenue: 285000, target: 280000, lastYear: 225000 },
  { month: 'Oct', revenue: 295000, target: 290000, lastYear: 240000 },
  { month: 'Nov', revenue: 308000, target: 300000, lastYear: 255000 },
  { month: 'Dec', revenue: 320000, target: 310000, lastYear: 270000 }
];

export const burnRateData = [
  { month: 'Jan', burn: 380000, revenue: 185000, netBurn: 195000 },
  { month: 'Feb', burn: 395000, revenue: 198000, netBurn: 197000 },
  { month: 'Mar', burn: 410000, revenue: 215000, netBurn: 195000 },
  { month: 'Apr', burn: 425000, revenue: 225000, netBurn: 200000 },
  { month: 'May', burn: 440000, revenue: 232000, netBurn: 208000 },
  { month: 'Jun', burn: 445000, revenue: 248000, netBurn: 197000 },
  { month: 'Jul', burn: 450000, revenue: 265000, netBurn: 185000 },
  { month: 'Aug', burn: 455000, revenue: 278000, netBurn: 177000 },
  { month: 'Sep', burn: 460000, revenue: 285000, netBurn: 175000 },
  { month: 'Oct', burn: 465000, revenue: 295000, netBurn: 170000 },
  { month: 'Nov', burn: 468000, revenue: 308000, netBurn: 160000 },
  { month: 'Dec', burn: 470000, revenue: 320000, netBurn: 150000 }
];

export const customerMetricsData = [
  { month: 'Jan', newCustomers: 125, churned: 18, total: 3420 },
  { month: 'Feb', newCustomers: 145, churned: 22, total: 3543 },
  { month: 'Mar', newCustomers: 168, churned: 25, total: 3686 },
  { month: 'Apr', newCustomers: 155, churned: 20, total: 3821 },
  { month: 'May', newCustomers: 172, churned: 28, total: 3965 },
  { month: 'Jun', newCustomers: 185, churned: 32, total: 4118 },
  { month: 'Jul', newCustomers: 195, churned: 30, total: 4283 },
  { month: 'Aug', newCustomers: 188, churned: 35, total: 4436 },
  { month: 'Sep', newCustomers: 202, churned: 38, total: 4600 },
  { month: 'Oct', newCustomers: 215, churned: 42, total: 4773 },
  { month: 'Nov', newCustomers: 225, churned: 45, total: 4953 },
  { month: 'Dec', newCustomers: 238, churned: 48, total: 5143 }
];

export const fundingRoundsData = [
  { round: 'Pre-seed', amount: 500000, date: '2021-06', valuation: 2500000 },
  { round: 'Seed', amount: 2500000, date: '2022-03', valuation: 12500000 },
  { round: 'Series A', amount: 12000000, date: '2023-09', valuation: 75000000 }
];

export const marketComparisonData = [
  {
    company: 'Your Startup',
    revenue: 2850000,
    growth: 25,
    customers: 4250,
    valuation: 75
  },
  {
    company: 'Competitor A',
    revenue: 5200000,
    growth: 18,
    customers: 8500,
    valuation: 125
  },
  {
    company: 'Competitor B',
    revenue: 3800000,
    growth: 22,
    customers: 5200,
    valuation: 95
  },
  {
    company: 'Competitor C',
    revenue: 1900000,
    growth: 35,
    customers: 2800,
    valuation: 45
  },
  {
    company: 'Industry Avg',
    revenue: 3400000,
    growth: 20,
    customers: 5100,
    valuation: 85
  }
];

export const cohortRetentionData = [
  {
    cohort: 'Jan',
    month1: 100,
    month2: 88,
    month3: 82,
    month4: 78,
    month5: 75,
    month6: 72
  },
  {
    cohort: 'Feb',
    month1: 100,
    month2: 90,
    month3: 84,
    month4: 80,
    month5: 77,
    month6: 74
  },
  {
    cohort: 'Mar',
    month1: 100,
    month2: 89,
    month3: 85,
    month4: 81,
    month5: 78,
    month6: 76
  },
  {
    cohort: 'Apr',
    month1: 100,
    month2: 91,
    month3: 86,
    month4: 82,
    month5: 79,
    month6: 77
  },
  {
    cohort: 'May',
    month1: 100,
    month2: 92,
    month3: 87,
    month4: 83,
    month5: 80,
    month6: 78
  },
  {
    cohort: 'Jun',
    month1: 100,
    month2: 93,
    month3: 88,
    month4: 84,
    month5: 81,
    month6: 79
  }
];

export const unitEconomicsData = {
  ltv: 24500,
  cac: 1850,
  ltvCacRatio: 13.2,
  paybackPeriod: 8.5,
  grossMargin: 72,
  contributionMargin: 65,
  monthlyChurn: 5.2,
  annualChurn: 48.5
};

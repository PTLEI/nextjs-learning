import dayjs from 'dayjs';

export const REVENUE_LABEL = '每月營收';
export const REVENUE_GROWTH_RATE_LABEL = '單月營收年增率 (%)';
export const CUSTOMIZE_KEY = 'customize'

export function calculateMonthlyRevenueGrowthRate(data: { date: string; revenue: number }[]): { date: string; revenue: number; revenueStr: string; growthRate: number }[] {
  return data.map((currentMonth) => {
    const lastYearMonthStr = dayjs(currentMonth.date).subtract(1, 'year').format('YYYY-MM-DD');
    const lastYearMonth = data.find(item => item.date === lastYearMonthStr);
    
    const growthRate = lastYearMonth 
      ? ((currentMonth.revenue / lastYearMonth.revenue) - 1) * 100
      : 0;

    return {
      ...currentMonth,
      revenueStr: (currentMonth.revenue / 1000).toLocaleString(),
      growthRate: Number(growthRate.toFixed(2)) // Round to 2 decimal places
    };
  });
}
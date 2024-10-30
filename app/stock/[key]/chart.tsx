'use client';
import { useEffect } from 'react';
import { Chart } from '@antv/g2';
import { Select } from 'antd';

import {
  calculateMonthlyRevenueGrowthRate,
  REVENUE_LABEL,
  REVENUE_GROWTH_RATE_LABEL,
} from '@/utils';
import { useAppState } from '@/state/AppState';

export default function StockChart({ data }: { data: any }) {
  const {timeKey, setTimeKey} = useAppState();
  useEffect(() => {
    if (data) {
      const growthRateData = calculateMonthlyRevenueGrowthRate(data);
      const chartData: {
        dateStr: string;
        [REVENUE_LABEL]: number;
        [REVENUE_GROWTH_RATE_LABEL]: number;
      }[] = [];
      growthRateData.forEach((item) => {
        if (item.growthRate !== 0) {
          chartData.push({
            dateStr: item.date,
            [REVENUE_LABEL]: item.revenue,
            [REVENUE_GROWTH_RATE_LABEL]: item.growthRate,
          });
        }
      });

      const chart = new Chart({
        container: 'stockChart',
        autoFit: true,
        paddingTop: 30,
      });
      chart.data(chartData);
      chart.legend({
        color: {
          position: 'top',
          itemMarker: 'rect',
        },
      });
      chart.options({
        theme: {
          category10: ['rgba(232, 175, 0, 0.4)', '#CB4B4B'],
        },
      });

      // 如果revenue提前做toLocaleString，会导致y坐标轴显示异常
      chart
        .interval()
        .encode({
          x: 'dateStr',
          y: REVENUE_LABEL,
          color: () => REVENUE_LABEL,
        })
        .axis('x', false)
        .axis('y', {
          title: '千元',
          titlePosition: 'top',
          titleTransform: 'rotate(0) translateY(10)',
          labelFormatter: (d: number) => (d / 1000).toLocaleString(),
        })
        .tooltip({
          items: [
            {
              channel: 'y',
              valueFormatter: (d: number) => (d / 1000).toLocaleString(),
            },
          ],
        });

      chart
        .line()
        .encode({
          x: 'dateStr',
          y: REVENUE_GROWTH_RATE_LABEL,
          shape: 'smooth',
          color: () => REVENUE_GROWTH_RATE_LABEL,
        })
        .scale('y', { independent: true })
        .style({
          lineWidth: 2,
        })
        .axis('x', {
          title: false,
          tick: false,
          labelTransform: 'rotate(0)',
          labelFormatter: (d: string) => {
            return new Date(d).getFullYear();
          },
          labelFilter: (d: string, index: number, data: any) => {
            if (index === 0 || !data) {
              return true;
            }
            const currentYear = new Date(d).getFullYear();
            const prevYear = new Date(data[index - 1]).getFullYear();
            return currentYear !== prevYear;
          },
        })
        .axis('y', {
          position: 'right',
          title: '%',
          titlePosition: 'top',
          grid: null,
        });
      chart.render();
    }
  }, [data]);

  const handleTimeChange = (value: string) => {
    if (value !== 'customize') {
      setTimeKey?.(value);
    }
  }

  return (
    <div className='bg-white p-4 border-b border-gray-200 rounded-md mt-2'>
      <div className='flex justify-between items-center mb-3'>
        <div className='p-3 bg-[#0386f4] text-white font-bold rounded-sm'>{REVENUE_LABEL}</div>
        <Select
          options={[{label: '近3年', value: '3'}, {label: '近5年', value: '5'}, {label: '近8年', value: '8'}, {label: '自定', value: 'customize'}]}
          onChange={handleTimeChange}
          value={timeKey}
        />
      </div>
      <div id='stockChart' style={{ height: '360px' }} />
    </div>
  );
}

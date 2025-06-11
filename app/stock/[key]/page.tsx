'use client';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { fetchData } from '@/app/api';
import { useAppState } from '@/state/AppState';

import StockHeader from './header';
import StockTable from './table';
import StockChart from './chart';
import { useParams } from 'next/navigation';
import { CUSTOMIZE_KEY } from '@/utils';

export default function StockPage() {
  const { timeKey, customizeRange } = useAppState();
  const { key }: { key: string } = useParams();
  const [stockData, setStockData] = useState<any[]>();
  useEffect(() => {
    const fetchStockData = async () => {
      if (key) {
        let startDate;
        let endDate;
        // 因为计算需要同期数据，startDate 需要往前推一年
        if (timeKey === CUSTOMIZE_KEY) {
          if (customizeRange?.[0] && customizeRange?.[1]) {
            startDate = dayjs(customizeRange[0]).subtract(1, 'year');
            endDate = dayjs(customizeRange[1]);
          }
        } else {
          const year = parseInt(timeKey || '');
          if (year) {
            endDate = dayjs().startOf('month');
            startDate = endDate.subtract(year + 1, 'year');
          }
        }
        
        if (startDate && endDate) {
          const { data } = await fetchData(
            'TaiwanStockMonthRevenue',
            key,
            startDate.format('YYYY-MM-DD'),
            endDate.format('YYYY-MM-DD')
          );
          if (data) {
            // 返回的数据统计的是上个月的数据 -> subtract 1 month
            const realData = data.map((item: any) => {
              return {
                ...item,
                date: dayjs(item.date).subtract(1, 'month').format('YYYY-MM-DD')
              }
            })
            setStockData(realData);
          }
        }
      }
    };
    fetchStockData();
  }, [key, timeKey, customizeRange]);
  return (
    <div className='flex flex-col w-[760px] mb-6'>
      <StockHeader stockKey={key} />
      <StockChart data={stockData} />
      <StockTable data={stockData} />
    </div>
  );
}

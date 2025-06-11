'use client';

import { ReactNode, useState, useEffect } from 'react';
import { fetchStockInfo } from '@/app/api';

import { AppStateContext } from './AppState';

export default function AppStateProvider({
  children,
}: {
  children: ReactNode
}) {
  const [stockOptions, setStockOptions] = useState<{ label: string, value: string }[]>([]);
  const [timeKey, setTimeKey] = useState<string>('5');
  const [customizeRange, setCustomizeRange] = useState<string[]>();

  useEffect(() => {
    fetchStockInfo().then(({data}) => {
      if (data) {
        // 去重
        const uniqueData = new Map();
        data.forEach((item: any) => { 
          uniqueData.set(item.stock_id, item);
        });
        const temp: { label: string, value: string }[] = [];
        uniqueData.forEach((item: any) => {
          temp.push({
            label: item.stock_name,
            value: item.stock_id,
          });
        });
        setStockOptions(temp);
      }
    });
  }, []);


  return (
    <AppStateContext.Provider
      value={{
        stockOptions,
        timeKey,
        setTimeKey,
        customizeRange,
        setCustomizeRange,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

'use client';
import { useMemo } from 'react';

import { useAppState } from '@/state/AppState';

export default function StockHeader({ stockKey }: { stockKey: string }) {
  const { stockOptions } = useAppState();

  const stockInfo = useMemo(() => {
    return stockOptions?.find((option) => option.value === stockKey);
  }, [stockKey, stockOptions]);

  return (
    <h1 className='bg-white p-2 border-b border-gray-200 rounded-md m-0 mt-6 min-h-11 flex items-center'>
      {`${stockInfo?.label ? `${stockInfo.label} (${stockKey})` : stockKey}`}
    </h1>
  );  
}

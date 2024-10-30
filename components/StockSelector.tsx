'use client';
import { Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/state/AppState';

export default function StockSelector() {
  const router = useRouter();
  const { stockOptions } = useAppState();
  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/stock/${value}`);
  };

  return (
    <Select
      showSearch
      placeholder='輸入台代號，查看公司價值'
      onInputKeyDown={handleSearch}
      onSelect={handleSelect}
      options={stockOptions}
      style={{
        width: '400px',
      }}
    />
  );
}
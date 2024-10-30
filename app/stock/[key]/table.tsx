'use client';
import { useEffect, useRef } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import type { TableRef } from 'antd/es/table';
import dayjs from 'dayjs';

import {
  calculateMonthlyRevenueGrowthRate,
  REVENUE_LABEL,
  REVENUE_GROWTH_RATE_LABEL,
} from '@/utils';

interface DataSourceItem {
  title: string;
  [key: string]: string | number | undefined;
}

export default function StockTable({ data }: { data: any }) {
  const tableRef = useRef<TableRef>(null);
  const columns: TableColumnsType<DataSourceItem> = [
    {
      title: '年度月份',
      dataIndex: 'title',
      key: 'title',
      width: 160,
      fixed: 'left',
    },
  ];

  const dataSource: DataSourceItem[] = [
    {
      key: 'monthlyRevenue',
      title: REVENUE_LABEL,
    },
    {
      key: 'monthlyRevenueGrowthRate',
      title: REVENUE_GROWTH_RATE_LABEL,
    },
  ];
  if (data) {
    const growthRateData = calculateMonthlyRevenueGrowthRate(data);
    growthRateData.forEach((item) => {
      if (item.growthRate === 0) {
        return;
      }
      columns.push({
        title: dayjs(item.date).format('YYYY/MM'),
        dataIndex: item.date,
        key: item.date,
        align: 'right',
      });
      dataSource[0][item.date] = item.revenueStr;
      dataSource[1][item.date] = item.growthRate;
    });
  }

  useEffect(() => {
    if (tableRef.current) {
      const content = tableRef.current.nativeElement.getElementsByClassName(
        'ant-table-content'
      )[0] as HTMLElement;
      if (content) {
        content.scrollLeft = content.scrollWidth;
      }
    }
  }, [dataSource]);

  return (
    <div className='bg-white p-4 border-b border-gray-200 rounded-md mt-2'>
      <div className='flex justify-between items-center mb-3'>
        <div className='p-3 bg-[#0386f4] text-white font-bold rounded-sm'>
          詳細數據
        </div>
      </div>
      <Table
        ref={tableRef}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}

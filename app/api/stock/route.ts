import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dataset = searchParams.get('dataset');
  const data_id = searchParams.get('data_id');
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');

  let url = 'https://api.finmindtrade.com/api/v4/data';
  const queryParams = new URLSearchParams();
  
  if (dataset) {
    queryParams.append('dataset', dataset);
  }
  if (data_id) {
    queryParams.append('data_id', data_id);
  }
  if (start_date) {
    queryParams.append('start_date', start_date);
  }
  if (end_date) {
    queryParams.append('end_date', end_date);
  }

  const finalUrl = `${url}?${queryParams.toString()}`;

  try {
    const response = await fetch(finalUrl, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wNi0wOSAxNzo0MToxMCIsInVzZXJfaWQiOiJ0ZXN0bGluIiwiaXAiOiIyMjIuMjE3LjE0Mi4zMiJ9.6Vavhn24fakuF5Ttz0_PJ7iGp32jikZjLiSfnKsJJkU'
      },
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 
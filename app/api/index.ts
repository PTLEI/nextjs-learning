export async function fetchStockInfo() {
  const response = await fetch(`/api/stock?dataset=TaiwanStockInfo`);
  const data = await response.json();
  return data;
}

export async function fetchData(dataset: string, data_id: string, start_date: string, end_date: string) {
  const response = await fetch(`/api/stock?dataset=${dataset}&data_id=${data_id}&start_date=${start_date}&end_date=${end_date}`);
  const data = await response.json();
  return data;
}

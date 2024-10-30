export async function fetchStockInfo() {
  const response = await fetch(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo`, {
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wNi0wOSAxNzo0MToxMCIsInVzZXJfaWQiOiJ0ZXN0bGluIiwiaXAiOiIyMjIuMjE3LjE0Mi4zMiJ9.6Vavhn24fakuF5Ttz0_PJ7iGp32jikZjLiSfnKsJJkU'
    },
});
  const data = await response.json();
  return data;
}

export async function fetchData(dataset: string, data_id: string, start_date: string, end_date: string) {
  const response = await fetch(`https://api.finmindtrade.com/api/v4/data?dataset=${dataset}&data_id=${data_id}&start_date=${start_date}&end_date=${end_date}`, {
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wNi0wOSAxNzo0MToxMCIsInVzZXJfaWQiOiJ0ZXN0bGluIiwiaXAiOiIyMjIuMjE3LjE0Mi4zMiJ9.6Vavhn24fakuF5Ttz0_PJ7iGp32jikZjLiSfnKsJJkU'
    },
});
  const data = await response.json();
  return data;
}

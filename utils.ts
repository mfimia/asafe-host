import { ICoin } from "./types";

export const ROWS_LIMIT = 5;

export const getPageData = (allData: ICoin[], page: number) => {
  const startIndex = (page - 1) * ROWS_LIMIT;
  const endIndex = page * ROWS_LIMIT;
  return allData.slice(startIndex, endIndex);
};

export const fetchData = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Failed to fetch, status: ${response.status}`);
  return response.json();
};
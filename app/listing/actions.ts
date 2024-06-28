import { mockData } from "@/lib/data";

export async function fetchMockData(options: {
  pageIndex: number;
  pageSize: number;
  latency?: number;
}) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, options.latency ?? 500));

  return {
    rows: mockData.slice(
      (options.pageIndex - 1) * options.pageSize,
      options.pageIndex * options.pageSize
    ),
    pageCount: Math.ceil(mockData.length / options.pageSize),
    rowCount: mockData.length,
  };
}

export async function fetchSingleMockData(options: {
  id: string;
  latency?: number;
}) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, options.latency ?? 500));

  const result = mockData.find((data) => data.id === options.id);
  if (!result) {
    return null;
  }

  return {
    row: result,
  };
}

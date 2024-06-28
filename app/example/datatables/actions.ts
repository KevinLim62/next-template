import { mockData } from "@/lib/data";

export async function fetchData(options: {
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

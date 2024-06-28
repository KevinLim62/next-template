"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ListingSkeleton from "./ListingSkeleton";
import Link from "next/link";
import { fetchMockData } from "./actions";

const Listings = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["mockData"],
    queryFn: () =>
      fetchMockData({
        pageIndex: 1,
        pageSize: 20,
        latency: 1000,
      }),
  });

  if (isPending) {
    return <ListingSkeleton size={9} />;
  }

  return (
    <div className="grid grid-cols-3 grid-flow-row gap-5 mt-5">
      {data?.rows.map((payment) => (
        <Card key={payment.id} className="hover:scale-105 transition-all">
          <Link href={`listing/${payment.id}`}>
            <CardHeader>
              <CardTitle className="text-xl">{payment.email}</CardTitle>
              <CardDescription>{payment.amount}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <p>{payment.status}</p>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Listings;

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSingleMockData } from "../actions";
import ListingSkeleton from "../ListingSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SingleListing = ({ listingId }: { listingId: string }) => {
  const { isPending, data, error } = useQuery({
    queryKey: ["singleMockData"],
    queryFn: () =>
      fetchSingleMockData({
        id: listingId,
        latency: 1000,
      }),
  });

  if (isPending) {
    return <ListingSkeleton size={1} />;
  }

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle className="text-xl">{data?.row.email}</CardTitle>
        <CardDescription>{data?.row.amount}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <p>{data?.row.status}</p>
      </CardFooter>
    </Card>
  );
};

export default SingleListing;

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/lib/types";

const ListingSkeleton: React.FC<Skeleton> = ({ size }) => {
  return (
    <>
      {size > 1 ? (
        <div className="grid grid-cols-3 grid-flow-row gap-3 mt-5">
          {Array.from({ length: size }).map((_, index) => (
            <Card
              key={index}
              className="w-[350px] h-[200px] animate-pulse bg-muted-foreground/20"
            >
              <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter></CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <Card className="w-[350px] h-[200px] animate-pulse bg-muted-foreground/20">
            <CardHeader>
              <CardTitle></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default ListingSkeleton;

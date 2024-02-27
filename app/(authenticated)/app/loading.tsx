import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingCard from "./LoadingCard";

export default function Loading() {
  return (
    <>
      <Card className="flex flex-col items-center justify-center p-4">
        <Skeleton className="w-1/2 h-4 mb-2" />
        <Skeleton className="w-full h-4 rounded-full" />
      </Card>

      <LoadingCard />
    </>
  );
}

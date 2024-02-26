import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen p-12 pt-20 flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
      <Card className="flex flex-col items-center justify-center p-4 h-full w-full">
        <Skeleton className="w-full h-full" />
      </Card>
      <Card className="flex flex-col items-center justify-center p-4 h-full w-full">
        <Skeleton className="w-full h-full" />
      </Card>
    </div>
  );
}

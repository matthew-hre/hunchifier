import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col w-full gap-2">
      <Card className="flex items-center p-4 flex-col space-y-2">
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/4 h-4" />
      </Card>
      <Card className="flex items-center p-4 flex-col space-y-2">
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/4 h-4" />
      </Card>
      <Card className="flex items-center p-4 flex-col space-y-2">
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/4 h-4" />
      </Card>
      <Card className="flex items-center p-4 flex-row">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex flex-col items-left justify-center w-4/5 pl-2">
          <Skeleton className="w-1/2 h-6 mb-2" />
          <Skeleton className="w-1/4 h-4" />
        </div>
      </Card>
      <Card className="flex items-center p-4 flex-row">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex flex-col items-left justify-center w-4/5 pl-2">
          <Skeleton className="w-1/2 h-6 mb-2" />
          <Skeleton className="w-1/4 h-4" />
        </div>
      </Card>
    </div>
  );
}

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Card className="flex flex-col items-center justify-center p-4">
        <Skeleton className="w-1/2 h-4 mb-2" />
        <Skeleton className="w-full h-4 rounded-full" />
      </Card>

      <Card className="relative">
        <CardHeader className="pb-4">
          <CardDescription>
            <Skeleton className="w-1/4 h-3" />
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="mb-4">
            <Skeleton className="w-1/2 h-8 mb-2" />
            <Skeleton className="w-full h-24" />
          </div>
          <div className="mb-4">
            <Skeleton className="w-1/2 h-8 mb-2" />
            <Skeleton className="w-full h-24" />
          </div>
          <div className="mb-4">
            <Skeleton className="w-1/2 h-8 mb-2" />
            <Skeleton className="w-2/3 h-12" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

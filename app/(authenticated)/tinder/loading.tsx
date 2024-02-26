import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center absolute top-16 left-1 h-[calc(100dvh-4rem)] w-[calc(100vw-0.5rem)] gap-2 p-2">
      <Card className="flex flex-col items-center justify-center w-full">
        <CardHeader className="p-4">
          <Skeleton className="w-96 h-6" />
        </CardHeader>
      </Card>
      <div className="flex flex-row w-full gap-x-2 flex-1">
        <Card className="min-h-64 w-[32rem] hidden p-12 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <Skeleton className="w-80 h-80 rounded-full" />
        </Card>
        <Card className="relative flex-1">
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
      </div>
      <Card className="flex flex-wrap justify-center gap-2 py-4 w-full mt-auto mb-2">
        <Skeleton className="w-32 h-12" />
        <Skeleton className="w-32 h-12" />
        <Skeleton className="w-32 h-12" />
        <Skeleton className="w-32 h-12" />
        <Skeleton className="w-32 h-12" />
        <Skeleton className="w-32 h-12" />
      </Card>
    </div>
  );
}

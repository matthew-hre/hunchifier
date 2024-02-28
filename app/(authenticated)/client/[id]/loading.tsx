import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4 h-auto mb-32 mt-4">
      <Skeleton className="w-1/4 h-6" />
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-full h-24 mb-4" />
      <Skeleton className="w-1/4 h-6" />
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-full h-24 mb-4" />
      <Skeleton className="w-1/4 h-6" />
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-full h-24 mb-4" />
      <Skeleton className="w-full h-12 mb-4" />
    </div>
  );
}

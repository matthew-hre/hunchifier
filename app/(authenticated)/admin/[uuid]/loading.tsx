import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 p-12 w-full flex flex-col items-center min-h-screen">
      <div className="flex flex-col items-center w-full">
        <header className="flex items-center justify-center w-full mt-8 px-4 py-2 border-b border-secondary">
          <Skeleton className="w-1/4 h-4 mb-2" />
        </header>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="w-48 h-4" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-48 h-4" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-48 h-4" />
            </TableHead>
            <TableHead className="flex flex-row justify-end items-center">
              <Skeleton className="w-24 h-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(3)].map((_, index) => (
            <TableRow key={index}>
              <TableCell className="break-words max-w-64 align-top font-semibold">
                <Skeleton className="w-96 h-12" />
              </TableCell>
              <TableCell className="break-words max-w-64 align-top">
                <Skeleton className="w-96 h-12" />
              </TableCell>
              <TableCell className="break-words max-w-64 align-top">
                <Skeleton className="w-96 h-8" />
              </TableCell>
              <TableCell className="text-right flex">
                <Skeleton className="w-full h-4" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

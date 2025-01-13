import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface PostCardSkeletonProps {
  title: string;
  count?: number;
}

export default function PostCardSkeleton({
  title,
  count = 6,
}: PostCardSkeletonProps) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col">
                <Skeleton className="aspect-[16/10]" />
                <div className="flex flex-col space-y-4 p-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-3">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="ml-auto h-4 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

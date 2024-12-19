import { Skeleton } from "@/components/ui/skeleton";

const SkeletonEvent = () => {
  return (
    <main className="container mx-auto max-w-6xl px-4">
      <section className="space-y-2">
        <Skeleton className="h-[22px] w-[5%] rounded-sm" />
        <Skeleton className="h-[22px] w-[40%] rounded-sm" />
        <Skeleton className="h-[22px] w-[15%] rounded-sm" />
        <Skeleton className="h-[200px] rounded-sm md:h-[400px]" />
      </section>
    </main>
  );
};

export default SkeletonEvent;

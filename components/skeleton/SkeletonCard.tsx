import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  lineClassName?: string;
  times?: number;
}
export function SkeletonCard({ className, times, lineClassName }: SkeletonCardProps) {
  const _renderSkeleton = (number: number) => {
    const array = [];
    for (let i = 0; i < number; i++) {
      array.push(<Skeleton key={i} className={cn('h-4 w-[250px]', lineClassName)} />);
    }
    return array;
  };
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className={cn('h-[125px] w-[250px] rounded-xl', className)} />
      <div className="space-y-2">{times && _renderSkeleton(+times)}</div>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Icons } from '../Icon/icons';

export const MainLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Icons.utensils size={40} color="orange" />
      <span className="text-xl font-bold">dish-rater</span>
    </div>
  );
};

import { Utensils } from 'lucide-react';

export const MainLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Utensils size={40} color="orange" />
      <span className="text-xl font-bold">dish-rater</span>
    </div>
  );
};

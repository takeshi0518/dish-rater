import { Icons } from './Icon/icons';

export const MainLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Icons.utensils size={40} color="orange" />
      <span className="text-xl font-bold">dish-rater</span>
    </div>
  );
};

'use client';
import { Icons } from '../Icon/icons';

export default function DishSearch() {
  return (
    <div className="mb-6">
      <div className="relative mx-w-2xl mx-auto">
        <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="料理をさがす"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}

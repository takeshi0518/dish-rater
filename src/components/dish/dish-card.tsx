import Image from 'next/image';
import Link from 'next/link';

import { DashboardDish } from '@/app/types/dish';
import { Icons } from '../Icon/icons';

interface DishCardProps {
  dish: DashboardDish;
}

export default function DishCard({ dish }: DishCardProps) {
  return (
    <Link href={`/dishes/${dish.id}`} className="group block">
      <div className="relative overflow-hidden">
        {dish.rating !== null && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
            <Icons.star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-900">
              {dish.rating.toFixed(1)}
            </span>
          </div>
        )}
        {/* 料理画像 */}
        <div className="relative aspect-square bg-gray-200">
          {dish.image_url ? (
            <Image
              src={dish.image_url}
              alt={dish.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <h3 className="text-white font-medium p-3 w-full">{dish.name}</h3>
        </div>
      </div>
    </Link>
  );
}

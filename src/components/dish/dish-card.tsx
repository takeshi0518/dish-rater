import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

type DishCardProps = {
  dish: {
    id: string;
    name: string;
    description: string | null;
    image_url: string | null;
    rating: number | null;
    created_at: string;
  };
};

export default function DishCard({ dish }: DishCardProps) {
  return (
    <Link href={`/dishes/${dish.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl">
        {/* 料理画像 */}
        <div className="relative aspect-square bg-gray-200">
          {dish.image_url ? (
            <Image
              src={dish.image_url}
              alt={dish.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width] 640px) 100vw, (max-widht: 1024px) 50vw 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* 料理情報 */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {dish.name}
          </h3>

          {dish.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {dish.description}
            </p>
          )}

          {/* 評価 */}
          {dish.rating !== null && (
            <div className="flesx items-center gap-1">
              <Star className="w-4 h-4 fill-yello-400 text-yellow-400" />
              <span className="text-sm font-medium">
                {dish.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

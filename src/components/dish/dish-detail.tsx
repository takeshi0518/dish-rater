'use client';

import Image from 'next/image';
import { Icons } from '@/components/Icon/icons';

type Dish = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  tags: string[] | null;
  rating: number | null;
  source_type: 'restaurant' | 'homemade' | 'other';
  restaurant_name: string | null;
  chef_name: string | null;
  created_at: string;
  updated_at: string;
};

type DishDetailProps = {
  dish: Dish;
};

export default function DishesDetail({ dish }: DishDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50 md:p-6 lg:flex lg:items-center lg:justify-center">
      <div className="bg-white w-full md:max-w-3xl lg:max-w-7xl md:mx-auto md:rounded-lg md:shadow-sm lg:shrink-0">
        {/* モバイル:縦並び / PC:横並び */}
        <div className="flex flex-col lg:flex-row">
          {/* 料理画像 */}
          <div className="w-full lg:w-1/2">
            {dish.image_url ? (
              <div className="relative w-full aspect-square md:rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none overflow-hidden">
                <Image
                  src={dish.image_url}
                  alt={dish.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          {/* 料理情報エリア */}
          <div className="w-full lg:w-1/2">
            {/* 投稿日時 */}
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-2 text-gray-500">
                <Icons.calendar className="w-4 h-4" />
                <time className="text-sm">
                  {new Date(dish.created_at).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
            {/* タイトルとレーティング */}
            <div className="p-4 md:p-6">
              <h1 className="text-2xl md:text-3xl mb-5">{dish.name}</h1>

              {/* 店名または作った人 */}
              {dish.source_type === 'restaurant' && dish.restaurant_name && (
                <p className="text-sm text-gray-600 mb-3">
                  📍 {dish.restaurant_name}
                </p>
              )}
              {dish.source_type === 'homemade' && dish.chef_name && (
                <p className="text-sm text-gray-600 mb-3">
                  👨‍🍳 {dish.chef_name}
                </p>
              )}

              {dish.rating !== null && (
                <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                  <Icons.star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg">{dish.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* 説明文 */}
            {dish.description && (
              <div className="p-4 md:p-6">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {dish.description}
                </p>
              </div>
            )}

            {/* タグ */}
            {dish.tags && dish.tags.length > 0 && (
              <div className="p-4 md:p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">
                  タグ
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {dish.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

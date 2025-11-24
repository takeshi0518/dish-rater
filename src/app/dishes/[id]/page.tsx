import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DishesDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: dish, error } = await supabase
    .from('dishes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !dish) {
    notFound();
  }

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
              {dish.rating !== null && (
                <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                  <span className="text-lg">{dish.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* 説明文 */}
            {dish.description && (
              <div className="p-4 md:p-6">
                <h2 className="text-lg mb-3">説明</h2>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {dish.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

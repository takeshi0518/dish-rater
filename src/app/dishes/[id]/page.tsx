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
    <div className="container mx-auto max-w-6xl">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* モバイル:縦並び / PC:横並び */}
        <div className="flex flex-col md:flex-row">
          {/* 料理画像 */}
          <div className="w-full md:w-1/2">
            {dish.image_url ? (
              <div className="relative w-full aspect-square">
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

          {/* 料理詳細 */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            {/* タイトルとレーティング */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">
                {dish.name}
              </h1>
              {dish.rating !== null && (
                <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                  <span className="text-lg font-semibold">
                    {dish.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 説明文 */}
          {dish.description && (
            <div>
              <h2 className="text-lg font-semibold mb-3">説明</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {dish.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

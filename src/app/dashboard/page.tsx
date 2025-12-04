import { createSupabaseServerClient } from '@/lib/supabase/server';
import DishCard from '@/components/dish/dish-card';
import DishSearch from '@/components/dish/dish-search';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  // 料理データを取得
  const { data: dishes, error } = await supabase
    .from('dishes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching dishes:', error);
  }

  return (
    <div className="container mx-auto max-w-full">
      {/* 料理検索窓 */}
      <DishSearch />

      {dishes && dishes.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-0.5">
          {dishes?.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">まだ料理が投稿されていません</p>
          <p className="text-gray-400 mt-2">最初の料理を投稿してみませんか?</p>
        </div>
      )}
    </div>
  );
}

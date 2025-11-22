import { createSupabaseServerClient } from '@/lib/supabase/server';
import DishCard from '@/components/dish/dish-card';

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
    <div className="container mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">みんなの料理</h1>
        <p className="text-gray-600 mt-2">
          {dishes?.length || 0}件の料理が投稿されています
        </p>
      </div>

      {dishes && dishes?.length! > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grind-cols-3 xl:grid-cols-4 gap-6">
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

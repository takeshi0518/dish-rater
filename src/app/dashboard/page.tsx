import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  //ログイン状態を確認
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 料理データを取得
  const { data: dishes, error } = await supabase
    .from('dishes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching dishes:', error);
  }

  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">みんなの料理</h1>
        {user ? <p>ログイン中: {user.email}</p> : <p>未ログイン (閲覧のみ)</p>}

        <div className="mt-8">
          <p>ここに料理一覧が表示されます</p>
        </div>
      </div>

      {/* 料理一覧 */}
      <div>
        {dishes && dishes.length > 0 ? (
          dishes.map((dish) => (
            <div key={dish.id}>
              <h2>{dish.name}</h2>
              <p>{dish.description}</p>
              {dish.rating && (
                <div>
                  <span>*</span>
                  <span>{dish.rating}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>まだ料理が投稿されていません</p>
        )}
      </div>
    </>
  );
}

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    userId: string;
  };
};

export default async function ProfilePage({ params }: Props) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { userId } = await params;
  const isOwnProfile = user?.id === userId;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    notFound();
  }

  const { data: dishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* プロフィールヘッダー */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          {/* アバター */}
          <div className="w-32 h-32 rounded-full bg-gray-200" />

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">{profile.username}</h1>
              {isOwnProfile && (
                <button className="px-4 py-2 border rounded-lg">
                  プロフィール編集
                </button>
              )}
            </div>

            {/* 統計情報 */}
            <div className="flex gap-4 mb-4">
              {/* 投稿 */}
              <div className="flex flex-col md:flex-row md:gap-2">
                <span className="text-xs md:text-base font-semibold">
                  {dishes?.length || 0}
                </span>
                <span className="text-xs md:text-sm text-gray-600">投稿</span>
              </div>

              {/* フォロワー */}
              <div className="flex flex-col md:flex-row md:gap-2">
                <span className="text-xs md:text-base font-semibold">0</span>
                <span className="text-xs md:text-sm text-gray-600">
                  フォロワー
                </span>
              </div>

              {/* フォロー中 */}
              <div className="flex flex-col md:flex-row md:gap-2">
                <span className="text-xs md:text-base font-semibold">0</span>
                <span className="text-xs md:text-sm text-gray-600">
                  フォロー中
                </span>
              </div>
            </div>

            {/* 自己紹介 */}
            {profile.bio && <p>{profile.bio}</p>}
          </div>
        </div>
      </div>

      {/* 投稿グリッド */}
      <div className="grid grid-cols-3 gap-1">
        {dishes?.map((dish) => (
          <div key={dish.id} className="aspect-square bg-gray-200">
            <div className="w-full h-full flex items-center justify-center">
              {dish.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

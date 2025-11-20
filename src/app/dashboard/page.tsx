import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">みんなの料理</h1>
      {user ? <p>ログイン中: {user.email}</p> : <p>未ログイン (閲覧のみ)</p>}

      <div className="mt-8">
        <p>ここに料理一覧が表示されます</p>
      </div>
    </div>
  );
}

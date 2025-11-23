import { createSupabaseServerClient } from '@/lib/supabase/server';
import BottomNav from './bottom-nav';
import MobileHeader from './mobile-header';
import Sidebar from './sidebar';

export default async function Navigation() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {/* {モバイルヘッダー} */}
      <MobileHeader user={user} />

      {/* モバイル下部ナビ */}
      <BottomNav user={user} />

      {/* {pcサイドバー} */}
      <Sidebar user={user} />
    </>
  );
}

import Link from 'next/link';

import { Icons } from '@/components/Icon/icons';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import NavList from './nav-list';
import BottomNav from './bottom-nav';

export default async function Navbar() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {/* {モバイルヘッダー} */}
      <header className="md:hidden flex items-center justify-between fixed top-0 left-0 right-0 bg-amber-100  p-4 z-50">
        <Link href="/dashboard">
          <Icons.utensils color="orange" size="30" />
        </Link>
        <nav>
          <NavList user={user} />
        </nav>
      </header>

      {/* モバイル下部ナビ */}
      <BottomNav user={user} />

      {/* {pcサイドバー} */}
      <aside className="hidden md:flex flex-col w-52 h-full bg-amber-100 p-4">
        <div>
          <Icons.utensils color="orange" size="40" className="mb-8" />
          <nav className="flex-1">
            <ul className="flex flex-col gap-2">
              <li>login</li>
              <li>signup</li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

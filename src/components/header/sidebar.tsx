'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Icons } from '@/components/Icon/icons';
import UserInfo from './user-info';
import { User } from '@/app/types/uset';

type SidebarProps = {
  user: User | null;
};

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-amber-100 p-6 fixed left-0 top-0">
      <Link href="/dashboard" className="flex items-center gap-2 mb-8">
        <Icons.utensils color="orange" size={40} />
        <h1 className="text-2xl font-bold">dish-rater</h1>
      </Link>

      {/* ナビゲーション */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {/* ホーム */}
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 p-3  text-sm md:text-base transition-colors ${
                pathname === '/dashboard'
                  ? 'border-l-4 border-orange-500 bg-amber-200 font-semibold'
                  : 'hover:bg-amber-200'
              }`}
            >
              <Icons.home size={24} strokeWidth={1.5} />
              <span className="font-medium">home</span>
            </Link>
          </li>

          {user ? (
            <>
              {/* マイページ */}
              <li>
                <Link
                  href="/dashboard/my-dishes"
                  className={`flex items-center gap-2 p-3  text-sm md:text-base transition-colors ${
                    pathname === '/dashboard/my-dishes'
                      ? 'border-l-4 border-orange-500 bg-amber-200 font-semibold'
                      : 'hover:bg-amber-200'
                  }`}
                >
                  <Icons.myPage size={24} strokeWidth={1.5} />
                  <span className="font-medium">My Page</span>
                </Link>
              </li>

              {/* プロフィール */}
              <li>
                <Link
                  href="/dashboard/profile"
                  className={`flex items-center gap-2 p-3  text-sm md:text-base transition-colors ${
                    pathname === '/dashboard/profile'
                      ? 'border-l-4 border-orange-500 bg-amber-200 font-semibold'
                      : 'hover:bg-amber-200'
                  }`}
                >
                  <Icons.profile size={24} strokeWidth={1.5} />
                  <span className="font-medium">Profile</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* ログイン */}
              <li>
                <Link
                  href="/Login"
                  className={`flex items-center gap-2 p-3  text-sm md:text-base transition-colors ${
                    pathname === '/login'
                      ? 'border-l-4 border-orange-500 bg-amber-200 font-semibold'
                      : 'hover:bg-amber-200'
                  }`}
                >
                  <Icons.login size={24} strokeWidth={1.5} />
                  <span className="font-medium">Login</span>
                </Link>
              </li>

              {/* 新規登録 */}
              <li>
                <Link
                  href="/signup"
                  className={`flex items-center gap-2 p-3  text-sm md:text-base transition-colors ${
                    pathname === '/signup'
                      ? 'border-l-4 border-orange-500 bg-amber-200 font-semibold'
                      : 'hover:bg-amber-200'
                  }`}
                >
                  <Icons.signin size={24} strokeWidth={1.5} />
                  <span className="font-medium">SignUp</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}

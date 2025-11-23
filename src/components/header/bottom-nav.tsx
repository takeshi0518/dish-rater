'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';
import { Icons } from '../Icon/icons';
import { User } from '@/app/types/uset';

type BottomNavProps = {
  user: User | null;
};

export default function BottomNav({ user }: BottomNavProps) {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t-[0.5px] border-gray-200 z-50">
      <ul className="flex justify-around items-center h-16">
        {/* ホーム */}
        <li className="flex-1">
          <Link
            href="/dashboard"
            className={`flex justify-center transition-all active:scale-95 ${
              pathname === '/dashboard'
                ? 'text-orange-500'
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            <Icons.home size={30} strokeWidth={1.5} />
          </Link>
        </li>

        {user ? (
          <>
            {/* マイページ */}
            <li className="flex-1">
              <Link
                href="/dashboard/my-dishes"
                className={`flex justify-center transition-all active:scale-95 ${
                  pathname === '/dashboard/my-dishes'
                    ? 'text-orange-500'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                <Icons.myPage size={30} strokeWidth={1.5} />
              </Link>
            </li>

            {/* プロフィール */}
            <li className="flex-1">
              <Link
                href="/dashboard/profile"
                className={`flex justify-center transition-all active:scale-95 ${
                  pathname === '/dashboard/profile'
                    ? 'text-orange-500'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                <Icons.profile size={30} strokeWidth={1.5} />
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* ログイン */}
            <li className="flex-1">
              <Link
                href="/login"
                className="flex justify-center  text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Icons.login size={30} strokeWidth={1.5} />
              </Link>
            </li>

            {/* 新規登録 */}
            <li className="flex-1">
              <Link
                href="/signup"
                className="flex justify-center text-gray-600 hover:text-orange-500 transition-coors"
              >
                <Icons.signin size={30} strokeWidth={1.5} />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

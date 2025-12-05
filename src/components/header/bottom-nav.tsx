'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';
import { Icons } from '../Icon/icons';
import { User } from '@/app/types/user';

type BottomNavProps = {
  user: User | null;
};

function Home({ pathname }: { pathname: string }) {
  return (
    <>
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
    </>
  );
}

function Profile({ pathname, userId }: { pathname: string; userId: string }) {
  const isActive = pathname.startsWith('/profile');
  return (
    <>
      <li className="flex-1">
        <Link
          href={`profile/${userId}`}
          className={`flex justify-center transition-all active:scale-95 ${
            isActive ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
          }`}
        >
          <Icons.myPage size={30} strokeWidth={1.5} />
        </Link>
      </li>
    </>
  );
}

function Login() {
  return (
    <>
      <li className="flex-1">
        <Link
          href="/login"
          className="flex justify-center  text-gray-600 hover:text-orange-500 transition-colors"
        >
          <Icons.login size={30} strokeWidth={1.5} />
        </Link>
      </li>
    </>
  );
}

function SignUp() {
  return (
    <>
      <li className="flex-1">
        <Link
          href="/signup"
          className="flex justify-center text-gray-600 hover:text-orange-500 transition-coors"
        >
          <Icons.signin size={30} strokeWidth={1.5} />
        </Link>
      </li>
    </>
  );
}

export default function BottomNav({ user }: BottomNavProps) {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t-[0.5px] border-gray-200 z-50">
      <ul className="flex justify-around items-center h-16">
        {user ? (
          <>
            {/* ホーム */}
            <Home pathname={pathname} />
            {/* マイページ */}
            <Profile pathname={pathname} userId={user?.id} />
          </>
        ) : (
          <>
            {/* ログイン */}
            <Login />
            {/* 新規登録 */}
            <SignUp />
          </>
        )}
      </ul>
    </nav>
  );
}

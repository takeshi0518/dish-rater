'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Icons } from '@/components/Icon/icons';
import UserInfo from './user-info';
import { User } from '@/app/types/user';

type SidebarProps = {
  user: User | null;
};

function Home({ pathname }: { pathname: string }) {
  return (
    <li>
      <Link
        href="/dashboard"
        className={`flex items-center gap-2 p-3  text-sm md:text-base transition-colors ${
          pathname === '/dashboard'
            ? 'border-l-4 border-orange-500 bg-amber-200 font-semibold'
            : 'hover:bg-amber-200'
        }`}
      >
        <Icons.home size={20} strokeWidth={1.5} />
        <span className="font-medium text-base">home</span>
      </Link>
    </li>
  );
}

function Profile({ pathname, userId }: { pathname: string; userId: string }) {
  const isActive = pathname.startsWith('/profile');
  return (
    <li>
      <Link
        href={`/profile/${userId}`}
        className={`flex items-center gap-2 p-3  text-sm md:text-base transition-colors ${
          isActive
            ? 'border-l-4 border-orange-500 bg-amber-200 font-semibold'
            : 'hover:bg-amber-200'
        }
            
        }`}
      >
        <Icons.myPage size={20} strokeWidth={1.5} />
        <span className="font-medium">Profile</span>
      </Link>
    </li>
  );
}

// function Profile({ pathname }: { pathname: string }) {
//   return (
//     <li>
//       <Link
//         href="/profile"
//         className={`flex items-center gap-2 p-3  text-sm md:text-base transition-colors ${
//           pathname === '/profile'
//             ? 'border-l-4 border-orange-500 bg-amber-200 font-semibold'
//             : 'hover:bg-amber-200'
//         }`}
//       >
//         <Icons.profile size={20} strokeWidth={1.5} />
//         <span className="font-medium">Profile</span>
//       </Link>
//     </li>
//   );
// }

function Login({ pathname }: { pathname: string }) {
  return (
    <li>
      <Link
        href="/login"
        className={`flex items-center gap-2 p-3  text-sm md:text-base transition-colors ${
          pathname === '/login'
            ? 'border-l-4 border-orange-500 bg-amber-200 font-semibold'
            : 'hover:bg-amber-200'
        }`}
      >
        <Icons.login size={20} strokeWidth={1.5} />
        <span className="font-medium">Login</span>
      </Link>
    </li>
  );
}

function SignUp({ pathname }: { pathname: string }) {
  return (
    <li>
      <Link
        href="/signup"
        className={`flex items-center gap-2 p-3  text-sm md:text-base transition-colors ${
          pathname === '/signup'
            ? 'border-l-4 border-orange-500 bg-amber-200 font-semibold'
            : 'hover:bg-amber-200'
        }`}
      >
        <Icons.signin size={20} strokeWidth={1.5} />
        <span className="font-medium">SignUp</span>
      </Link>
    </li>
  );
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-amber-100 p-6">
      <Link href="/dashboard" className="flex items-center gap-2 mb-8">
        <Icons.utensils color="orange" size={40} />
        <h1 className="text-2xl font-bold">dish-rater</h1>
      </Link>

      {/* ナビゲーション */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {/* ホーム */}
          <Home pathname={pathname} />
          {user ? (
            <>
              {/* プロフィール*/}
              <Profile pathname={pathname} userId={user?.id} />
              {/* プロフィール */}
              {/* <Profile pathname={pathname} /> */}
            </>
          ) : (
            <>
              {/* ログイン */}
              <Login pathname={pathname} />
              {/* 新規登録 */}
              <SignUp pathname={pathname} />
            </>
          )}
        </ul>
      </nav>

      {/* 区切り線 */}
      <div className="mt-auto pt-6 border-t border-amber-500">
        {/* ユーザー情報 */}
        <UserInfo user={user} variant="full" />
      </div>
    </aside>
  );
}

import Link from 'next/link';

import { Icons } from '@/components/Icon/icons';
import UserInfo from './user-info';
import { User } from '@/app/types/user';

type MobileHeaderProps = {
  user: User | null;
};
export default function MobileHeader({ user }: MobileHeaderProps) {
  return (
    <header className="md:hidden flex items-center justify-between fixed top-0 left-0 right-0 bg-amber-100  p-4 z-50">
      <Link href="/dashboard">
        <Icons.utensils color="orange" size="30" />
      </Link>
      <nav>
        <UserInfo user={user} variant="compact" />
      </nav>
    </header>
  );
}

import { Icons } from '@/components/Icon/icons';
import UserInfo from './user-info';
import { User } from '@/app/types/uset';

type SidebarProps = {
  user: User | null;
};

export default function Sidebar({ user }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-52 h-full bg-amber-100 p-4">
      <div>
        <Icons.utensils color="orange" size="40" className="mb-8" />
        <nav className="flex-1">
          <UserInfo variant="full" user={user} />
        </nav>
      </div>
    </aside>
  );
}

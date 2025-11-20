import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icon/icons';
import { User } from '@/app/types/uset';

type NavListProps = {
  user: User | null;
};

export default function NavList({ user }: NavListProps) {
  const userName =
    user?.user_metadata?.name || user?.email?.split('@')[0] || 'user';
  return (
    <ul className="flex items-center gap-4">
      {user ? (
        <>
          <li className="flex items-center max-w-[120px]">
            <Icons.userIcon
              className="mr-1 flex-shrink:0"
              size="20"
              color="orange"
            />
            <span className="text-sm truncate">{userName}</span>
          </li>
          <li>
            <form action="/auth/signout" method="post">
              <Button size="sm" variant="outline" className="cursor-pointer">
                Logout
              </Button>
            </form>
          </li>
        </>
      ) : (
        <li className="flex">
          <Icons.userIcon
            className="mr-1 flex-shrink:0"
            size="20"
            color="orange"
          />
          <span className="text-sm truncate text-muted-foreground">guest</span>
        </li>
      )}
    </ul>
  );
}

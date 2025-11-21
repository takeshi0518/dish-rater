import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icon/icons';
import { User } from '@/app/types/uset';

type UserInfoProps = {
  user: User | null;
  variant?: 'compact' | 'full';
};

export default function UserInfo({ user, variant = 'compact' }: UserInfoProps) {
  const userName =
    user?.user_metadata?.name || user?.email?.split('@')[0] || 'user';

  if (variant === 'compact') {
    // モバイル用ヘッダー
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
            <span className="text-sm truncate text-muted-foreground">
              guest
            </span>
          </li>
        )}
      </ul>
    );
  }

  // サイドバー用
  return (
    <div className="flex flex-col gap-3">
      {user ? (
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Icons.userIcon size={20} color="orange" />
            <span className="text-sm font-medium truncate">{userName}</span>
          </div>
          <form action="/auth/signout" method="post">
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer w-full hover:bg-gray-50"
            >
              Logout
            </Button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-3 shadow-sm flex gap-2">
          <Icons.userIcon size={20} color="orange" />
          <span className="text-sm font-medium truncate">guest</span>
        </div>
      )}
    </div>
  );
}

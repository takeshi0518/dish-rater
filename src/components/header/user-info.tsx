'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icon/icons';
import { User } from '@/app/types/user';
import { signOut } from '@/app/actions/auth-actions';
import { useState } from 'react';

type UserInfoProps = {
  user: User | null;
  variant?: 'compact' | 'full';
};

export default function UserInfo({ user, variant = 'compact' }: UserInfoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const userName =
    user?.user_metadata?.name || user?.email?.split('@')[0] || 'user';

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.loaderCircle className="animate-spin w-5 h-5" />
                ) : (
                  'Logout'
                )}
              </Button>
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
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer w-full hover:bg-gray-50"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.loaderCircle className="animate-spin w-5 h-5" />
            ) : (
              'Logout'
            )}
          </Button>
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

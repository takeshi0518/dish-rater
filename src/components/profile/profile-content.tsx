'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

import { Icons } from '../Icon/icons';
import { ProfileBio } from './profile-bio';
import DishCard from '../dish/dish-card';
import { DashboardDish } from '@/app/types/dish';
import { ProfilePageData } from '@/app/types/profile';
import ProfileEditModal from './profile-edit-modal';

type ProfileContentProps = {
  profile: ProfilePageData;
  dishes: DashboardDish[] | null;
  isOwnProfile: boolean;
};

export default function ProfileContent({
  profile,
  dishes,
  isOwnProfile,
}: ProfileContentProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <div className="max-w-7xl mx-auto">
      {/* プロフィールヘッダー */}
      <div className="mb-6 p-4">
        <div className="flex items-center gap-4 mb-4">
          {/* アバター */}
          <div className="relative w-28 sm:w-35 h-28 sm:h-35 rounded-full bg-gray-200 flex items-center justify-center">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.username}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <Icons.userIcon className="w-10 h-10 text-gray-400" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">{profile.username}</h1>
            </div>
            {isOwnProfile && (
              <Button
                size="sm"
                variant="outline"
                className="h-8  px-4 text-xs cursor-pointer"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Icons.edit className="w-4 h-4" />
                プロフィールを編集
              </Button>
            )}

            {/* 統計情報 */}
            <div className="flex gap-4 mb-4 mt-4">
              {/* 投稿 */}
              <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
                <span className="text-xs md:text-base font-semibold">
                  {dishes?.length || 0}
                </span>
                <span className="text-xs md:text-sm text-gray-600">投稿</span>
              </div>

              {/* フォロワー */}
              <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
                <span className="text-xs md:text-base font-semibold">0</span>
                <span className="text-xs md:text-sm text-gray-600">
                  フォロワー
                </span>
              </div>

              {/* フォロー中 */}
              <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
                <span className="text-xs md:text-base font-semibold">0</span>
                <span className="text-xs md:text-sm text-gray-600">
                  フォロー中
                </span>
              </div>
            </div>

            {/* 自己紹介 */}
          </div>
        </div>
        {profile.bio && <ProfileBio bio={profile.bio} />}
      </div>

      {/* 投稿グリッド */}
      {dishes && dishes.length > 0 ? (
        <div className="grid grid-cols-3 gap-0.5">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">まだ投稿がありません</p>
          {isOwnProfile && (
            <p className="text-gray-400 mt-2">
              最初の料理を投稿してみませんか？
            </p>
          )}
        </div>
      )}

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
      />
    </div>
  );
}

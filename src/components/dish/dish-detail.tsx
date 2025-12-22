'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

import { Icons } from '@/components/Icon/icons';
import { Dish } from '@/app/types/dish';
import Link from 'next/link';
import { DishDetailActions } from './dish-detail-actions';

type DishDetailProps = {
  dish: Dish;
  onShare?: () => void;
  onClose?: () => void;
  isEditable: boolean;
  userName?: string;
  avatarUrl?: string | null;
};

function DishUserInfo({
  dish,
  username,
  avatarUrl,
}: {
  dish: Dish;
  username?: string;
  avatarUrl?: string | null;
}) {
  if (!username) return null;

  return (
    <div className="p-4 border-b">
      <Link
        href={`/profile/${dish.user_id}`}
        className="flex items-center gap-3 hover:opacity-70 transition-opacity"
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={username}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <Icons.userIcon className="w-6 h-6 text-gray-400" />
          )}
        </div>
        <span className="font-semibold text-sm">{username}</span>
      </Link>
    </div>
  );
}

function DishImage({
  dish,
  onShare,
  onClose,
  isEditable,
}: {
  dish: Dish;
  onShare?: () => void;
  onClose?: () => void;
  isEditable: boolean;
}) {
  return (
    <div className="w-full relative">
      {/* 閉じるボタン */}
      {dish.image_url ? (
        <div className="relative w-full aspect-square">
          <Image
            src={dish.image_url}
            alt={dish.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}
      {onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/90 hover:bg-white z-10 cursor-pointer"
        >
          <Icons.close className="w-5 h-5" />
        </Button>
      )}
      {isEditable && (
        <DishDetailActions
          onShare={onShare}
          onEdit={() => console.log('onEdit')}
          onDelete={() => console.log('onDelete')}
        />
      )}
    </div>
  );
}

function DishInfo({ dish }: { dish: Dish }) {
  return (
    <>
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Icons.calendar className="w-4 h-4" />
          <time className="text-sm md:text-base">
            {new Date(dish.created_at).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>
      {/* タイトルとレーティング */}
      <div className="p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl mb-4">{dish.name}</h1>
        {/* 店名または作った人 */}
        {dish.source_type === 'restaurant' && dish.restaurant_name && (
          <p className="text-sm text-gray-600 mb-2">
            📍 {dish.restaurant_name}
          </p>
        )}
        {dish.source_type === 'homemade' && dish.chef_name && (
          <p className="text-sm text-gray-600 mb-2">👨‍🍳 {dish.chef_name}</p>
        )}

        {dish.rating !== null && (
          <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
            <Icons.star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg">{dish.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
    </>
  );
}

function DishDescription({ description }: { description: string | null }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 60;
  const shouldTruncate = description && description.length > MAX_LENGTH;

  return (
    <>
      {description && (
        <div className="p-4 md:p-6">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {isExpanded || !shouldTruncate
              ? description
              : `${description.slice(0, MAX_LENGTH)}...`}
          </p>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-medium text-muted-foreground cursor-pointer"
            >
              {isExpanded ? '閉じる' : '続きを読む'}
            </button>
          )}
        </div>
      )}
    </>
  );
}

function DishTags({ tags }: { tags: string[] | null }) {
  return (
    <>
      {tags && tags.length > 0 && (
        <div className="p-4 md:p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">タグ</h3>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function DishesDetail({
  dish,
  onShare,
  onClose,
  isEditable,
  userName,
  avatarUrl,
}: DishDetailProps) {
  return (
    <div className="bg-white w-full md:shadow-sm">
      <div className="flex flex-col">
        {/* 料理画像 */}
        <DishImage
          dish={dish}
          onShare={onShare}
          onClose={onClose}
          isEditable={isEditable}
        />
        <div className="w-full">
          <DishUserInfo dish={dish} username={userName} avatarUrl={avatarUrl} />
          {/* 料理情報*/}
          <DishInfo dish={dish} />
          {/* 説明文 */}
          <DishDescription description={dish.description} />
          {/* タグ */}
          <DishTags tags={dish.tags} />
        </div>
      </div>
    </div>
  );
}

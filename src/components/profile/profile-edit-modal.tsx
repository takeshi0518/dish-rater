'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import type { Profile } from '@/app/types/dish';
import { Label } from '../ui/label';

import { Icons } from '../Icon/icons';

type ProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
};

export default function ProfileEditModal({
  isOpen,
  onClose,
  profile,
}: ProfileEditModalProps) {
  const [username, setUserName] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setIsLoading(false);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>プロフィール編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">ユーザー名</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
              required
            />
          </div>
          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">自己紹介</Label>
            <Textarea
              id="bio"
              value={bio!}
              onChange={(e) => setBio(e.target.value)}
              placeholder="自己紹介文"
              required
            />
          </div>
          {/* Avatar URL */}
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">プロフィール画像URL</Label>
            <Input
              id="avatarUrl"
              type="url"
              value={avatarUrl!}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          {/* Button */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Icons.loaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                '保存'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import type { Profile } from '@/app/types/dish';

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>フォームの中身</div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import type { Profile } from '@/app/types/dish';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Icons } from '../Icon/icons';
import { createClient } from '@/lib/supabase/client';

type ProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
};

function UserNameInput({
  username,
  setUserName,
}: {
  username: string;
  setUserName: Dispatch<SetStateAction<string>>;
}) {
  return (
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
  );
}

function BioInput({
  bio,
  setBio,
}: {
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
}) {
  return (
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
  );
}

function AvatarUrlInput({
  uploadMode,
  setUploadMode,
  previewUrl,
  avatarUrl,
  setAvatarUrl,
  handleFileChange,
}: {
  uploadMode: 'upload' | 'url';
  setUploadMode: Dispatch<SetStateAction<'upload' | 'url'>>;
  previewUrl: string;
  avatarUrl: string;
  setAvatarUrl: Dispatch<SetStateAction<string>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="avatarUrl">プロフィール画像</Label>
        <div className="flex gap-2 mb-2">
          <Button
            type="button"
            variant={uploadMode === 'upload' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadMode('upload')}
          >
            ファイルをアップロード
          </Button>
          <Button
            type="button"
            variant={uploadMode === 'url' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadMode('url')}
          >
            URLを入力
          </Button>
        </div>
        {uploadMode === 'upload' && (
          <div className="space-y-2">
            <Input type="file" accept="image/*" onChange={handleFileChange} />

            {previewUrl && (
              <div className="mt-2 flex justify-center">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            )}
          </div>
        )}
        {uploadMode === 'url' && (
          <Input
            type="url"
            value={avatarUrl!}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
        )}
      </div>
    </>
  );
}

function ProfileEditModalButton({
  onClose,
  isLoading,
}: {
  onClose: () => void;
  isLoading: boolean;
}) {
  return (
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
  );
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  profile,
}: ProfileEditModalProps) {
  const router = useRouter();
  const [username, setUserName] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '');

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadMode, setUploadMode] = useState<'url' | 'upload'>('url');

  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = await createClient();
      let finalAvatarUrl = avatarUrl;

      if (uploadMode === 'upload' && avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${profile.id}/avatar.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile, {
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        finalAvatarUrl = urlData.publicUrl;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          username: username,
          bio: bio,
          avatar_url: finalAvatarUrl || null,
        })
        .eq('id', profile.id);

      if (error) {
        throw error;
      }

      toast.success('プロフィールを更新しました');
      onClose();

      router.refresh();
    } catch (error: any) {
      console.error('更新エラー', error);

      if (error.code === '23505') {
        toast.error('このユーザー名は既に使用されています');
      } else {
        toast.error('更新に失敗しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>プロフィール編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Username */}
          <UserNameInput username={username} setUserName={setUserName} />
          {/* Bio */}
          <BioInput bio={bio} setBio={setBio} />
          {/* Avatar URL */}
          <AvatarUrlInput
            uploadMode={uploadMode}
            setUploadMode={setUploadMode}
            previewUrl={previewUrl}
            avatarUrl={avatarUrl}
            setAvatarUrl={setAvatarUrl}
            handleFileChange={handleFileChange}
          />
          {/* Button */}
          <ProfileEditModalButton onClose={onClose} isLoading={isLoading} />
        </form>
      </DialogContent>
    </Dialog>
  );
}

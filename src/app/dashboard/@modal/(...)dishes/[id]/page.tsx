'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

import { createClient } from '@/lib/supabase/client';
import DishesDetail from '@/components/dish/dish-detail';
import { DishDetail } from '@/app/types/dish';

type Props = {
  params: Promise<{ id: string }>;
};

export default function DishModalPage({ params }: Props) {
  const router = useRouter();
  const [dish, setDish] = useState<DishDetail | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await params;

      const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: dishData, error } = await supabase
        .from('dishes')
        .select(
          `
          id,
          name,
          rating, 
          description, 
          image_url, 
          source_type, 
          restaurant_name, 
          chef_name, 
          tags, 
          user_id,
          created_at,
          profiles:user_id(username, avatar_url)
          `
        )
        .eq('id', id)
        .single();

      if (error || !dishData) {
        router.push('/dashboard');
        return;
      }

      const isOwn = user?.id === dishData.user_id;

      setDish(dishData as DishDetail);
      setIsOwnProfile(isOwn);
      setId(id);
    };

    fetchData();
  }, [params, router]);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  if (!dish) {
    return null;
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/dishes/${id}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success('リンクをコピーしました');
    } catch (error) {
      toast.error('コピーに失敗しました。');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl w-full p-0 max-h-[95vh] md:max-h-[80vh] overflow-y-auto rounded-none">
        <DialogTitle className="sr-only">料理の詳細</DialogTitle>
        <DishesDetail
          dish={dish}
          onShare={handleShare}
          onClose={handleClose}
          isEditable={isOwnProfile}
          userName={dish.profiles?.username}
          avatarUrl={dish.profiles?.avatar_url}
        />
      </DialogContent>
    </Dialog>
  );
}

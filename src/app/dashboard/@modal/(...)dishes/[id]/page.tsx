'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { Icons } from '@/components/Icon/icons';
import { createClient } from '@/lib/supabase/client';
import DishesDetail from '@/components/dish/dish-detail';

type Dish = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  tags: string[] | null;
  rating: number | null;
  source_type: 'restaurant' | 'homemade' | 'other';
  restaurant_name: string | null;
  chef_name: string | null;
  created_at: string;
  updated_at: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export default function DishModalPage({ params }: Props) {
  const router = useRouter();
  const [dish, setDish] = useState<Dish | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const fetchParams = async () => {
      const { id } = await params;
      setId(id);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchDish = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        router.push('/dashboard');
        return;
      }

      setDish(data);
    };

    fetchDish();
  }, [id, router]);

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
      <DialogContent className="max-w-7xl w-full p-0 mx-auto">
        <DialogTitle className="sr-only">料理の詳細</DialogTitle>
        <DishesDetail dish={dish} onShare={handleShare} />
      </DialogContent>
    </Dialog>
  );
}

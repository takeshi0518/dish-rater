'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

import { createClient } from '@/lib/supabase/client';
import DishesDetail from '@/components/dish/dish-detail';
import { Dish } from '@/app/types/dish';

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
      <DialogContent className="max-w-3xl w-full p-0 max-h-[95vh] overflow-y-auto rounded-none">
        <DialogTitle className="sr-only">料理の詳細</DialogTitle>
        <DishesDetail dish={dish} onShare={handleShare} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

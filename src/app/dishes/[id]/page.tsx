'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';

import DishesDetail from '@/components/dish/dish-detail';
import { createClient } from '@/lib/supabase/client';
import { Dish } from '@/app/types/dish';

type Props = {
  params: Promise<{ id: string }>;
};

export default function DishDetailPage({ params }: Props) {
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl w-full p-0 mx-auto">
        <DialogTitle className="sr-only">料理の詳細</DialogTitle>
        <DishesDetail dish={dish} />
      </DialogContent>
    </Dialog>
  );
}

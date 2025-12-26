import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import DishesDetail from '@/components/dish/dish-detail';
import { DishDetail } from '@/app/types/dish';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Icons } from '@/components/Icon/icons';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DishDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: dish, error } = await supabase
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

  if (error || !dish) {
    notFound();
  }

  return (
    <div className="container bg-gray-50">
      {/* 戻るボタン */}
      <div>
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <Icons.arrowLeft className="w-4 h-4 mr-2" />
            ダッシュボードに戻る
          </Button>
        </Link>
      </div>

      {/* 詳細コンテンツ */}
      <div className="container mx-auto max-w-2xl">
        <DishesDetail dish={dish as DishDetail} />
      </div>
    </div>
  );
}

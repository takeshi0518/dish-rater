'use server';

import { createSupabaseServerClient } from './supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteDish(imageUrl: string | null, dishId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'ログインが必要です' };
  }
  try {
    //画像を削除
    if (imageUrl) {
      const urlParts = imageUrl.split('/');
      const bucketIndex = urlParts.indexOf('dishes');

      if (bucketIndex !== -1) {
        const filePath = urlParts.slice(bucketIndex + 1).join('/');

        const { error: storageError } = await supabase.storage
          .from('dishes')
          .remove([filePath]);

        if (storageError) {
          console.error('画像削除エラー', storageError);
        }
      }
    }

    //データベースから削除
    const { error } = await supabase
      .from('dishes')
      .delete()
      .eq('id', dishId)
      .eq('user_id', user.id);

    if (error) throw error;

    //キャッシュをクリア
    revalidatePath('/dashboard');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('削除エラー', error);
    return { error: '削除しました' };
  }
}

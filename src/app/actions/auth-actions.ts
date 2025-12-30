'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function signOut() {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out error:', error);
    throw new Error('ログアウトに失敗しました');
  }

  revalidatePath('/', 'layout');

  redirect('/');
}

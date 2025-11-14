'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './server';

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Sign Upに失敗しました: ', error.message);
    redirect('/signup');
  }
  redirect('/login');
}

export async function signIn(email: string, password: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign Outに失敗しました: ', error.message);
  }
  redirect('/login');
}

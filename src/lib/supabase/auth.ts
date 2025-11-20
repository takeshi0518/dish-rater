'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './server';

export async function signUp(email: string, password: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }
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

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { signIn, signUp } from '@/lib/supabase/auth';
import { type LoginFormValue, type SignupFormValue } from '../types';
import { createClient } from '@/lib/supabase/client';

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({
    login: false,
    signup: false,
    google: false,
    github: false,
  });
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginFormValue) => {
    try {
      setIsLoading((prev) => ({ ...prev, login: true }));
      setError(null);

      await signIn(data.email, data.password);
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('予期しないエラーが発生しました。');
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, login: false }));
    }
  };

  const signup = async (data: SignupFormValue) => {
    try {
      setIsLoading((prev) => ({ ...prev, signup: true }));
      setError(null);

      await signUp(data.email, data.password);
      router.push('/confirm-email');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('予期しないエラーが発生しました。');
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, signup: false }));
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, google: true }));
      setError(null);

      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('予期しないエラーが発生しました。');
      }
    }
  };

  const loginWithGithub = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, github: true }));
      setError(null);

      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('予期しないエラーが発生しました。');
      }
    }
  };

  return {
    login,
    signup,
    loginWithGoogle,
    loginWithGithub,
    isLoading,
    error,
  };
}

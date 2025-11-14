import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { signIn, signUp } from '@/lib/supabase/auth';
import { type LoginFormValue, type SignupFormValue } from '../types';

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginFormValue) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupFormValue) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return {
    login,
    signup,
    isLoading,
    error,
  };
}

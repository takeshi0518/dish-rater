'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { signUp } from '@/lib/supabase/auth';
import { Icons } from '@/components/Icon/icons';
import { signupSchema, SignupFormValue } from '../types';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValue>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: SignupFormValue) {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      await signUp(formData);
    } catch (error) {
      console.error('サインアップエラー:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          type="email"
          placeholder="youremail@example.com"
          {...register('email')}
        />
        <div className="min-h-5">
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">パスワード</Label>
        <Input id="password" type="password" {...register('password')} />
        <div className="min-h-5">
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">パスワード確認</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        <div className="min-h-5">
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Icons.loaderCircle className="h-5 w-5 animate-spin" />
        ) : (
          '登録'
        )}
      </Button>
    </form>
  );
}

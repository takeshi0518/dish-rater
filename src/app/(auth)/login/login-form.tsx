'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Icons } from '@/components/Icon/icons';
import { loginSchema, LoginFormValue } from '../types';
import { useAuth } from '../hooks/use-auth';

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: LoginFormValue) {
    await login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="min-h-[60px] mb-4">
        {error && (
          <div className="bg-red-100 text-red-700 text-sm rounded mb-4 p-4">
            {error}
          </div>
        )}
      </div>
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

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer"
      >
        {isLoading ? (
          <Icons.loaderCircle className="w-5 h-5 animate-spin" />
        ) : (
          'ログイン'
        )}
      </Button>
    </form>
  );
}

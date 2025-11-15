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
  const { login, loginWithGoogle, isLoading, error } = useAuth();
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* {エラー表示} */}
        <div className="min-h-[60px] mb-4">
          {error && (
            <div className="bg-red-100 text-red-700 text-sm rounded mb-4 p-4">
              {error}
            </div>
          )}
        </div>

        {/* {メールアドレス} */}
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

        {/* {パスワード} */}
        <div className="space-y-2">
          <Label htmlFor="password">パスワード</Label>
          <Input id="password" type="password" {...register('password')} />
          <div className="min-h-5">
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* {ログインボタン} */}
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

      {/* {区切り線} */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            または
          </span>
        </div>
      </div>

      {/* {OAuthボタン} */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="cursor-pointer">
          <Icons.github />
          Github
        </Button>
        <Button
          onClick={loginWithGoogle}
          variant="outline"
          className="cursor-pointer"
        >
          <Icons.google />
          Google
        </Button>
      </div>
    </>
  );
}

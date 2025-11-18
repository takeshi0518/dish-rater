'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { useAuth } from '../hooks/use-auth';
import { Icons } from '@/components/Icon/icons';
import { signupSchema, SignupFormValue } from '../types';

export default function SignupForm() {
  const { signup, loginWithGoogle, loginWithGithub, isLoading, error } =
    useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValue>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: SignupFormValue) {
    await signup(data);
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

        {/* {サインアップボタン} */}
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading.signup}
        >
          {isLoading.signup ? (
            <Icons.loaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            '登録'
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
        <Button
          onClick={loginWithGithub}
          variant="outline"
          className="cursor-pointer"
        >
          {isLoading.github ? (
            <Icons.loaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <Icons.github />
              Github
            </div>
          )}
        </Button>
        <Button
          onClick={loginWithGoogle}
          variant="outline"
          className="cursor-pointer"
        >
          {isLoading.google ? (
            <Icons.loaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              <Icons.google />
              Google
            </span>
          )}
        </Button>
      </div>
    </>
  );
}

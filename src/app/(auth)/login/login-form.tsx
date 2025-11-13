'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Icons } from '@/components/Icon/icons';
import { signIn } from '@/lib/supabase/auth';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email({ message: '有効なメールアドレスを入力してください' }),

  password: z.string().min(1, 'パスワードは必須です'),
});

type LoginFormValue = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: LoginFormValue) {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      await signIn(formData);
    } catch (error) {
      console.error('サインインエラー:', error);
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

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer"
      >
        {isSubmitting ? (
          <Icons.loaderCircle className="w-5 h-5 animate-spin" />
        ) : (
          'ログイン'
        )}
      </Button>
    </form>
  );
}

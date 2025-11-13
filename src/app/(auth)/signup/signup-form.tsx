'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { signUp } from '@/lib/supabase/auth';

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, 'メールアドレスは必須です')
      //非推奨？
      .email({ message: '有効なメールアドレスを入力してください' }),

    password: z
      .string()
      .min(1, 'パスワードは必須です')
      .min(8, 'パスワードは8文字以上である必要があります'),

    confirmPassword: z.string().min(1, 'パスワード確認は必須です'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

type SignupFormValue = z.infer<typeof signupSchema>;

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

    await signUp(formData);
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

      <Button type="submit" className="w-full cursor-pointer">
        {isSubmitting ? '登録中...' : '登録'}
      </Button>
    </form>
  );
}

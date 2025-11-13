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

    comfirmPassword: z.string().min(1, 'パスワード確認は必須です'),
  })
  .refine((data) => data.password === data.comfirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

export default function SignupForm() {
  return (
    <form action={signUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="youremail@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">パスワード</Label>
        <Input id="password" name="password" type="password" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">パスワード確認</Label>
        <Input id="password" name="password" type="password" />
      </div>

      <Button type="submit" className="w-full cursor-pointer">
        登録
      </Button>
    </form>
  );
}

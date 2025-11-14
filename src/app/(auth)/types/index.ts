import { z } from 'zod';

export const signupSchema = z
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

export type SignupFormValue = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email({ message: '有効なメールアドレスを入力してください' }),

  password: z.string().min(1, 'パスワードは必須です'),
});

export type LoginFormValue = z.infer<typeof loginSchema>;

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return '予期しないエラーが発生しました。';
  }

  const errorMessage: Record<string, string> = {
    // ログイン関連
    'Invalid login credentials':
      'メールアドレスまたはパスワードが間違っています',
    'Email not confirmed': 'メールアドレスの確認が完了していません',

    // サインアップ関連
    'User already registered': 'このメールアドレスは既に登録されています',
    'Password should be at least 6 characters':
      'パスワードは6文字以上である必要があります',
    'Signup requires a valid password': 'パスワードを入力してください',

    // OAuth関連
    'Provider not enabled': 'この認証方法は現在利用できません',
  };

  return (
    errorMessage[error.message] ||
    'エラーが発生しました。もう一度お試しください。'
  );
}

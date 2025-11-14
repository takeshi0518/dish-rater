import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Icons } from '@/components/Icon/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ConfirmEmailPage() {
  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Icons.mailCheck className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-xl sm:text-2xl">
          メールを確認してください
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-center text-gray-600">
        <p className="text-sm">
          登録したメールアドレスに確認メールを送信しました。
        </p>
        <p className="text-sm">
          メール内のリンクをクリックして登録を完了してください。
        </p>

        <div className="pt-4 border-t text-sm text-gray-500">
          <p>メールが届かない場合は迷惑メールフォルダを確認ください。</p>
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex justify-end">
        <Link href="/login">
          <Button variant="outline" className="w-full">
            ログインページへ
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

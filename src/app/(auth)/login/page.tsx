import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Icons } from '@/components/Icon/icons';
import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>アカウントにログインしてください</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <LoginForm />
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground text-center w-full">
          アカウントをお持ちでない方は
          <Link href="/signup" className="underline ml-1 hover:text-primary">
            こちら
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

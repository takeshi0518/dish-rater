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
import SignupForm from './signup-form';

export default function Signup() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>アカウントを作成してください</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <SignupForm />
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground text-center w-full">
          すでにアカウントをお持ちでない方は
          <Link href="/login" className="underline ml-1 hover:text-primary">
            こちら
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

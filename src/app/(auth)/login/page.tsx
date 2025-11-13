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

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="cursor-pointer">
            <Icons.github />
            Github
          </Button>
          <Button variant="outline" className="cursor-pointer">
            <Icons.google />
            Google
          </Button>
        </div>
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

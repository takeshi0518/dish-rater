import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MainLogo } from '@/components/layout/main-logo';

export default function Home() {
  return (
    <main>
      <header className="fixed top-0 left-0 w-full z-50 p-4">
        <MainLogo />
      </header>
      <div className="flex flex-col md:flex-row justify-center items-center h-full min-h-screen gap-5 px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-8">dish-rater</h1>
          <p className="text-sm md:text-base lg:text-xl mb-2">
            さまざまな料理を評価して記録できます。
          </p>
          <p className="text-sm md:text-base lg:text-xl mb-5">
            さっそくはじめましょう！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto cursor-pointer"
              >
                Signup
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-[300px] lg:max-w-[600px]">
          <Image
            src="/img/dummy-image.png"
            alt="dummy"
            className="w-full h-auto"
            sizes="(max-width: 768px) 300px, 600px"
            width={600}
            height={600}
          />
        </div>
      </div>
    </main>
  );
}

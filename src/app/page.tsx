import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/Icon/icons';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col md:flex-row justify-center items-center h-full min-h-screen gap-5 px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-8">
            <Icons.utensils
              size={32}
              className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14"
              color="orange"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl">dish-rater</h1>
          </div>
          <p className="text-sm md:text-base lg:text-xl mb-2">
            さまざまな料理を評価して記録できます。
          </p>
          <p className="text-sm md:text-base lg:text-xl mb-5">
            さっそくはじめましょう！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="w-full sm:w-auto cursor-pointer"
                variant="outline"
              >
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
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                料理を見る
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-[300px] lg:max-w-[600px]">
          <Image
            src="/img/dish-rater-mockup.webp"
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

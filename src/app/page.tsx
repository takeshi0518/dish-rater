import Image from 'next/image';
import { MainLogo } from '@/components/main-log';

export default function Home() {
  return (
    <main>
      <header className="fixed top-0 left-0 w-full z-50 p-4">
        <MainLogo />
      </header>
      <div className="flex justify-center items-center h-full min-h-screen gap-5">
        <div className="text-center">
          <h1 className="text-5xl mb-4">dish-rater</h1>
          <p className="text-2xl">さまざまな料理を評価して記録できます。</p>
          <p className="text-2xl mb-5">さっそくはじめましょう！</p>
          <button>ログイン or サインアップ</button>
        </div>
        <div>
          <Image
            src="/img/dummy-image.png"
            alt="dummy"
            width={600}
            height={600}
          />
        </div>
      </div>
    </main>
  );
}

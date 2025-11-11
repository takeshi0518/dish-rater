import { MainLogo } from '@/components/main-log';
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>
        <div className="flex flex-col justify-center items-center h-full min-h-screen p-4">
          <MainLogo className="mb-8" />
          {children}
        </div>
      </main>
    </div>
  );
}

import { MainLogo } from '@/components/main-log';
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="p-4">
        <MainLogo />
      </header>
      <main>
        <div className="flex justify-center items-center h-full min-h-screen p-4">
          {children}
        </div>
      </main>
    </div>
  );
}

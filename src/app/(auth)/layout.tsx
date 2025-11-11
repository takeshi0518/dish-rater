import { MainLogo } from '@/components/main-log';
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>
        <MainLogo />
      </header>
      <main>{children}</main>
    </div>
  );
}

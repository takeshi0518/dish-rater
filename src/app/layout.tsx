import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'dish-rater',
  description: '料理を評価・記録できるアプリ',
};

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={roboto_mono.className}>{children}</body>
    </html>
  );
}

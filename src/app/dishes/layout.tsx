import type { Metadata } from 'next';
import Navigation from '../../components/header/navigation';

export const metadata: Metadata = {
  title: 'みんなの料理 | dish-rater',
  description: 'みんなが投稿した料理を閲覧・評価できるプラットフォーム',
  openGraph: {
    title: 'みんなの料理 | dish-rater',
    description: 'みんなが投稿した料理を閲覧・評価できるプラットフォーム',
    type: 'website',
  },
};

export default function DishDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" bg-gray-50 flex items-center justify-center p-6">
      {children}
    </main>
  );
}

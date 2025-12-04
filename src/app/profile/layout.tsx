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

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Navigation />
      <main className=" bg-gray-50 flex-1 overflow-auto p-2 pt-20 md:pt-6">
        {children}
      </main>
    </div>
  );
}

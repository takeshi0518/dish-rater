import type { Metadata } from 'next';
import Navbar from '../../components/header/nav-bar';

export const metadata: Metadata = {
  title: 'みんなの料理 | dish-rater',
  description: 'みんなが投稿した料理を閲覧・評価できるプラットフォーム',
  openGraph: {
    title: 'みんなの料理 | dish-rater',
    description: 'みんなが投稿した料理を閲覧・評価できるプラットフォーム',
    type: 'website',
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Navbar />
      <main className=" bg-gray-50 flex-1 overflow-auto p-6 pt-28 md:pt-6">
        {children}
      </main>
    </div>
  );
}

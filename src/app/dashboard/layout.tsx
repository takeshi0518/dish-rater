import type { Metadata } from 'next';

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
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}

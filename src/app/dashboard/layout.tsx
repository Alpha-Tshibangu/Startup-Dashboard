import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn',
  robots: {
    index: false,
    follow: false
  }
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className='bg-background min-h-screen'>{children}</div>;
}

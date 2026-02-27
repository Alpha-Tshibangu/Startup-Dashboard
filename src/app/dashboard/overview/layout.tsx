import OverViewPage from '@/features/overview/components/overview';
import React from 'react';

export default function OverViewLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <OverViewPage />;
}

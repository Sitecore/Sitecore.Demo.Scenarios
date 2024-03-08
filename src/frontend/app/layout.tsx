import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sitecore Demo Scenarios',
  description: 'Sitecore Demo Scenarios',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-brand-refresh">{children}</body>
    </html>
  );
}

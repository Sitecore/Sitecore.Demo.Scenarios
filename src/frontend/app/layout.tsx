import type { Metadata } from 'next';
import './globals.css';
import NavBar from './components/NavBar';

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
      <body className="flex bg-brand-refresh">
        <NavBar />
        {children}
      </body>
    </html>
  );
}

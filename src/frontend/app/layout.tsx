import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SidebarContextProvider } from './context/sidebar';
import { SavedScenariosContextProvider } from './context/savedScenarios';
import { getAllScenarios } from '@/api/queries/scenarios';

export const metadata: Metadata = {
  title: 'Sitecore Demo Scenarios',
  description: 'Sitecore Demo Scenarios',
};

const AvenirNext = localFont({
  src: [
    {
      path: './fonts/AvenirNextLTPro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNextLTPro-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNextLTPro-Demi.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNextLTPro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-avenir-next',
  fallback: [
    'OpenSans',
    'Helvetica',
    'Arial',
    'system-ui',
    '-apple-system',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
  ],
});

const SFMono = localFont({
  src: [
    {
      path: './fonts/SFMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-sf-mono',
  fallback: ['monospace'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scenarios = await getAllScenarios();

  return (
    <html lang="en">
      <body
        className={`flex bg-white-dark text-black-light ${AvenirNext.variable} ${SFMono.variable} font-sans`}
      >
        <SavedScenariosContextProvider scenarios={scenarios}>
          <SidebarContextProvider>{children}</SidebarContextProvider>
        </SavedScenariosContextProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';

import Script from 'next/script';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/app/_components/theme-provider';

const APP_KEY = process.env.NEXT_PUBLIC_NAVER_APP_KEY;

const pretendard = localFont({
  src: './fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// const notoSans = Noto_Sans_KR({
//   variable: '--font-noto-sans',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Moa',
  description: '모아',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <Script
        strategy="afterInteractive"
        // https 와 http 모두 지원
        src={`http://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${APP_KEY}`}
      ></Script>
      <body className={`${geistSans.variable} ${geistMono.variable} ${pretendard.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="white" enableSystem disableTransitionOnChange>
          <main className="bg-gray-200 min-h-screen">
            <section className="max-w-[600px] mx-auto bg-white min-h-[inherit]">{children}</section>
            <Toaster richColors />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

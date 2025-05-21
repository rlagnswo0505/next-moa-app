import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';

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
      <body className={`${geistSans.variable} ${geistMono.variable} ${pretendard.className} antialiased`}>
        <main className="bg-gray-200 mx-auto min-h-screen max-w-screen">
          <section className="max-w-[600px] mx-auto bg-white min-h-[inherit]">{children}</section>
        </main>
      </body>
    </html>
  );
}

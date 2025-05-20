import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSans = Noto_Sans_KR({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

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
    <html lang="en">
      <body className={`${notoSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="bg-gray-200 mx-auto min-h-screen max-w-screen">
          <section className="max-w-[600px] mx-auto bg-white min-h-[inherit]">{children}</section>
        </main>
      </body>
    </html>
  );
}

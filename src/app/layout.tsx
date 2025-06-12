import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';

import Script from 'next/script';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/app/_components/theme-provider';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  let { data, error } = await supabase.rpc('get_main_deal_list', {
    p_user_lat: 37.5665,
    p_user_lng: 126.978,
    p_category_id: null,
    p_keyword: '',
    p_sort_by: 'distance',
    p_limit_cnt: 10,
    p_offset_cnt: 1,
  });
  if (error) console.error(error);
  else console.log(data);

  return (
    <html lang="kr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${pretendard.className} antialiased bg-gray-200`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <main className="min-h-screen h-full">
            <section className="max-w-[600px] mx-auto bg-white min-h-[inherit]">{children}</section>
            <Toaster richColors />
          </main>
        </ThemeProvider>
        <Script
          strategy="beforeInteractive"
          // https 와 http 모두 지원
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${APP_KEY}&submodules=geocoder`}
          async
        ></Script>
      </body>
    </html>
  );
}

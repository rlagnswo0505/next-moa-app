import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 flex items-center justify-center">
        <Link href="/home" className="text-2xl font-bold">
          MOA 홈으로
        </Link>
      </section>
      <footer className="pb-5 px-3">
        <Button size="lg" className="w-full rounded-full h-12 bg-moa hover:bg-moa-foreground" asChild>
          <Link href="/my-address">내 위치 설정하고 시작하기</Link>
        </Button>
      </footer>
    </div>
  );
}

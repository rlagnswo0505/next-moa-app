import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import async from './../../app/(beforeLogin)/page';

export async function createClient() {
  const cookieStore = await cookies();

  // 새로 구성된 쿠키로 서버의 Supabase 클라이언트를 생성합니다.
  // 이는 사용자의 세션을 유지하는 데 사용될 수 있습니다.
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // `setAll` 메소드는 서버 컴포넌트에서 호출되었습니다.
          // 사용자의 세션을 새로 고치는 미들웨어가 있는 경우,
          // 이 부분은 무시할 수 있습니다.
        }
      },
    },
  });
}

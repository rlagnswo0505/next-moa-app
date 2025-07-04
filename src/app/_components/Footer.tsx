'use client';

import { Home, Search, User, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

const Footer = () => {
  const segment = useSelectedLayoutSegments();

  console.log('Current segment:', segment);

  if (segment[0] === 'coupon' && segment.length > 1) {
    return null;
  }

  if (segment[0] === 'cart' || segment[0] === 'store') {
    return null;
  }

  return (
    <footer>
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-sm z-50 mx-auto max-w-[600px] border-t">
        <ul className="flex justify-between items-center h-15 text-xs font-bold">
          <li className="w-full h-full hover:bg-muted-foreground/10">
            <Link href="/home" className={'w-full h-full flex flex-col items-center justify-center ' + (segment[0] === 'home' ? 'text-moa' : 'text-muted-foreground/50')}>
              <Home />
              <span>홈</span>
            </Link>
          </li>
          <li className="w-full h-full hover:bg-muted-foreground/10">
            <Link href="/coupon" className={'w-full h-full flex flex-col items-center justify-center ' + (segment[0] === 'coupon' ? 'text-moa' : 'text-muted-foreground/50')}>
              <Utensils />
              <span>식사권</span>
            </Link>
          </li>
          <li className="w-full h-full hover:bg-muted-foreground/10">
            <Link href="/search" className={'w-full h-full flex flex-col items-center justify-center ' + (segment[0] === 'search' ? 'text-moa' : 'text-muted-foreground/50')}>
              <Search />
              <span>검색</span>
            </Link>
          </li>
          <li className="w-full h-full hover:bg-muted-foreground/10">
            <Link href="/my-page" className={'w-full h-full flex flex-col items-center justify-center ' + (segment[0] === 'my-page' ? 'text-moa' : 'text-muted-foreground/50')}>
              <User />
              <span>마이페이지</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;

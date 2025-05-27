'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
  // 서치바 현재 스크롤 위치 맨위 벗어나면 shadow 넣기
  const [isShadow, setIsShadow] = React.useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsShadow(true);
    } else {
      setIsShadow(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={'py-2.5 px-4 fixed top-11 left-0 right-0 bg-white z-10 w-full mx-auto max-w-[600px]' + (isShadow ? ' shadow-md' : '')}>
      <form className="w-full relative">
        <div className="bg-[#f9f9f9] flex items-center justify-start rounded-full">
          <Search className="text-muted-foreground/50 absolute top-2 left-2 transform" />
          <Input className="rounded-full pl-10 border-[#f2f2f2]" name="q" placeholder="매장, 음식 검색" />
        </div>
      </form>
    </section>
  );
};

export default SearchBar;

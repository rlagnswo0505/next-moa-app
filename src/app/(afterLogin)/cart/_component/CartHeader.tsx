'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React, { useRef } from 'react';

const CartHeader = () => {
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
    <section className={'py-2.5 px-4 fixed top-11 left-0 right-0 bg-white z-10 w-full flex justify-between items-center mx-auto max-w-[600px]' + (isShadow ? ' shadow-md' : '')}>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-bold leading-none 
        cursor-pointer
        peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          전체 선택
        </label>
      </div>
      <Button variant={'ghost'} size={'sm'} className="text-muted-foreground text-xs font-bold">
        상품삭제
      </Button>
    </section>
  );
};

export default CartHeader;

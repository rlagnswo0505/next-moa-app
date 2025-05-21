'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header
      className="fixed top-0 left-0
    right-0
    bg-white
    z-50
    mx-auto
    max-w-[600px]
    border-b
    flex
    items-center
    justify-between
    px-1.5
    h-11
  "
    >
      <Button variant="ghost" size="icon" className="w-11 h-11" onClick={handleBack} aria-label="뒤로가기">
        <ArrowLeft />
      </Button>
      <h4 className="text-md font-bold">아무거나</h4>
      <div>
        <Button variant="ghost" size="icon" className="relative w-11 h-11">
          <ShoppingCart />
          <span
            className="absolute
            top-1
            right-1
            w-4
            h-4
            rounded-full
            bg-moa
            text-white
            text-[10px]
            flex
            items-center
            justify-center"
          >
            1
          </span>
        </Button>
        <Button variant="ghost" size="icon" className="relative w-11 h-11">
          <Bell />
          <span
            className="absolute
            top-2
            right-2
            w-2
            h-2
            rounded-full
            bg-moa
            text-white
            text-[10px]
            flex
            items-center
            justify-center"
          />
        </Button>
      </div>
    </header>
  );
};

export default Header;

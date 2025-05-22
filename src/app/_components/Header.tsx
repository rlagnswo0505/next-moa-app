'use client';

import { Button } from '@/components/ui/button';
import useCartStore from '@/store/cart';
import { ArrowLeft, Bell, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter();

  const { cartItems } = useCartStore((state: any) => state);

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
      <div className="flex items-center w-22">
        <Button variant="ghost" size="icon" className="w-11 h-11" onClick={handleBack} aria-label="뒤로가기">
          <ArrowLeft />
        </Button>
      </div>
      <h4 className="text-md font-bold">아무거나</h4>
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="relative w-11 h-11" asChild>
          <Link href="/cart">
            <ShoppingCart />
            {cartItems.length > 0 && (
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
                {cartItems.length}
              </span>
            )}
          </Link>
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

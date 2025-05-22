'use client';

import { Button } from '@/components/ui/button';
import useCartStore from '@/store/cart';
import { ArrowLeft, Bell, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

const pages = [
  {
    title: '',
    param: 'home',
  },
  {
    title: '장바구니',
    param: 'cart',
  },
  {
    title: '주문하기',
    param: 'order',
  },
  {
    title: '결제하기',
    param: 'payment',
  },
  {
    title: '식사권',
    param: 'coupon',
  },
  {
    title: '검색',
    param: 'search',
  },
  {
    title: '마이페이지',
    param: 'my-page',
  },
];

const Header = () => {
  const params = useSelectedLayoutSegment();

  const pageTitle = pages.find((page) => page.param === params)?.title;

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
        {params === 'home' ? (
          <Button variant={'ghost'} className="font-bold">
            모아
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="w-11 h-11" onClick={handleBack} aria-label="뒤로가기">
            <ArrowLeft />
          </Button>
        )}
      </div>
      <h4 className="text-md font-bold">{pageTitle}</h4>
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

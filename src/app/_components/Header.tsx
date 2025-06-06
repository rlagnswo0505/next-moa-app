'use client';

import { Button } from '@/components/ui/button';
import { useAddressStore } from '@/store/adress';
import useCartStore from '@/store/cart';
import { ArrowLeft, Bell, ChevronRight, ShoppingCart } from 'lucide-react';
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
  {
    title: '내 위치 설정',
    param: 'my-address',
  },
];

const Header = ({ rightButton = true }) => {
  const params = useSelectedLayoutSegment();

  const { addresses } = useAddressStore((state) => state);

  const checkedAddress = addresses.find((addr) => addr.checked);

  const pageTitle = pages.find((page) => page.param === params)?.title;

  const router = useRouter();

  const { cartItems } = useCartStore((state: any) => state);

  const handleBack = () => {
    router.back();
  };

  const handleMoveToAddress = () => {
    router.push('/my-address');
  };

  console.log('Header params:', params);

  if (!params) {
    return null;
  }

  return (
    <>
      <div className="h-11 w-full"></div>
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
        <div className="flex items-center flex-1">
          {params === 'home' ? (
            <Button
              variant={'ghost'}
              className="font-bold
              max-w-40"
              onClick={handleMoveToAddress}
            >
              <span
                // 넓이 넘어가면 ... 처리
                className="overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {checkedAddress ? checkedAddress.name : '위치 설정'}
              </span>
              <ChevronRight />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="w-11 h-11" onClick={handleBack} aria-label="뒤로가기">
              <ArrowLeft />
            </Button>
          )}
        </div>
        <h4 className="text-md font-bold">{pageTitle}</h4>
        <div className="flex justify-end items-center flex-1">
          {rightButton && (
            <Button variant="ghost" size="icon" className="relative w-11 h-11" asChild>
              <Link href="/cart">
                <ShoppingCart />
                {cartItems.length > 0 && (
                  <span
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-moa text-white text-[10px]
                              flex
                              items-center
                              justify-center"
                  >
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </Button>
          )}
          {rightButton && (
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
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

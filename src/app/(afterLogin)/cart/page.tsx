'use client';

import React, { useEffect, useState } from 'react';
import CartHeader from './_component/CartHeader';
import { Card, CardContent } from '@/components/ui/card';

import CartFooter from './_component/CartFooter';
import PointSection from './_component/PointSection';
import CartItem from './_component/CartItem';
import TotalPriceSection from './_component/TotalPriceSection';
import useCartStore from '@/store/cart';
import { CartItem as ICartItem } from '@/model/CartItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ConfirmDialog from '@/app/_components/ConfirmDialog';

const Cart = () => {
  const { cartItems, removeCheckedItems, removeFromCart } = useCartStore((state: any) => state);

  const [isOpen, setIsOpen] = useState(false);
  const [isMulti, setIsMulti] = useState<'multi' | 'single'>('multi');
  const [removeId, setRemoveId] = useState<null | number>(null);

  const handleChangeOpen = (e: boolean) => {
    setIsOpen(e);
  };

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleClinkRemoveBtn = (
    {
      state = 'multi',
      id = null,
    }: {
      state: 'multi' | 'single';
      id: number | null;
    } = { state: 'multi', id: null } // 기본값 설정
  ) => {
    setIsOpen(true);
    setIsMulti(state);
    setRemoveId(id);
  };

  // 확인 버튼 클릭 시 실행되는 함수
  const handleConfirm = () => {
    if (isMulti === 'multi') {
      removeCheckedItems();
    } else {
      removeId && removeFromCart(removeId);
    }
    setIsOpen(false);
  };

  // 총 할인전 금액 cartItem 의 price * quantity
  const totalOriginalPrice = cartItems.reduce((acc: number, cartItem: ICartItem) => {
    return acc + cartItem.originalPrice * cartItem.quantity;
  }, 0);

  // 총 할인된 금액
  const totalPrice = cartItems.reduce((acc: number, cartItem: ICartItem) => {
    return acc + cartItem.price * cartItem.quantity;
  }, 0);

  // 총 할인 금액 cartItem 의 discount * quantity
  const totalDiscount = cartItems.reduce((acc: number, cartItem: any) => {
    return acc + (cartItem.originalPrice - cartItem.price) * cartItem.quantity;
  }, 0);

  // 적립금 사용 금액
  const [discountPoint, setDiscountPoint] = useState(0);

  // 보유 포인트
  const defaultPoint = 1000;

  // 적립금 값 변경 핸들러
  const onChangeDiscountPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);

    // 음수 방지 및 NaN 방지
    if (isNaN(value) || value < 0) value = 0;

    // 보유 포인트보다 크면 최대치로 맞춤
    if (value > defaultPoint) value = defaultPoint;

    setDiscountPoint(value);
  };

  // 사용한 적립금 취소 핸들러
  const handleDiscountPointCancel = () => {
    setDiscountPoint(0);
  };

  // 총 주문 금액
  const finalPrice = totalPrice - discountPoint;

  // 보유 포인트에서 사용한 포인트를 뺀 값
  const totalPoint = defaultPoint - discountPoint;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
        <h1 className="text-2xl font-bold">장바구니가 비어있습니다.</h1>
        <p className="text-sm text-muted-foreground">식권을 담아보세요!</p>
        <Button asChild size="lg" className="rounded-full ">
          <Link href="/home">식권 보러 가기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-200">
      <CartHeader
        handleClickRemoveBtn={() => {
          handleClinkRemoveBtn({ state: 'multi', id: null });
        }}
      />
      <section className="flex flex-col mt-16">
        <Card className="rounded-sm shadow-none">
          <CardContent
            // 마지막 자식 빼고 border-b
            className="flex flex-col gap-4
            [&>*:not(:last-child)]:border-b
            [&>*:not(:last-child)]:pb-4
            px-0"
          >
            {cartItems.map((cartItem: ICartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} handleClickRemoveBtn={() => handleClinkRemoveBtn({ state: 'single', id: cartItem.id })} />
            ))}
          </CardContent>
        </Card>
      </section>
      <PointSection totalPoint={totalPoint} discountPoint={discountPoint} defaultPoint={defaultPoint} onChangeDiscountPoint={onChangeDiscountPoint} handleDiscountPointCancel={handleDiscountPointCancel} />
      <TotalPriceSection totalOriginalPrice={totalOriginalPrice} totalDiscount={totalDiscount} discountPoint={discountPoint} finalPrice={finalPrice} />
      <CartFooter />
      <ConfirmDialog open={isOpen} onOpenChange={handleChangeOpen} onConfirm={handleConfirm} confirmText={'삭제'} title={'상품을 삭제하시겠어요?'} subTitle={''} />
    </div>
  );
};

export default Cart;

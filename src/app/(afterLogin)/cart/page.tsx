'use client';

import React, { useEffect, useState } from 'react';
import CartHeader from './_component/CartHeader';
import { Card, CardContent } from '@/components/ui/card';

import CartFooter from './_component/CartFooter';
import PointSection from './_component/PointSection';
import CartItem from './_component/CartItem';
import TotalPriceSection from './_component/TotalPriceSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ConfirmDialog from '@/app/_components/ConfirmDialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCartItems } from './lib/getCartItems';
import { removeFromCart, updateCartItemQty } from './lib/cartMutations';
import useCartCheckStore from '@/store/cart';

const Cart = () => {
  // 실제로는 로그인 유저의 uuid를 받아와야 함
  const userId = '00000000-0000-0000-0000-000000000003'; // TODO: 실제 유저 id로 교체
  const {
    data: cartItems,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['cartItems', userId],
    queryFn: () => getCartItems({ p_user_id: userId }),
    staleTime: 60 * 1000,
  });

  const queryClient = useQueryClient();

  // 단일 삭제 mutation
  const removeMutation = useMutation({
    mutationFn: ({ p_cart_item_id }: { p_cart_item_id: number }) => removeFromCart({ p_user_id: userId, p_cart_item_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems', userId] });
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isMulti, setIsMulti] = useState<'multi' | 'single'>('multi');
  const [removeId, setRemoveId] = useState<null | number>(null);
  const { checkedMap, clearChecked } = useCartCheckStore();

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
  const handleConfirm = async () => {
    if (isMulti === 'multi') {
      // checkedMap에서 true인 cart_item_id만 추출
      const selectedIds = Object.entries(checkedMap)
        .filter(([_, checked]) => checked)
        .map(([id]) => Number(id));
      // 여러 개 삭제: Promise.all로 병렬 삭제
      await Promise.all(selectedIds.map((cart_item_id) => removeMutation.mutateAsync({ p_cart_item_id: cart_item_id })));
      clearChecked();
    } else {
      if (removeId) {
        removeMutation.mutate({ p_cart_item_id: removeId });
      }
    }
    setIsOpen(false);
  };

  // 총 할인전 금액 cartItem 의 price * quantity
  const totalOriginalPrice = cartItems?.reduce((acc: number, cartItem: any) => {
    return acc + (cartItem.originalPrice ?? 0) * cartItem.quantity;
  }, 0);

  // 총 할인된 금액
  const totalPrice = cartItems?.reduce((acc: number, cartItem: any) => {
    return acc + (cartItem.deal_price ?? 0) * cartItem.quantity;
  }, 0);

  // 총 할인 금액 cartItem 의 discount * quantity
  const totalDiscount = cartItems?.reduce((acc: number, cartItem: any) => {
    return acc + (cartItem.originalPrice ?? 0 - cartItem.deal_price ?? 0) * cartItem.quantity;
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
  const finalPrice = totalPrice ? totalPrice - discountPoint : 0;

  // 보유 포인트에서 사용한 포인트를 뺀 값
  const totalPoint = defaultPoint - discountPoint;

  // cartItems 변경 시 checkedMap 정합성 보정
  useEffect(() => {
    if (!cartItems) return;
    const cartItemIds = cartItems.map((item: any) => item.cart_item_id);
    // checkedMap에 cartItems에 없는 id가 있으면 제거
    const newCheckedMap = Object.fromEntries(cartItemIds.map((id: number) => [id, checkedMap[id] || false]));
    if (JSON.stringify(newCheckedMap) !== JSON.stringify(checkedMap)) {
      // checkedMap을 강제로 업데이트
      clearChecked();
      // true인 것만 다시 체크
      Object.entries(newCheckedMap).forEach(([id, checked]) => {
        if (checked) useCartCheckStore.getState().toggleChecked(Number(id));
      });
    }
  }, [cartItems]);

  // 주문 버튼 클릭 시: checkedMap에서 true인 cart_item_id만 추출
  const handleOrder = () => {
    const selectedIds = Object.entries(checkedMap)
      .filter(([_, checked]) => checked)
      .map(([id]) => Number(id));
    // 주문 API에 selectedIds만 넘기면 됨
    console.log('주문할 cart_item_id:', selectedIds);
  };

  if (!cartItems || cartItems.length === 0) {
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

  console.log('Cart items:', cartItems);

  return (
    <div className="flex flex-col gap-4 bg-gray-200">
      <CartHeader
        handleClickRemoveBtn={() => {
          handleClinkRemoveBtn({ state: 'multi', id: null });
        }}
        cartItems={cartItems}
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
            {cartItems.map((cartItem: any) => (
              <CartItem key={cartItem.cart_item_id} cartItem={cartItem} handleClickRemoveBtn={() => handleClinkRemoveBtn({ state: 'single', id: cartItem.cart_item_id })} />
            ))}
          </CardContent>
        </Card>
      </section>
      <PointSection totalPoint={totalPoint} discountPoint={discountPoint} defaultPoint={defaultPoint} onChangeDiscountPoint={onChangeDiscountPoint} handleDiscountPointCancel={handleDiscountPointCancel} />
      <TotalPriceSection totalOriginalPrice={totalOriginalPrice} totalDiscount={totalDiscount} discountPoint={discountPoint} finalPrice={finalPrice} />
      <CartFooter onOrder={handleOrder} />
      <ConfirmDialog open={isOpen} onOpenChange={handleChangeOpen} onConfirm={handleConfirm} confirmText={'삭제'} title={'상품을 삭제하시겠어요?'} subTitle={''} />
    </div>
  );
};

export default Cart;

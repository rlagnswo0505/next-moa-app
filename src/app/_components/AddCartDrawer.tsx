'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter } from '@/components/ui/drawer';
import Image from 'next/image';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import useCartStore from '@/store/cart';
import CounterButton from '@/app/(afterLogin)/cart/_component/CounterButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '@/app/(afterLogin)/cart/lib/cartMutations';

const userId = '00000000-0000-0000-0000-000000000003'; // TODO: 실제 유저 id로 교체

type Props = {
  open: boolean;
  handleChange: (e: boolean) => void;
  drawerItem: any;
  setDrawerItem: React.Dispatch<React.SetStateAction<any>>;
};

const AddCartDrawer = ({ open, handleChange, drawerItem, setDrawerItem }: Props) => {
  // 실제로는 로그인 유저의 uuid를 받아와야 함
  const queryClient = useQueryClient();

  // supabase rpc로 장바구니 담기
  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!drawerItem) throw new Error('상품 정보가 없습니다.');
      await addToCart({
        p_user_id: userId,
        p_deal_id: drawerItem.id || drawerItem.deal_id,
        p_deal_option_id: drawerItem.selected_option_id || null,
        p_qty: drawerItem.quantity || 1,
      });
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems', userId] });
      handleChange(false);
    },
    onError: (err: any) => {
      alert('장바구니 담기에 실패했습니다. ' + (err?.message || ''));
    },
  });

  const totalOriginalPrice = drawerItem?.originalPrice * drawerItem?.quantity;

  const totalPrice = drawerItem?.price * drawerItem?.quantity;

  // 장바구니에 담기
  const handleAddToCart = () => {
    addToCartMutation.mutate();
  };

  // 개수 증가
  const handleIncrease = () => {
    if (drawerItem) {
      setDrawerItem({ ...drawerItem, quantity: drawerItem.quantity + 1 });
    }
  };

  // 개수 감소
  const handleDecrease = () => {
    if (drawerItem && drawerItem.quantity > 1) {
      setDrawerItem({ ...drawerItem, quantity: drawerItem.quantity - 1 });
    }
  };

  useEffect(() => {
    // body 스크롤 잠금 해제
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, []);

  return (
    <Drawer open={open} onOpenChange={handleChange}>
      {drawerItem ? (
        <DrawerContent>
          <div className="mx-auto w-full max-w-[600px]">
            <DrawerHeader>
              {drawerItem.options.length > 0 && (
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="옵션을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>옵션</SelectLabel>
                      {drawerItem.options.map((option: any, index: number) => (
                        <SelectItem key={option.id} value={option.additional_price}>
                          {option.option_name} ({option.additional_price.toLocaleString()}원)
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </DrawerHeader>
            <div className="p-4">
              <div className="h-[200px]">
                <section className="flex items-start gap-4 pb-4">
                  <div className="min-w-20 min-h-20 w-20 h-20 rounded-md overflow-hidden">
                    <Image src={drawerItem.image} alt={drawerItem.menu} width={80} height={80} className="object-cover relative rounded-md w-full h-full" />
                  </div>
                  <div>
                    <h4 className="text-lg text-muted-foreground">[{drawerItem.store_name}]</h4>
                    <h4 className="text-lg font-bold">{drawerItem.title}</h4>
                  </div>
                </section>
                <section className="flex items-start justify-between border-y py-2 mt-2">
                  <div>
                    <span className="text-muted-foreground line-through">{totalOriginalPrice?.toLocaleString()}원</span>
                    <h4 className="text-xl font-bold">{totalPrice?.toLocaleString()}원</h4>
                  </div>
                  <div>
                    <CounterButton cartItem={drawerItem} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
                  </div>
                </section>
              </div>
            </div>
            <DrawerFooter>
              <div className="flex w-full">
                <Button size={'lg'} className="flex-1 rounded-full h-12" onClick={handleAddToCart}>
                  {totalPrice?.toLocaleString()}원 담기
                </Button>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      ) : (
        <DrawerContent>
          <h4 className="text-center text-muted-foreground">장바구니에 담긴 상품이 없습니다.</h4>
          <p className="text-center text-muted-foreground">상품을 선택하여 장바구니에 담아보세요.</p>
        </DrawerContent>
      )}
    </Drawer>
  );
};

export default AddCartDrawer;

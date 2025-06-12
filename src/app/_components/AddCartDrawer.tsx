'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter } from '@/components/ui/drawer';
import Image from 'next/image';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import useCartStore from '@/store/cart';
import CounterButton from '@/app/(afterLogin)/cart/_component/CounterButton';

type Props = {
  open: boolean;
  handleChange: (e: boolean) => void;
  drawerItem: any;
  setDrawerItem: React.Dispatch<React.SetStateAction<any>>;
};

const AddCartDrawer = ({ open, handleChange, drawerItem, setDrawerItem }: Props) => {
  const { addToCart } = useCartStore((state: any) => state);

  const totalOriginalPrice = drawerItem?.originalPrice * drawerItem?.quantity;

  const totalPrice = drawerItem?.price * drawerItem?.quantity;

  // 장바구니에 담기
  const handleAddToCart = () => {
    if (drawerItem) {
      addToCart(drawerItem);
      handleChange(false);
    }
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
                    <CounterButton cartItem={drawerItem} handleIncrease={handleIncrease} handleDecrese={handleDecrease} />
                  </div>
                </section>
              </div>
            </div>
            <DrawerFooter>
              <div className="flex items-end justify-between w-full gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center">
                    <div className="relative bg-primary rounded-full py-1 px-2 max-w-xs   text-sm">
                      <p className="text-white">추가 할인 5%</p>
                      {/* 아래쪽 꼬리 */}
                      <div className="absolute top-full left-6 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary"></div>
                      <div className="absolute top-full left-6 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-gray-200 -z-10 translate-y-px"></div>
                    </div>
                  </div>
                  <Button size={'lg'} className="rounded-full h-12" variant={'outline'}>
                    친구 초대
                  </Button>
                </div>
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

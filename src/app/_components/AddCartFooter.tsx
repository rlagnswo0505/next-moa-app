'use client';

import { Button } from '@/components/ui/button';
import { Coupon, DrawerItem } from '@/model/Coupon';
import useCartStore from '@/store/cart';
import React, { useState } from 'react';
import AddCartDrawer from './AddCartDrawer';

type Props = {
  coupon: Coupon;
};

const AddCartFooter = ({ coupon }: Props) => {
  const { addToCart } = useCartStore((state: any) => state);

  const [open, setOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState<DrawerItem | null>(null);

  const handleChange = (e: boolean) => {
    setOpen(e);
  };

  // Drawer에 아이템 추가
  const addDrawerItem = () => {
    if (coupon) {
      setDrawerItem({ ...coupon, quantity: 1, checked: true });
      setOpen(true);
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-sm z-50 mx-auto max-w-[600px] border-t h-15 flex items-center justify-center px-4">
      <Button size={'lg'} className="w-full rounded-full" onClick={addDrawerItem} disabled={!coupon}>
        장바구니 담기
      </Button>
      <AddCartDrawer open={open} handleChange={handleChange} drawerItem={drawerItem} setDrawerItem={setDrawerItem} />
    </footer>
  );
};

export default AddCartFooter;

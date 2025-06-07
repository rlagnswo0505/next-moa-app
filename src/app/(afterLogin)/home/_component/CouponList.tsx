'use client';

import { allCoupons } from '@/_data/allCoupon';
import AddCartDrawer from '@/app/_components/AddCartDrawer';
import { DrawerItem, Coupon } from '@/model/Coupon';

import { useState } from 'react';
import ProductCard from './ProductCard';

const CouponList = () => {
  const [open, setOpen] = useState(false);

  const [drawerItem, setDrawerItem] = useState<DrawerItem | null>(null);

  const handleChange = (e: boolean) => {
    setOpen(e);
  };

  // Drawer에 아이템 추가
  const addDrawerItem = (item: Coupon) => {
    setDrawerItem({ ...item, quantity: 1, checked: true });
    setOpen(true);
  };

  return (
    <>
      <div className="grid gap-2 grid-cols-2 mt-2">{allCoupons && allCoupons.map((coupon: Coupon) => <ProductCard key={coupon.id} coupon={coupon} addDrawerItem={addDrawerItem} />)}</div>
      <AddCartDrawer open={open} handleChange={handleChange} drawerItem={drawerItem} setDrawerItem={setDrawerItem} />
    </>
  );
};

export default CouponList;

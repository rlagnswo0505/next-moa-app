'use client';

import { allCoupons } from '@/_data/allCoupon';
import AddCartDrawer from '@/app/_components/AddCartDrawer';
import { DrawerItem, Coupon } from '@/model/Coupon';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
      <h2 className="font-bold text-lg">내 주변 할인 공구</h2>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground font-bold">
          <strong className="text-moa">30</strong>
          개의 공구
        </span>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-muted-foreground text-sm">정렬기준</span>
          <Select defaultValue="apple">
            <SelectTrigger className="w-fit min-w-[100px] border-none shadow-none font-bold cursor-pointer" size="sm">
              <SelectValue placeholder="정렬기준" />
            </SelectTrigger>
            <SelectContent side="bottom" align="end">
              <SelectGroup>
                <SelectItem value="apple">가까운 순</SelectItem>
                <SelectItem value="banana">저가순</SelectItem>
                <SelectItem value="blueberry">고가순</SelectItem>
                <SelectItem value="grapes">인기순</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-2 mt-2">{allCoupons && allCoupons.map((coupon: Coupon) => <ProductCard key={coupon.id} coupon={coupon} addDrawerItem={addDrawerItem} />)}</div>
      <AddCartDrawer open={open} handleChange={handleChange} drawerItem={drawerItem} setDrawerItem={setDrawerItem} />
    </>
  );
};

export default CouponList;

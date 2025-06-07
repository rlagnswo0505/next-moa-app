'use client';

import { allCoupons } from '@/_data/allCoupon';
import { Coupon } from '@/model/Coupon';
import React from 'react';
import DailyMenuCard from './DailyMenuCard';

const DailyMenuList = () => {
  const addDrawerItem = (item: Coupon) => {
    console.log('Add to cart:', item);
    // 여기에 장바구니에 아이템을 추가하는 로직을 구현하세요.
  };

  return <div className="grid gap-2 grid-cols-2 mt-2">{allCoupons && allCoupons.map((coupon: Coupon) => <DailyMenuCard key={coupon.id} coupon={coupon} addDrawerItem={addDrawerItem} />)}</div>;
};

export default DailyMenuList;

'use client';

import { allCoupons } from '@/_data/allCoupon';
import HorizonScroll from '@/app/_components/HorizonScroll';
import SearchBar from '@/app/_components/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { Coupon } from '@/model/Coupon';
import CouponCard from './_component/CouponCard';

type TabValue = 'available' | 'used' | 'expired';

const CouponPage = () => {
  const [tabValue, setTabValue] = React.useState<TabValue>('available');

  const availabedCoupons = allCoupons.filter((coupon) => coupon.state === 'available');

  const usedCoupons = allCoupons.filter((coupon) => coupon.state === 'used');

  const expiredCoupons = allCoupons.filter((coupon) => coupon.state === 'expired');

  const headerText = {
    available: `사용가능한 식사권이 ${availabedCoupons.length}개 있어요.`,
    used: `사용완료된 식사권이 ${usedCoupons.length}개 있어요.`,
    expired: `사용만료된 식사권이 ${expiredCoupons.length}개 있어요.`,
  };

  const handleTabChange = (value: string) => {
    setTabValue(value as TabValue);
  };

  return (
    <div className="flex flex-col gap-4">
      <section>
        <SearchBar />
      </section>
      <section className="pl-4 mt-14">
        <HorizonScroll />
      </section>
      <section>
        <h4 className="px-4 text-xl">{headerText[tabValue]}</h4>
        <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3 h-12 sticky top-11 bg-primary-foreground z-10">
            <TabsTrigger value="available">사용 가능 {availabedCoupons.length}</TabsTrigger>
            <TabsTrigger value="used">사용 완료 {usedCoupons.length}</TabsTrigger>
            <TabsTrigger value="expired">사용 만료{expiredCoupons.length}</TabsTrigger>
          </TabsList>
          <TabsContent value="available" className="p-3 pb-11">
            <div className="grid gap-2 grid-cols-2 mt-2">{availabedCoupons && availabedCoupons.map((coupon: Coupon) => <CouponCard key={coupon.id} coupon={coupon} state={tabValue} />)}</div>
          </TabsContent>
          <TabsContent value="used" className="p-3 pb-11">
            <div className="grid gap-2 grid-cols-2 mt-2">{usedCoupons && usedCoupons.map((coupon: Coupon) => <CouponCard key={coupon.id} coupon={coupon} state={tabValue} />)}</div>
          </TabsContent>
          <TabsContent value="expired" className="p-3 pb-11">
            <div className="grid gap-2 grid-cols-2 mt-2">{expiredCoupons && expiredCoupons.map((coupon: Coupon) => <CouponCard key={coupon.id} coupon={coupon} state={tabValue} />)}</div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default CouponPage;

'use client';

import { use } from 'react';
import React from 'react';

import Image from 'next/image';
import { allCoupons } from '@/_data/allCoupon';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { user } from '@/_data/user';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type Params = Promise<{ id: string }>;
const CouponDetail = ({ params }: { params: Params }) => {
  const { id } = use(params);

  console.log('id', id);

  const coupon = allCoupons?.find((item: any) => item.id === Number(id));

  if (!coupon) {
    return <div>쿠폰을 찾을 수 없습니다.</div>;
  }

  return (
    <div
      className="bg-neutral-200 flex flex-col gap-4
  [&>section]:bg-primary-foreground [&>section]:p-3    
    "
    >
      <section className="p-3 bg-primary-foreground">
        <div className="w-full h-120 relative rounded-lg overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bg-black flex justify-center items-center text-white p-3 gap-2 z-1 h-11">
            <span>남은 공구 시간</span>
            <Separator orientation="vertical" className="bg-white mx-2 z-2" />
            <span className="text-moa">{coupon.remainingTime} 남음</span>
          </div>
          <Image src={coupon.image} alt={coupon.menu} fill className="object-cover" />
          <Badge className="absolute bottom-2 right-2 bg-primary/50 text-lg">
            도보 {coupon.walkTime}분 ({coupon.distance})
          </Badge>
        </div>
        <div className="flex flex-col mt-2">
          <h5 className="text-muted-foreground text-xl">{coupon.store}</h5>
          <h4 className="font-bold text-xl">{coupon.menu}</h4>
          <p
            className="text-muted-foreground text-sm
          line-through"
          >
            {coupon.originalPrice.toLocaleString()}원
          </p>
          <div className="flex items-end gap-2 mt-2">
            <i className="text-moa font-bold text-xl">{coupon.discount}</i>
            <span>
              <strong className="text-2xl">{coupon.price.toLocaleString()}</strong>원
            </span>
            <span>({coupon.stock.toLocaleString()}개 남음)</span>
          </div>
          <div className="mt-2">서두르세요! 공구 수량이 얼마 남지 않았습니다.</div>
        </div>
      </section>
      <section>
        <h4 className="mb-2">{user.nickname}님을 위한 추천 딜</h4>
        <ScrollArea type="hover">
          <div className="flex items-center gap-4">
            {allCoupons.map((recommendItem) => (
              <div key={recommendItem.id} className="flex flex-col text-sm">
                <div className="w-25 h-25 rounded-lg overflow-hidden">
                  <Image src={recommendItem.image} alt={recommendItem.menu} width={100} height={100} className="object-cover" />
                </div>
                <h4 className="text-muted-foreground">{recommendItem.store}</h4>
                <h4 className="font-bold">{recommendItem.menu}</h4>
                <div className="flex justify-between items-center">
                  <span>{recommendItem.price.toLocaleString()}원</span>
                  <i className="text-moa font-bold">{recommendItem.discount}</i>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      </section>
      <section></section>
    </div>
  );
};

export default CouponDetail;

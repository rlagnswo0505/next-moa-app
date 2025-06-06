import React from 'react';
import { user } from '@/_data/user';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { allCoupons } from '@/_data/allCoupon';
import { Coupon } from '@/model/Coupon';

import Image from 'next/image';

const RecommendSection = () => {
  return (
    <section className="py-3 pl-3">
      <h4 className="mb-2 font-bold">{user.nickname}님을 위한 추천 딜</h4>
      <ScrollArea type="hover">
        <div className="flex items-center gap-4 pr-2">
          {allCoupons.map((recommendItem: Coupon) => (
            <div key={recommendItem.id} className="flex flex-col text-sm cursor-pointer group">
              <div className="w-25 h-25 rounded-lg overflow-hidden">
                <Image src={recommendItem.image} alt={recommendItem.menu} width={100} height={100} className="object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
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
  );
};

export default RecommendSection;

import React from 'react';

import { Badge } from '@/components/ui/badge';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { allCoupons } from '@/_data/allCoupon';

const layout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) => {
  const { id } = await params;

  const coupon = allCoupons?.find((item: any) => item.id === Number(id));

  if (!coupon) {
    return <div className="w-full h-[50dvh] flex justify-center items-center">쿠폰을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-4 bg-accent">
      <section
        className="p-4 bg-white
        flex flex-col items-center gap-2"
      >
        <h3 className="text-xl mt-10">[{coupon?.store}]</h3>
        <Card className="p-3 w-45 gap-2">
          <div className="w-full h-45 relative rounded-lg overflow-hidden">
            <Image
              src={coupon.image}
              alt="이미지"
              fill
              //  group-hover:scale-110
              className="object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
            />
            <Badge className="absolute top-2 left-2 bg-moa">{coupon.remainingTime} 남음</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground line-through">{coupon.originalPrice?.toLocaleString()}원</span>
            <i className="text-moa font-bold">{coupon.discount}</i>
          </div>
          <span className="font-bold text-xl">{coupon.price?.toLocaleString()}원</span>
        </Card>
        <div>
          <span>{coupon.menu}</span>
        </div>
        <div>{children}</div>
      </section>
    </div>
  );
};

export default layout;

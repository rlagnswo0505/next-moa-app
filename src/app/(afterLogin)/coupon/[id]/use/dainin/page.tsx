import { allCoupons } from '@/_data/allCoupon';
import { Badge } from '@/components/ui/badge';
import { CreditCard, RefreshCw } from 'lucide-react';
import React from 'react';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import CouponInput from '../_component/CouponInput';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: Promise<{ id: string }>;
};

const DainInPage = async ({ params }: Props) => {
  const { id } = await params;

  const coupon = allCoupons?.find((item: any) => item.id === Number(id));

  if (!coupon) {
    return <div className="w-full h-[50dvh] flex justify-center items-center">쿠폰을 찾을 수 없습니다.</div>;
  }

  const myCoupon = { ...coupon, expirationPeriod: '2025-08-31' };

  return (
    <>
      <section
        className="p-4 bg-white
        flex flex-col items-center gap-2"
      >
        <CouponInput />
        <span>유효기간 : {myCoupon.expirationPeriod}</span>
      </section>
      <section className="p-4 bg-white">
        <h4 className="font-bold text-xl">사용방법</h4>
        <ul className="flex flex-col gap-4 mt-4 font-bold p-4 bg-accent rounded-lg">
          <li className="flex items-center gap-2">
            <Badge className="bg-moa w-10 h-10">1</Badge>
            <span>매장에서 사장님께 사용 코드를 요청하고 입력해서 사용할 수 있어요.</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge className="bg-moa w-10 h-10">
              <CreditCard />
            </Badge>
            <span>유효기간 내 사용가능한 식사권은 모두 소진할 때까지 사용할 수 있어요.</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge className="bg-moa w-10 h-10">
              <RefreshCw />
            </Badge>
            <span>유효기간이 지난 식사권은 최대(7일)간 연장 요청을 할 수 있어요.</span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default DainInPage;

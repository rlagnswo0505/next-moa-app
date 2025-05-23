'use client';

import React from 'react';
import { allCoupons } from '../../home/page';

import Image from 'next/image';

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { id } = params;

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
        <div className="w-full h-45 relative rounded-lg overflow-hidden">
          <Image src={coupon.image} alt={coupon.menu} fill className="object-cover" />
        </div>
        <div>
          <h4>{coupon.menu}</h4>
          <h5></h5>
        </div>
      </section>
      <section></section>
      <section></section>
    </div>
  );
};

export default page;

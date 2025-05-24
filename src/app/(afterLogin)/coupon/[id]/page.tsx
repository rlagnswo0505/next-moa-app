'use client';

import { use } from 'react';
import React from 'react';

import Image from 'next/image';
import { allCoupons } from '@/_data/allCoupon';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { user } from '@/_data/user';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Ratings } from '@/app/_components/Rating';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { faker } from '@faker-js/faker';

const STAR_RATING = 4.3;
const REVIEW_COUNT = 1200;

const reviewImages = [
  {
    rating: 3.5,
    content: faker.lorem.sentence(),
    src: faker.image.url(),
    alt: faker.commerce.productName(),
  },
  {
    src: faker.image.url(),
    alt: faker.commerce.productName(),
  },
  {
    src: faker.image.url(),
    alt: faker.commerce.productName(),
  },
  {
    src: faker.image.url(),
    alt: faker.commerce.productName(),
  },
];

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
  [&>section]:bg-primary-foreground    
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
      <section className="py-3 pl-3">
        <h4 className="mb-2">{user.nickname}님을 위한 추천 딜</h4>
        <ScrollArea type="hover">
          <div className="flex items-center gap-4">
            {allCoupons.map((recommendItem) => (
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
      <section className="p-0">
        <Tabs defaultValue="menu" className="w-full bg-white">
          <TabsList className="grid w-full grid-cols-3 h-12 sticky top-11">
            <TabsTrigger value="menu">공구 메뉴</TabsTrigger>
            <TabsTrigger value="review">리뷰</TabsTrigger>
            <TabsTrigger value="info">정보</TabsTrigger>
          </TabsList>
          <TabsContent value="menu" className="p-3 min-h-dvh">
            <div>메뉴</div>
          </TabsContent>
          <TabsContent value="review" className="p-3 min-h-dvh">
            <div>
              <div className="flex items-center gap-2 my-10 justify-center">
                <Ratings rating={STAR_RATING} variant="yellow" />
                <div className="text-xl flex">
                  <strong>{STAR_RATING}</strong>
                  <div className="flex items-center gap-1 text-muted-foreground/50">
                    <strong>/ 5</strong>
                    <span className="text-sm">({REVIEW_COUNT.toLocaleString()})</span>
                  </div>
                </div>
              </div>
              {/* 이미지 6개 */}
              <ul className="grid grid-cols-4 gap-2 mt-2">
                {reviewImages.map((image, index) => (
                  <li key={index} className={'rounded-lg overflow-hidden cursor-pointer'}>
                    <AspectRatio ratio={1 / 1}>
                      <Image fill src={image.src} alt={image.alt} className=" object-cover" />
                      {index === 3 && <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-lg ">+ 더 보기</div>}
                    </AspectRatio>
                  </li>
                ))}
              </ul>
              <div></div>
            </div>
          </TabsContent>
          <TabsContent value="info" className="p-3 min-h-dvh">
            <div>정보</div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default CouponDetail;

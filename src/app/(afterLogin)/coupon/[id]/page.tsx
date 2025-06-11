'use client';

import { use } from 'react';
import React from 'react';

import Image from 'next/image';
import { allCoupons } from '@/_data/allCoupon';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import InfoTab from './_component/InfoTab';
import MenuTab from './_component/MenuTab';
import ReviewTab from './_component/ReviewTab';
import RecommendSection from './_component/RecommendSection';
import AddCartFooter from '@/app/_components/AddCartFooter';
import { useQuery } from '@tanstack/react-query';
import { getDealDetail } from './lib/getDealDetail';

/*
--------------------------------------------------
getDealDetail 반환 필드 설명
--------------------------------------------------

p_deal_id      : integer   // 조회할 딜 ID (파라미터)
id             : integer   // 딜 고유 ID
title          : text      // 딜 제목
description    : text      // 딜 상세 설명
price          : integer   // 판매가(할인가)
discount_rate  : integer   // 할인율(%)
original_price : integer   // 원가
stock          : integer   // 재고
status         : text      // 딜 상태
thumbnail_url  : text      // 대표 이미지 URL
images         : text[]    // 추가 이미지 URL 배열
options        : jsonb     // 옵션(옵션ID, 옵션명, 추가금액, 재고)
store_id       : integer   // 매장 ID
store_name     : text      // 매장명
store_address  : text      // 매장 주소
store_phone    : text      // 매장 연락처
store_latitude : numeric   // 매장 위도
store_longitude: numeric   // 매장 경도
category_id    : integer   // 카테고리 ID
category_name  : text      // 카테고리명
*/

type Params = Promise<{ id: string }>;
const CouponDetail = ({ params }: { params: Params }) => {
  const { id } = use(params);

  const { data, error, isLoading } = useQuery({
    queryKey: ['couponDetail', id],
    queryFn: () => getDealDetail({ p_deal_id: Number(id) }),
  });

  console.log('CouponDetail data:', data);

  if (isLoading) return <div className="text-center py-10">로딩 중...</div>;
  if (error) return <div className="text-center py-10 text-red-500">쿠폰 상세 정보를 불러오는 중 오류가 발생했습니다.</div>;
  const coupon = data[0];

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
            <span className="text-moa">{coupon?.remainingTime} 남음</span>
          </div>
          <Image src={coupon?.image || coupon?.thumbnail_url || '/placeholder.svg'} alt={coupon?.menu || coupon?.title || ''} fill className="object-cover" />
          <Badge className="absolute bottom-2 right-2 bg-primary/50 text-lg">
            도보 {coupon?.walkTime ?? '-'}분 ({coupon?.distance ?? '-'})
          </Badge>
        </div>
        <div className="flex flex-col mt-2">
          <h5 className="text-muted-foreground text-xl">{coupon?.store || coupon?.store_name}</h5>
          <h4 className="font-bold text-xl">{coupon?.menu || coupon?.title}</h4>
          <p
            className="text-muted-foreground text-sm
          line-through"
          >
            {coupon?.originalPrice?.toLocaleString?.() ?? coupon?.original_price?.toLocaleString?.() ?? ''}원
          </p>
          <div className="flex items-end gap-2 mt-2">
            <i className="text-moa font-bold text-xl">{coupon?.discount ?? coupon?.discount_rate ? `${coupon?.discount_rate}%` : ''}</i>
            <span>
              <strong className="text-2xl">{coupon?.price?.toLocaleString?.() ?? ''}</strong>원
            </span>
            <span>({coupon?.stock?.toLocaleString?.() ?? ''}개 남음)</span>
          </div>
          <div className="mt-2">서두르세요! 공구 수량이 얼마 남지 않았습니다.</div>
        </div>
      </section>
      <RecommendSection />
      <section className="p-0">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 sticky top-11 bg-primary-foreground z-10">
            <TabsTrigger value="menu">공구 메뉴</TabsTrigger>
            <TabsTrigger value="review">리뷰</TabsTrigger>
            <TabsTrigger value="info">정보</TabsTrigger>
          </TabsList>
          <TabsContent value="menu" className="p-3 pb-15">
            <MenuTab />
          </TabsContent>
          <TabsContent value="review" className="p-3 pb-15">
            <ReviewTab />
          </TabsContent>
          <TabsContent value="info" className="p-3 pb-15">
            <InfoTab />
          </TabsContent>
        </Tabs>
      </section>
      <AddCartFooter coupon={coupon} />
    </div>
  );
};

export default CouponDetail;

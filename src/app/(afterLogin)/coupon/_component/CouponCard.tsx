'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import React from 'react';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Coupon } from '@/model/Coupon';
import { MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type Props = {
  coupon: Coupon;
  state: 'available' | 'used' | 'expired'; // 쿠폰 상태
};

const CouponCard = ({ coupon, state }: Props) => {
  const router = useRouter();

  const handleMoveDetail = () => {
    router.push(`/coupon/${coupon.id}/use`);
  };

  const handleMoveMap = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    router.push(`/coupon/${coupon.id}/map`);
  };

  return (
    <Card className="w-full rounded-lg border-none gap-2 py-1 group cursor-pointer" onClick={handleMoveDetail}>
      <CardHeader className="border-b p-2">
        <div className="w-full h-45 relative rounded-lg overflow-hidden">
          <Image
            src={coupon.image}
            alt="이미지"
            fill
            //  group-hover:scale-110
            className="object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
          />
          {state === 'available' && <Badge className={'absolute top-2 left-2 bg-moa'}>{coupon.remainingTime} 남음</Badge>}
          {state === 'used' && <Badge className={'absolute top-2 left-2 bg-primary'}>사용 완료</Badge>}
          {state === 'expired' && <Badge className={'absolute top-2 left-2 bg-primary'}>3일 남음</Badge>}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-right text-white px-2 py-1">
            <span>
              도보 {coupon.walkTime}분 ({coupon.distance})
            </span>
          </div>
          {/* 투명 배경 넣기 */}
          {state !== 'available' && <div className="absolute inset-0 bg-white/30 flex items-center justify-center" />}
        </div>
        <div className="flex flex-col gap-1 ">
          <h4>{coupon.store}</h4>
          <p>{coupon.menu}</p>
          <i className="text-moa font-bold">{coupon.discount}</i>
          <div className="flex justify-between items-center">
            <span className="font-bold">{coupon.price?.toLocaleString()}원</span>
            <span className="text-muted-foreground line-through">{coupon.originalPrice?.toLocaleString()}원</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        {state === 'available' && (
          <div className="flex flex-col gap-2">
            <div className="px-2">
              <Button variant="ghost" className="w-full">
                사용하기
              </Button>
            </div>
            <Separator />
            <div className="px-2">
              <Button variant="ghost" className="w-full" onClickCapture={handleMoveMap}>
                <MapPin />
                매장 길찾기
              </Button>
            </div>
          </div>
        )}
        {state === 'used' && (
          <div className="flex flex-col gap-2 ">
            <span className="text-center text-muted-foreground">사용 일시 2025년 8월 1일</span>
            <Separator />
            <div className="px-2">
              <Button variant="ghost" className="w-full">
                리뷰 쓰기
              </Button>
            </div>
          </div>
        )}
        {state === 'expired' && (
          <div className="flex flex-col gap-2 px-2">
            <Button variant="ghost" className="w-full">
              연장 요청(7일)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CouponCard;

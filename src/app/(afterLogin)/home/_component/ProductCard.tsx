'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import React from 'react';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Coupon } from '@/model/Coupon';

type Props = {
  coupon: any;
  addDrawerItem: (item: Coupon) => void;
};

const ProductCard = ({ coupon, addDrawerItem }: Props) => {
  const router = useRouter();

  const handleMoveDetail = () => {
    router.push(`/coupon/${coupon.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the card
    addDrawerItem(coupon);
  };

  return (
    <Card className="w-full rounded-lg border-none gap-2 py-1 group cursor-pointer" onClick={handleMoveDetail}>
      <CardHeader className="border-b p-1 md:p-2">
        <div className="w-full h-45 relative rounded-lg overflow-hidden">
          {/* 
          FIXME: Image 컴포넌트가 next/image로 되어있는데, src가 null일 때 에러 발생
          <Image
            src={coupon.thumbnail_url ?? null}
            alt="이미지"
            fill
            //  group-hover:scale-110
            className="object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
          /> */}
          <img src={coupon.thumbnail_url ?? null} alt={coupon.title || '쿠폰 이미지'} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 ease-in-out" />
          <Badge className="absolute top-2 left-2 bg-moa">{coupon.remainingTime} 남음</Badge>
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-right text-white px-2 py-1">
            <span>
              도보 {coupon.walkTime}분 ({coupon.distance})
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <h4 className="text-muted-foreground">{coupon.store_name}</h4>
          <p>{coupon.title}</p>
          <i className="text-moa font-bold">{coupon.discount_rate}%</i>
          <div className="flex justify-between items-center">
            <span className="font-bold">{coupon.price?.toLocaleString()}원</span>
            <span className="text-muted-foreground line-through">{coupon.originalPrice?.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <Badge className="bg-accent text-muted-foreground rounded-sm">{coupon.stock}개 남음</Badge>
            <span>수량</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex justify-center items-center gap-2 border-b pb-2">
          <span className="text-moa">
            {coupon.participated}/{coupon.total}명
          </span>
          <span className="text-muted-foreground">참여 중</span>
        </div>
        <div className="px-1 mt-2 md:px-2">
          <Button variant="ghost" className="w-full" onClickCapture={handleAddToCart}>
            <ShoppingCart /> 장바구니 담기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

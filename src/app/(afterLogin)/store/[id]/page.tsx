import React from 'react';
import { store } from '@/_data/store';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuHeader from './_component/MenuHeader';
import CouponList from '../../home/_component/CouponList';
import { allCoupons } from '@/_data/allCoupon';
import DailyMenuCard from './_component/DailyMenuCard';
import { Coupon } from '@/model/Coupon';
import DailyMenuList from './_component/DailyMenuList';
import ReviewTab from '../../coupon/[id]/_component/ReviewTab';
import InfoTab from '../../coupon/[id]/_component/InfoTab';

type Props = {
  params: Promise<{ id: string }>;
};

const StorePage = async ({ params }: Props) => {
  const { id } = await params;

  console.log('Store ID:', id);

  const addDrawerItem = (item: Coupon) => {
    console.log('Add to cart:', item);
    // 여기에 장바구니에 아이템을 추가하는 로직을 구현하세요.
  };

  return (
    <div className="w-full">
      <section className="max-w-[600px] w-full h-60 overflow-hidden">
        <img src={store.image} alt={store.store} className="object-cover w-full h-full" />
      </section>
      <section className="h-40 absolute -mt-10 rounded-t-2xl w-full max-w-[600px] bg-white">
        <div className="p-4">
          <h1 className="font-bold text-xl">{store.store}</h1>
          <div className="flex items-center gap-1 mt-2">
            <Star className="fill-yellow-500 text-yellow-500 w-4 h-4" />
            <span>
              {store.rating} ({store.reviewCount > 100 ? '100+' : store.reviewCount} 리뷰)
            </span>
          </div>
          <Badge className="mt-2 text-muted-foreground" variant="secondary">
            도보 {store.walkTime}분 거리 ({store.distance})
          </Badge>
        </div>
        <Tabs defaultValue="menu" className="w-full mt-4 bg-white">
          <TabsList className="grid w-full grid-cols-3 h-12 sticky top-11 bg-primary-foreground z-10 px-4">
            <TabsTrigger value="menu">메뉴</TabsTrigger>
            <TabsTrigger value="review">리뷰</TabsTrigger>
            <TabsTrigger value="info">정보</TabsTrigger>
          </TabsList>
          <TabsContent value="menu" className="p-4  pb-11">
            <MenuHeader />
            <section id="groupPurchase">
              <h2 className="my-2 text-xl font-bold">할인 공구 메뉴</h2>
              <div className="w-full">
                <CouponList />
              </div>
            </section>
            <section id="menuDaily">
              <h2 className="my-2 text-xl font-bold">데일리 할인 메뉴</h2>
              <div className="w-full">
                <DailyMenuList />
              </div>
            </section>
          </TabsContent>
          <TabsContent value="review" className="p-4  pb-11">
            <ReviewTab />
          </TabsContent>
          <TabsContent value="info" className="p-4  pb-11">
            <InfoTab />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default StorePage;

import React from 'react';
import { store } from '@/_data/store';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  params: Promise<{ id: string }>;
};

const StorePage = async ({ params }: Props) => {
  const { id } = await params;

  console.log('Store ID:', id);

  return (
    <div className="w-full">
      <section className="max-w-[600px] w-full h-60 absolute overflow-hidden">
        <Image src={store.image} alt={store.store} fill className="object-cover w-full h-full relative" />
      </section>
      <section className="absolute mt-50 h-40 rounded-t-2xl w-full max-w-[600px] p-4 bg-white">
        <div>
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
        <Tabs defaultValue="menu" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3 h-12 sticky top-11 bg-primary-foreground z-10">
            <TabsTrigger value="menu">메뉴</TabsTrigger>
            <TabsTrigger value="review">리뷰</TabsTrigger>
            <TabsTrigger value="info">정보</TabsTrigger>
          </TabsList>
          <TabsContent value="menu" className="p-3  pb-11"></TabsContent>
          <TabsContent value="review" className="p-3  pb-11"></TabsContent>
          <TabsContent value="info" className="p-3  pb-11"></TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default StorePage;

'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { DailyItem } from '@/model/Daily';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  item: DailyItem;
};

const DailyCard = ({ item }: Props) => {
  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`/store/${id}`);
  };

  return (
    <Card className="p-0 w-40 gap-0 cursor-pointer rounded-md hover:shadow-xl" onClick={() => handleCardClick(item.id)}>
      <CardContent className="p-1 flex flex-col justify-between border-b gap-4">
        <div>
          <h4 className="w-full text-ellipsis overflow-hidden whitespace-nowrap">{item.store}</h4>
          {item.menus.length === 1 ? (
            <p className="text-muted-foreground w-full text-ellipsis overflow-hidden whitespace-nowrap">{item.menus[0]}</p>
          ) : (
            <p className="text-muted-foreground w-full text-ellipsis overflow-hidden whitespace-nowrap">
              {item.menus[0]} 외 {item.menus.length - 1}개
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Star className="fill-yellow-500 text-yellow-500 w-4 h-4" />
          <span>
            {item.rating} ({item.review > 100 ? '100+' : item.review} 리뷰)
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-start p-1">
        {item.discount.min === item.discount.max ? (
          <Badge className="bg-blue-500 text-white text-md" variant="secondary">
            {item.discount.min}% 할인
          </Badge>
        ) : (
          <Badge className="bg-blue-500 text-white text-md" variant="secondary">
            {item.discount.min}~{item.discount.max}% 할인
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default DailyCard;

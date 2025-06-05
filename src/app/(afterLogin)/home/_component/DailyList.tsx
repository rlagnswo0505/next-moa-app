import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Star } from 'lucide-react';
import React from 'react';

const dailyList = [
  {
    id: 1,
    store: '라오니 피자 강남점',
    menus: ['치즈스틱', '콜라', '피자'],
    rating: 4.5,
    review: 123,
    discount: { min: 7, max: 10 },
  },
  {
    id: 2,
    store: '홍콩반점',
    menus: ['짜장면', '짬뽕', '탕수육'],
    rating: 4.2,
    review: 98,
    discount: { min: 5, max: 15 },
  },
  {
    id: 3,
    store: '스시로 강남점',
    menus: ['초밥', '우동', '사케'],
    rating: 4.8,
    review: 200,
    discount: { min: 10, max: 20 },
  },
  {
    id: 4,
    store: '버거킹',
    menus: ['와퍼', '감자튀김'],
    rating: 4.0,
    review: 150,
    discount: { min: 5, max: 10 },
  },
  {
    id: 5,
    store: '스타벅스',
    menus: ['아메리카노', '카페라떼'],
    rating: 4.6,
    review: 300,
    discount: { min: 10, max: 15 },
  },
];

const DailyList = () => {
  return (
    <ScrollArea type="hover">
      <div className="flex items-center gap-2 pr-2">
        {dailyList.map((item) => (
          <Card className="p-0 w-40 gap-0">
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
        ))}
      </div>
      <ScrollBar orientation="horizontal" hidden />
    </ScrollArea>
  );
};

export default DailyList;

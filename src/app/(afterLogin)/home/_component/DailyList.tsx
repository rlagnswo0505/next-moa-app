import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React from 'react';
import DailyCard from './DailyCard';
import { DailyItem, DailyList as IDailyList } from '@/model/Daily';

const dailyList: IDailyList = [
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
        {dailyList.map((item: DailyItem) => (
          <DailyCard key={item?.id} item={item} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" hidden />
    </ScrollArea>
  );
};

export default DailyList;

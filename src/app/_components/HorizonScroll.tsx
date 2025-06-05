import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const categories = [
  { id: 1, name: '전체' },
  { id: 2, name: '한식' },
  { id: 3, name: '중식' },
  { id: 4, name: '일식' },
  { id: 5, name: '양식' },
  { id: 6, name: '패스트푸드' },
  { id: 7, name: '디저트' },
  { id: 8, name: '음료' },
  { id: 9, name: '주류' },
  { id: 10, name: '기타' },
];

const HorizonScroll = () => {
  return (
    <ScrollArea type="hover">
      <div className="flex items-center gap-2 h-8 pr-2">
        {categories.map((category) => (
          <Badge key={category.id} variant="outline" className={'h-full text-[#2f3438] bg-muted border-none rounded-full font-bold cursor-pointer px-3.5 hover:bg-moa/70 hover:text-white transition-all ' + (category.id === 1 ? 'bg-moa text-white' : '')}>
            {category.name}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" hidden />
    </ScrollArea>
  );
};

export default HorizonScroll;

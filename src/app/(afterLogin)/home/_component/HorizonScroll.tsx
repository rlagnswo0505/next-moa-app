import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
type Props = {
  categories: {
    id: number;
    name: string;
  }[];
};

const HorizonScroll = ({ categories }: Props) => {
  return (
    <ScrollArea type="hover">
      <div className="flex items-center gap-2 h-8">
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

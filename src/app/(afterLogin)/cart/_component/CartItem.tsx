import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import CounterButton from './CounterButton';
import { CartItem as ICartItem } from '@/model/CartItem';

type Props = {
  cartItem: ICartItem;
};

const CartItem = ({ cartItem }: Props) => {
  return (
    <div key={cartItem?.id} className="flex items-start justify-between gap-4 px-4">
      <Checkbox id="terms" />
      <div className="flex-1">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 relative overflow-hidden rounded-lg">
            <Image src={cartItem?.image} alt={cartItem?.menu} fill className="object-cover" />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <h4 className="font-bold">{cartItem.menu}</h4>
            <p className="font-bold text-muted-foreground">{cartItem.store}</p>
            <div className="flex items-center justify-between">
              <CounterButton cartItem={cartItem} />
              <span className="text-moa font-bold">{cartItem.price?.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <X />
      </Button>
    </div>
  );
};

export default CartItem;

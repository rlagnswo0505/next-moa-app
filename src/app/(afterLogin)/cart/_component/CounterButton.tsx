'use client';

import { Button } from '@/components/ui/button';
import { CartItem } from '@/model/CartItem';
import useCartStore from '@/store/cart';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

type Props = {
  cartItem: CartItem;
  handleIncrease: () => void;
  handleDecrese: () => void;
};

const CounterButton = ({ cartItem, handleIncrease, handleDecrese }: Props) => {
  return (
    <div className="flex items-center justify-between gap-2 border rounded-md p-1 w-40">
      <Button variant={'ghost'} size={'icon'} className="w-6 h-6 [&_svg:not([class*='size-'])]:size-4" onClick={handleDecrese} disabled={cartItem.quantity <= 1}>
        <Minus />
      </Button>
      <span className="w-6 text-center">{cartItem.quantity}</span>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="w-6 h-6
                  [&_svg:not([class*='size-'])]:size-4"
        onClick={handleIncrease}
        disabled={cartItem.quantity >= 99}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default CounterButton;

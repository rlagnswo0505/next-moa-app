'use client';

import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

type Props = {
  cartItem: any;
  handleDecrease: () => void;
  handleIncrease: () => void;
};

const CounterButton = ({ cartItem, handleDecrease, handleIncrease }: Props) => {
  return (
    <div className="flex items-center justify-between gap-2 border rounded-md p-1 w-24">
      <Button variant={'ghost'} size={'icon'} className="w-6 h-6 [&_svg:not([class*='size-'])]:size-4" onClick={handleDecrease} disabled={cartItem.quantity <= 1}>
        <Minus />
      </Button>
      <span className="w-6 text-center">{cartItem.quantity}</span>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="w-6 h-6
                  [&_svg:not([class*='size-'])]:size-4"
        onClick={handleIncrease}
        disabled={cartItem.quantity >= 10}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default CounterButton;

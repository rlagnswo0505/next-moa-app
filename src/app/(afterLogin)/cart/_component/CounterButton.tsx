'use client';

import { Button } from '@/components/ui/button';
import { CartItem } from '@/model/CartItem';
import useCartStore from '@/store/cart';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

type Props = {
  cartItem: CartItem;
};

const CounterButton = ({ cartItem }: Props) => {
  const { addToCart, decreaseQuantity } = useCartStore((state: any) => state);

  const handleAddToCart = () => {
    addToCart(cartItem);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(cartItem.id);
  };

  return (
    <div className="flex items-center justify-between gap-2 border rounded-md p-1 w-40">
      <Button variant={'ghost'} size={'icon'} className="w-6 h-6 [&_svg:not([class*='size-'])]:size-4" onClick={handleAddToCart} disabled={cartItem.quantity <= 1}>
        <Minus />
      </Button>
      <span className="w-6 text-center">{cartItem.quantity}</span>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="w-6 h-6
                  [&_svg:not([class*='size-'])]:size-4"
        onClick={handleDecreaseQuantity}
        disabled={cartItem.quantity >= 99}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default CounterButton;

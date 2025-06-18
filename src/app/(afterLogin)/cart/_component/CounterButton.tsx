'use client';

import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCartItemQty } from '../lib/cartMutations';

const USER_ID = '00000000-0000-0000-0000-000000000003';

type Props = {
  cartItem: any;
};

const CounterButton = ({ cartItem }: Props) => {
  const queryClient = useQueryClient();

  const updateQtyMutation = useMutation({
    mutationFn: ({ p_cart_item_id, p_qty }: { p_cart_item_id: number; p_qty: number }) => updateCartItemQty({ p_user_id: USER_ID, p_cart_item_id, p_qty }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems', USER_ID] });
    },
  });

  const handleDecrease = () => {
    if (cartItem.quantity > 1) {
      updateQtyMutation.mutate({ p_cart_item_id: cartItem.cart_item_id, p_qty: cartItem.quantity - 1 });
    }
  };

  const handleIncrease = () => {
    if (cartItem.quantity < 20) {
      updateQtyMutation.mutate({ p_cart_item_id: cartItem.cart_item_id, p_qty: cartItem.quantity + 1 });
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 border rounded-md p-1 w-24">
      <Button variant={'ghost'} size={'icon'} className="w-6 h-6 [&_svg:not([class*='size-'])]:size-4" onClick={handleDecrease} disabled={cartItem.quantity <= 1 || updateQtyMutation.isPending}>
        <Minus />
      </Button>
      <span className="w-6 text-center">{cartItem.quantity}</span>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="w-6 h-6
                  [&_svg:not([class*='size-'])]:size-4"
        onClick={handleIncrease}
        disabled={cartItem.quantity >= 20 || updateQtyMutation.isPending}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default CounterButton;

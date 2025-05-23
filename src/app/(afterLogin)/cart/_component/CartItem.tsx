import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import CounterButton from './CounterButton';
import { CartItem as ICartItem } from '@/model/CartItem';
import useCartStore from '@/store/cart';

type Props = {
  cartItem: ICartItem;
  handleClickRemoveBtn: () => void;
};

const CartItem = ({ cartItem, handleClickRemoveBtn }: Props) => {
  const { addToCart, decreaseQuantity, toggleChecked, removeFromCart } = useCartStore((state: any) => state);

  const handleAddToCart = () => {
    addToCart(cartItem);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(cartItem.id);
  };

  const totalItemPrice = cartItem.price * cartItem.quantity;
  const totalItemOriginalPrice = cartItem.originalPrice * cartItem.quantity;
  0;
  return (
    <div key={cartItem?.id} className="flex items-start justify-between gap-4 px-4">
      <Checkbox id={cartItem?.id.toString()} checked={cartItem?.checked} onCheckedChange={() => toggleChecked(cartItem.id)} className="w-5 h-5" />
      <div className="flex-1">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 relative overflow-hidden rounded-lg">
            <Image src={cartItem?.image} alt={cartItem?.menu} fill className="object-cover" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <h4 className="font-bold">{cartItem.menu}</h4>
              <Button variant="ghost" size="icon" className="w-6 h-6" onClick={handleClickRemoveBtn}>
                <X />
              </Button>
            </div>
            <p className="font-bold text-muteds-foreground">{cartItem.store}</p>
            <div className="flex items-center justify-between mt-2">
              <CounterButton cartItem={cartItem} handleIncrease={handleAddToCart} handleDecrese={handleDecreaseQuantity} />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground line-through">{totalItemOriginalPrice?.toLocaleString()}원</span>
                <span className="text-moa font-bold">{totalItemPrice?.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

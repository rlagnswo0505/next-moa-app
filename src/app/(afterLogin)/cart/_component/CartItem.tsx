import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import CounterButton from './CounterButton';
import useCartCheckStore from '@/store/cart';

type Props = {
  cartItem: any;
  handleClickRemoveBtn: () => void;
};

const CartItem = ({ cartItem, handleClickRemoveBtn }: Props) => {
  // checkedMap, toggleChecked만 zustand에서 사용
  const { checkedMap, toggleChecked } = useCartCheckStore();

  // 연산 우선순위 괄호 추가
  const totalItemPrice = (cartItem.deal_price ?? 0) * cartItem.quantity;
  const totalItemOriginalPrice = (cartItem.originalPrice ?? 0) * cartItem.quantity;

  return (
    <div key={cartItem?.cart_item_id} className="flex items-start justify-between gap-4 px-4">
      <Checkbox id={cartItem?.cart_item_id.toString()} checked={!!checkedMap[cartItem.cart_item_id]} onCheckedChange={() => toggleChecked(cartItem.cart_item_id)} className="w-5 h-5" />
      <div className="flex-1">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 relative overflow-hidden rounded-lg">
            <Image src={cartItem?.deal_thumbnail_url} alt={cartItem?.deal_title} fill className="object-cover" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <h4 className="font-bold">{cartItem.deal_title}</h4>
              <Button variant="ghost" size="icon" className="w-6 h-6" onClick={handleClickRemoveBtn}>
                <X />
              </Button>
            </div>
            {/* TODO: store 필요 */}
            <p className="font-bold text-muteds-foreground">{cartItem.store ?? '상점이름'}</p>
            <div className="flex items-end justify-between mt-2">
              <CounterButton cartItem={cartItem} />
              <div className="flex items-center gap-2 flex-col md:flex-row">
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

'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useCartCheckStore from '@/store/cart';
import React from 'react';

type Props = {
  handleClickRemoveBtn: () => void;
  cartItems: any[]; // cartItems를 prop으로 받음
};

const CartHeader = ({ handleClickRemoveBtn, cartItems }: Props) => {
  const { checkedMap, allToggleChecked } = useCartCheckStore();

  const cartItemIds = cartItems.map((item) => item.cart_item_id);
  const checkedCount = cartItemIds.filter((id) => checkedMap[id]).length;
  const totalCount = cartItemIds.length;
  const isChecked = totalCount > 0 && checkedCount === totalCount;

  const handleCheckedChange = (checked: boolean) => {
    allToggleChecked(cartItemIds, checked);
  };

  // 서치바 현재 스크롤 위치 맨위 벗어나면 shadow 넣기
  const [isShadow, setIsShadow] = React.useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsShadow(true);
    } else {
      setIsShadow(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={'py-2.5 px-4 fixed top-11 left-0 right-0 bg-white z-10 w-full flex justify-between items-center mx-auto max-w-[600px]' + (isShadow ? ' shadow-md' : '')}>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={isChecked} onCheckedChange={handleCheckedChange} />
        <label
          htmlFor="terms"
          className="text-sm font-bold leading-none 
        cursor-pointer
        peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          전체 선택
          <span>
            ({checkedCount}/{totalCount})
          </span>
        </label>
      </div>
      <Button variant={'ghost'} size={'sm'} className="text-muted-foreground text-xs font-bold" onClick={handleClickRemoveBtn}>
        선택삭제
      </Button>
    </section>
  );
};

export default CartHeader;

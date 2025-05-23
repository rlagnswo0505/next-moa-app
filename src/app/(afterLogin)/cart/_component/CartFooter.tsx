import { Button } from '@/components/ui/button';
import React from 'react';

const CartFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-sm z-50 mx-auto max-w-[600px] border-t h-15 flex items-center justify-center px-4">
      <Button size={'lg'} className="w-full rounded-full">
        구매하기
      </Button>
    </footer>
  );
};

export default CartFooter;

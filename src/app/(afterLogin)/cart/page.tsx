import React from 'react';
import CartHeader from './_component/CartHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { allDeals } from '../home/page';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import CartFooter from './_component/CartFooter';
import PointSection from './_component/PointSection';

const Cart = () => {
  return (
    <div className="flex flex-col gap-4 bg-gray-200">
      <CartHeader />
      <section className="flex flex-col mt-16">
        <Card className="rounded-sm shadow-none">
          <CardContent
            // 마지막 자식 빼고 border-b
            className="flex flex-col gap-4
            [&>*:not(:last-child)]:border-b
            [&>*:not(:last-child)]:pb-4
            px-0"
          >
            {allDeals.map((deal) => (
              <div key={deal?.id} className="flex items-start justify-between gap-4 px-4">
                <Checkbox id="terms" />
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 relative overflow-hidden rounded-lg">
                      <Image src={deal?.image} alt={deal?.menu} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <h4 className="font-bold">{deal.menu}</h4>
                      <p className="font-bold text-muted-foreground">{deal.store}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between gap-2 border rounded-md p-1 w-40">
                          <Button variant={'ghost'} size={'icon'} className="w-6 h-6 [&_svg:not([class*='size-'])]:size-4">
                            <Plus />
                          </Button>
                          <span className="w-6 text-center">1</span>
                          <Button
                            variant={'ghost'}
                            size={'icon'}
                            className="w-6 h-6
                            [&_svg:not([class*='size-'])]:size-4"
                          >
                            <Minus />
                          </Button>
                        </div>
                        <span className="text-moa font-bold">{deal.price?.toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <X />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <PointSection />
      <section className="bg-primary-foreground p-4 flex flex-col gap-4 text-muted-foreground rounded-sm">
        <div className="flex items-center justify-between">
          <span>총 주문 금액</span>
          <span>30,000원</span>
        </div>
        <div className="flex items-center justify-between">
          <span>공구 할인 금액</span>
          <span>- 6,000원</span>
        </div>
        <div className="flex items-start justify-between">
          <span>추가 할인 금액</span>
          <div className="flex flex-col items-end gap-1">
            <span>(친구 초대) -1,500원</span>
            <span>(적립금 사용) -1,000원</span>
          </div>
        </div>
        <div className="flex justify-between border-t pt-2 text-primary text-lg pb-15">
          <span>최종결제금액</span>
          <span>22,500원</span>
        </div>
      </section>
      <CartFooter />
    </div>
  );
};

export default Cart;

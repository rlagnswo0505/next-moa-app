import React from 'react';

type Props = {
  totalPrice: number;
  totalDiscount: number;
  totalPoint: number;
  finalPrice: number;
};

const TotalPriceSection = ({ totalPrice, totalDiscount, totalPoint, finalPrice }: Props) => {
  return (
    <section className="bg-primary-foreground p-4 flex flex-col gap-4 text-muted-foreground rounded-sm">
      <div className="flex items-center justify-between">
        <span>총 주문 금액</span>
        <span>{totalPrice.toLocaleString()}원</span>
      </div>
      <div className="flex items-center justify-between">
        <span>공구 할인 금액</span>
        <span>- {totalDiscount.toLocaleString()}원</span>
      </div>
      <div className="flex items-start justify-between">
        <span>추가 할인 금액</span>
        <div className="flex flex-col items-end gap-1">
          <span>(친구 초대) -1,500원</span>
          <span>(적립금 사용) -{totalDiscount.toLocaleString()}원</span>
        </div>
      </div>
      <div className="flex justify-between border-t pt-2 text-primary text-lg pb-15">
        <span>최종결제금액</span>
        <span>{finalPrice.toLocaleString()}원</span>
      </div>
    </section>
  );
};

export default TotalPriceSection;

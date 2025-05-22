'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

type Props = {
  totalPoint: number;
  discountPoint: number;
  defaultPoint: number;
  onChangeDiscountPoint: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDiscountPointCancel: () => void;
};

const PointSection = ({ totalPoint, discountPoint, defaultPoint, onChangeDiscountPoint, handleDiscountPointCancel }: Props) => {
  return (
    <section className="bg-primary-foreground p-4 flex flex-col gap-4 rounded-sm">
      <h4>적립금 적용</h4>
      <div className="flex items-center gap-2">
        <Input placeholder="적립금 사용하기" className="w-full" type="number" min={0} max={defaultPoint} value={discountPoint} onChange={onChangeDiscountPoint} />
        <Button
          variant={'outline'}
          disabled={discountPoint === 0}
          onClick={handleDiscountPointCancel}
          className="border-moa text-moa hover:bg-moa hover:text-white
          disabled:border-primary disabled:text-primary"
        >
          사용 취소
        </Button>
      </div>
      <div className="flex gap-2">
        <span>사용 가능 적립금</span>
        <span className="font-bold">{totalPoint}P</span>
      </div>
    </section>
  );
};

export default PointSection;

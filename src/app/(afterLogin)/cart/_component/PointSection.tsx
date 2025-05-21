'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

const defaultPoint = 1000;

const PointSection = () => {
  // 실제 보유 포인트는 defaultPoint에서 사용한 포인트(point)를 뺀 값으로 표시
  const [point, setPoint] = React.useState(0);

  // handleUsePoint: 인풋에 숫자 입력시 호출됨
  const handleUsePoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);

    // 음수 방지 및 NaN 방지
    if (isNaN(value) || value < 0) value = 0;

    // 보유 포인트보다 크면 최대치로 맞춤
    if (value > defaultPoint) value = defaultPoint;

    setPoint(value);
  };

  // 사용 취소 시 point를 0으로 초기화
  const handlePointCancel = () => {
    setPoint(0);
  };

  // 사용 가능한 포인트는 defaultPoint에서 point를 뺀 값
  const myPoint = defaultPoint - point;

  return (
    <section className="bg-primary-foreground p-4 flex flex-col gap-4 rounded-sm">
      <h4>적립금 적용</h4>
      <div className="flex items-center gap-2">
        <Input placeholder="적립금 사용하기" className="w-full" type="number" min={0} max={defaultPoint} value={point} onChange={handleUsePoint} />
        <Button
          variant={'outline'}
          disabled={point === 0}
          onClick={handlePointCancel}
          className="border-moa text-moa hover:bg-moa hover:text-white
         disabled:border-primary disabled:text-primary"
        >
          사용 취소
        </Button>
      </div>
      <div className="flex gap-2">
        <span>사용 가능 적립금</span>
        <span className="font-bold">{myPoint}P</span>
      </div>
    </section>
  );
};

export default PointSection;

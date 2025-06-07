'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard, RefreshCw } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const TakeOutPage = () => {
  const [request, setRequest] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 폼 제출 로직을 추가하세요.
    toast.success('리뷰가 성공적으로 등록되었습니다!', {
      action: {
        label: '확인',
        onClick: () => {},
      },
    });

    setRequest(''); // 폼 제출 후 입력값 초기화
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4">
        <form className="flex flex-col gap-4 mt-4 items-center" onSubmit={handleSubmit}>
          <Textarea placeholder="가게 사장님께 요청사항이 있다면 적어주세요 :)" className="w-full min-w-75" value={request} onChange={(e) => setRequest(e.target.value)} rows={3} />
          <div className="flex justify-center">
            <div className="relative bg-moa-foreground/20 rounded-full py-1 px-2 max-w-xs   text-sm">
              <p className="text-moa">예상 소요 시간 : 15 ~ 20분</p>
              {/* 아래쪽 꼬리 */}
              <div className="absolute top-full left-6 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-moa-foreground/20"></div>
              <div className="absolute top-full left-6 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-gray-200 -z-10 translate-y-px"></div>
            </div>
          </div>
          <Button size="lg" type="submit" className="rounded-full bg-moa text-white hover:bg-moa/90 w-60">
            포장 요청
          </Button>
          <span className="text-center">유효기간 : 2025년 8월 14일</span>
        </form>
      </div>
      <section className="p-4 bg-white">
        <h4 className="font-bold text-xl">사용방법</h4>
        <ul className="flex flex-col gap-4 mt-4 font-bold p-4 bg-accent rounded-lg">
          <li className="flex items-center gap-2">
            <Badge className="bg-moa w-10 h-10">1</Badge>
            <span>매장에서 사장님께 포장 코드를 말씀드리면 픽업해서 가져가실 수 있어요.</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge className="bg-moa w-10 h-10">
              <CreditCard />
            </Badge>
            <span>유효기간 내 사용가능한 식사권은 모두 소진할 때까지 사용할 수 있어요.</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge className="bg-moa w-10 h-10">
              <RefreshCw />
            </Badge>
            <span>유효기간이 지난 식사권은 최대(7일)간 연장 요청을 할 수 있어요.</span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default TakeOutPage;

import { user } from '@/_data/user';
import { ChevronRight } from 'lucide-react';
import React from 'react';

// 구매내역, 보유 식사권, 내포인트
const MyPageMetadata = {
  purchaseHistory: 13,
  mealTickets: 2,
  points: 1000,
};

const MyPage = () => {
  return (
    <div className="bg-muted flex flex-col gap-4">
      <section className="bg-white p-4">
        <h1>
          <strong>{user.name} 님</strong>, 반가워요. 식사는 하셨나요?
        </h1>
        <div className="flex justify-start mt-4">
          <div className="relative bg-moa-foreground/20 text-primary rounded-lg shadow-lg py-1 px-2 max-w-xs">
            {/* 위쪽 꼬리 */}
            <div className="absolute bottom-full left-6 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-moa-foreground/20"></div>
            <p>공구 할인으로 매장가 보다 총 34,300원 저렴하게 먹었어요.</p>
          </div>
        </div>
        <div className="border rounded-lg p-2 mt-4 grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-4 items-center border-r ">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>공구 내역</span>
              <ChevronRight />
            </div>
            <h4 className="flex-1 w-full flex justify-end items-center text-xl pr-4">{MyPageMetadata.purchaseHistory.toLocaleString()}</h4>
          </div>
          <div className="flex flex-col gap-4 items-center border-r ">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>보유 식사권</span>
              <ChevronRight />
            </div>
            <h4 className="flex-1 w-full flex justify-end items-center text-xl pr-4">{MyPageMetadata.mealTickets.toLocaleString()}장</h4>
          </div>
          <div className="flex flex-col gap-4 items-center ">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>내 포인트</span>
              <ChevronRight />
            </div>
            <h4 className="flex-1 w-full flex justify-end items-center text-xl pr-4">{MyPageMetadata.points.toLocaleString()}P</h4>
          </div>
        </div>
      </section>
      <section className="bg-white p-4">
        <h4 className="font-bold">내 정보</h4>
        <ul className="text-muted-foreground mt-4 space-y-1">
          <li>리뷰내역</li>
          <li>회원정보</li>
        </ul>
      </section>
      <section className="bg-white p-4">
        <h4 className="font-bold">고객센터</h4>
        <ul className="text-muted-foreground mt-4 space-y-1">
          <li>문의하기</li>
          <li>설정</li>
        </ul>
      </section>
    </div>
  );
};

export default MyPage;

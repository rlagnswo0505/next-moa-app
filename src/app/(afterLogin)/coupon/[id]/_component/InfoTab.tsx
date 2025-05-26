import KakaoMap from '@/app/_components/KakaoMap';
import NaverMap from '@/app/_components/NaverMap';
import { Label } from '@/components/ui/label';
import React from 'react';

const info = {
  storeName: '모아커피',
  address: '서울시 강남구 역삼동 123-45',
  phoneNumber: '02-1234-5678',
  businessHours: '매일 09:00 - 22:00',
};

const InfoTab = () => {
  return (
    <div>
      <div className="border-b pb-4">
        <h1 className="font-bold text-lg">매장 정보</h1>
        <ul
          className="
        flex flex-col gap-2 mt-4
        text-md
        [&>li]:flex [&>li]:items-center [&>li]:gap-2 
      "
        >
          <li>
            <Label className="text-muted-foreground  min-w-25">매장명</Label>
            <span>{info.storeName}</span>
          </li>
          <li>
            <Label className="text-muted-foreground  min-w-25">매장 주소</Label>
            <span>{info.address}</span>
          </li>
          <li>
            <Label className="text-muted-foreground  min-w-25">영업 시간</Label>
            <span>{info.businessHours}</span>
          </li>
          <li>
            <Label className="text-muted-foreground  min-w-25">매장 번호</Label>
            <span>{info.phoneNumber}</span>
          </li>
        </ul>
      </div>
      <div className="py-4 border-b">
        <h1 className="font-bold text-lg">위치 정보</h1>
        <NaverMap />
      </div>
    </div>
  );
};

export default InfoTab;

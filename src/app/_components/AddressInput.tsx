'use client';

import { Input } from '@/components/ui/input';
import { useAddressStore } from '@/store/adress';
import { Search } from 'lucide-react';
import React from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const AddressInput = () => {
  // const { addresses, addAddress } = useAddressStore((state) => state);
  const router = useRouter();
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: Address) => {
    // 주소 검색 결과에서 도로명/지번 주소 추출
    let roadAddress = data.roadAddress || data.address || '';
    let jibunAddress = data.jibunAddress || '';
    let fullAddress = roadAddress;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // 좌표 변환
    naver.maps.Service.geocode(
      {
        query: fullAddress,
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          return toast.error('좌표를 찾을 수 없습니다.', {
            action: {
              label: '확인',
              onClick: () => {},
            },
          });
        }
        const result = response.v2;
        const items = result.addresses;
        if (!items || items.length === 0) {
          toast.error('좌표를 찾을 수 없습니다.', {
            action: {
              label: '확인',
              onClick: () => {},
            },
          });
          return;
        }
        const { x, y } = items[0];
        // regist 페이지로 정보 전달(쿼리스트링)
        router.push(`/my-address/regist?ra=${encodeURIComponent(roadAddress)}&ja=${encodeURIComponent(jibunAddress)}&lat=${y}&lng=${x}`);
        return;
      }
    );
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <section className={'py-2.5 px-4 fixed top-11 left-0 right-0 bg-white z-10 w-full mx-auto max-w-[600px]'}>
      <div className="w-full relative">
        <div className="bg-[#f9f9f9] flex items-center justify-start rounded-full cursor-pointer" onClick={handleClick}>
          <Search className="text-muted-foreground/50 absolute top-2 left-2 transform" />
          <Input className="rounded-full pl-10 border-[#f2f2f2]" placeholder="지번, 도로명, 건물명으로 검색" />
        </div>
      </div>
    </section>
  );
};

export default AddressInput;

'use client';

import { Input } from '@/components/ui/input';
import { useAddressStore } from '@/store/adress';
import { Search } from 'lucide-react';
import React from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { toast } from 'sonner';

const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const AddressInput = () => {
  const { addresses, addAddress } = useAddressStore((state) => state);

  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: Address) => {
    if (addresses.length >= 10) {
      toast.error('주소는 최대 10개까지만 저장할 수 있습니다.', {
        action: {
          label: '확인',
          onClick: () => {},
        },
      });
      return;
    }

    let fullAddress = data.address;
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

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    // naver geocode API를 사용하여 주소를 좌표로 변환하는 로직을 추가할 수 있습니다.
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
        const result = response.v2; // 검색 결과의 컨테이너
        const items = result.addresses; // 검색 결과의 배열

        if (!items || items.length === 0) {
          toast.error('좌표를 찾을 수 없습니다.', {
            action: {
              label: '확인',
              onClick: () => {},
            },
          });
          return;
        }

        // 예시: 첫 번째 결과의 좌표 사용
        const { x, y } = items[0];
        console.log('좌표:', x, y);

        // 주소를 상태에 추가
        addAddress({
          name: fullAddress,
          address: fullAddress,
          lat: parseFloat(y), // 위도
          lng: parseFloat(x), // 경도
        });
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

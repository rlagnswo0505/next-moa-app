'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const AddressInput = () => {
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: Address) => {
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

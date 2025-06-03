'use client';

import AddressInput from '@/app/_components/AddressInput';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAddressStore } from '@/store/adress';
import { Locate, MapPin } from 'lucide-react';
import React from 'react';

const MyAdressPage = () => {
  const { addresses, setCheckedAddress } = useAddressStore((state) => state);

  return (
    <div className="p-4">
      <AddressInput />
      <Button variant={'outline'} size={'lg'} className="w-full mt-12 rounded-full h-14">
        <Locate />
        현재 위치로 찾기
      </Button>
      <ul className="mt-4">
        {addresses.map((address) => (
          <li key={address.id} className="flex items-center justify-between p-2 border-b cursor-pointer hover:bg-gray-50" onClick={() => setCheckedAddress(address.id)}>
            <div className="p-4">
              <MapPin />
            </div>
            <div className="flex-1 ml-2 flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{address.name}</span>
                {address.checked && <Badge className="text-moa bg-moa-foreground/20">현재 설정된 주소</Badge>}
              </div>
              <span>{address.address}</span>
            </div>
            <Checkbox className="ml-2" checked={address.checked} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAdressPage;

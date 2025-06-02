import AddressInput from '@/app/_components/AddressInput';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Locate, MapPin } from 'lucide-react';
import React from 'react';

const myAdresses = [
  {
    id: 1,
    name: '우리집',
    address: '대구 월배로 387',
    isDefault: true,
  },
  {
    id: 2,
    name: '친구집',
    address: '대구 수성구 동대구로 123',
    isDefault: false,
  },
  {
    id: 3,
    name: '회사',
    address: '대구 중구 동성로 456',
    isDefault: false,
  },
];

const MyAdressPage = () => {
  return (
    <div className="p-4">
      <AddressInput />
      <Button variant={'outline'} size={'lg'} className="w-full mt-12 rounded-full h-14">
        <Locate />
        현재 위치로 찾기
      </Button>
      <ul className="mt-4">
        {myAdresses.map((address) => (
          <li key={address.id} className="flex items-center justify-between p-2 border-b cursor-pointer hover:bg-gray-50">
            <div className="p-4">
              <MapPin />
            </div>
            <div className="flex-1 ml-2 flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{address.name}</span>
                {address.isDefault && <Badge className="text-moa bg-moa-foreground/20">현재 설정된 주소</Badge>}
              </div>
              <span>{address.address}</span>
            </div>
            <Checkbox className="ml-2" checked={address.isDefault} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAdressPage;

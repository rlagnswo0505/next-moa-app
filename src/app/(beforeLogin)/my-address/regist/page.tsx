'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building, House, MapPin } from 'lucide-react';
import React, { use } from 'react';
import { useAddressStore } from '@/store/adress';
import { useRouter } from 'next/navigation';

type Props = {
  searchParams: Promise<{
    ra: string;
    ja: string;
    lat: number;
    lng: number;
  }>;
};

const page = ({ searchParams }: Props) => {
  const { ra, ja, lat, lng } = use(searchParams);
  const addAddress = useAddressStore((state) => state.addAddress);
  const [selectedBtn, setSelectedBtn] = React.useState<'house' | 'company' | 'manual' | null>(null);
  const [addressName, setAddressName] = React.useState<string>(ra);
  const rounter = useRouter();

  const handleButtonClick = (type: 'house' | 'company' | 'manual') => {
    setSelectedBtn(type);
  };

  const handleRegister = () => {
    if (!ra || !ja || !lat || !lng) return;
    // 주소명 결정
    let name = ra;
    if (selectedBtn === 'house') name = '우리집';
    else if (selectedBtn === 'company') name = '회사';
    else if (selectedBtn === 'manual') name = addressName || ra;
    addAddress({
      name,
      roadAddress: ra,
      jibunAddress: ja,
      lat: Number(lat),
      lng: Number(lng),
    });
    // 등록 후 뒤로가기 또는 알림 등 추가 가능
    rounter.push('/home');
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <section className="flex-1">
        <h2 className="font-bold">{ra}</h2>
        <span>{ja}</span>
        <div className="flex items-center justify-between mt-4 gap-2">
          <Button variant={'outline'} className={'py-6 flex-1 ' + (selectedBtn === 'house' ? 'text-primary border-primary' : 'text-muted-foreground')} onClick={() => handleButtonClick('house')}>
            <House />
            우리집
          </Button>
          <Button variant={'outline'} className={'py-6 flex-1 ' + (selectedBtn === 'company' ? 'text-primary border-primary' : 'text-muted-foreground')} onClick={() => handleButtonClick('company')}>
            <Building />
            회사
          </Button>
          <Button variant={'outline'} className={'py-6 flex-1 ' + (selectedBtn === 'manual' ? 'text-primary border-primary' : 'text-muted-foreground')} onClick={() => handleButtonClick('manual')}>
            <MapPin />
            직접입력
          </Button>
        </div>
        {selectedBtn === 'manual' && <Input className="mt-2 py-6" placeholder="예) 학교, 모아네" value={addressName} onChange={(e) => setAddressName(e.target.value)} autoFocus autoComplete="off" autoCorrect="off" spellCheck="false" type="text" />}
      </section>
      <footer className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md z-9999 mx-auto max-w-[600px]">
        <Button className="w-full rounded-full" size={'lg'} disabled={!ra || !ja || !lat || !lng} onClick={handleRegister}>
          주소 등록
        </Button>
      </footer>
    </div>
  );
};

export default page;

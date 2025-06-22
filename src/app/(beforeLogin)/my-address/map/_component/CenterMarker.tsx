import { MapPin } from 'lucide-react';
import React from 'react';

type Props = {
  isGrabbing: boolean;
};

const CenterMarker = ({ isGrabbing }: Props) => {
  return (
    <div className={`absolute flex flex-col justify-end items-center left-1/2 top-1/2 -translate-x-1/2 z-10 pointer-events-none transition-transform duration-200 ${isGrabbing ? '-translate-y-[120%]' : '-translate-y-full'}`}>
      <div className={`bg-primary text-white py-2 px-3 rounded-full shadow-lg text-sm ${isGrabbing ? 'opacity-0' : 'opacity-100'}`}>바꾼 위치가 주소와 같은지 확인 해 주세요</div>
      <MapPin strokeWidth={3} className={`w-10 h-10 drop-shadow-lg ${isGrabbing ? 'text-accent-foreground/20' : 'text-moa'}`} />
    </div>
  );
};

export default CenterMarker;

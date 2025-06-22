'use client';
import { Button } from '@/components/ui/button';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { Pencil, ArrowLeft } from 'lucide-react';
import React from 'react';

const BeforeHeader = () => {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();

  let title = '';
  let showEdit = false;

  if (segments[0] === 'my-address' && segments.length === 1) {
    title = '주소설정';
    showEdit = true;
  }
  if (segments[0] === 'my-address' && segments[1] === 'map') {
    title = '지도에서 위치확인';
  }
  if (segments[0] === 'my-address' && segments[1] === 'regist') {
    title = '주소 상세';
  }
  if (segments[0] === 'my-address' && segments[1] === 'edit') {
    title = '주소 편집';
  }

  if (!segments[0]) return null;

  return (
    <>
      <div className="h-11 w-full"></div>
      <header className="fixed top-0 left-0 right-0 bg-white z-50 mx-auto max-w-[600px] border-b flex items-center justify-between px-1.5 h-11">
        <div className="flex-1 flex items-center">
          <Button variant="ghost" size="icon" className="w-11 h-11" onClick={() => router.back()} aria-label="뒤로가기">
            <ArrowLeft />
          </Button>
        </div>
        <h4 className="text-md font-bold text-center flex-1">{title}</h4>
        <div className="flex-1 flex justify-end items-center">
          {showEdit && (
            <Button variant="ghost" size="icon" className="w-11 h-11" onClick={() => router.push('/my-address/edit')} aria-label="편집">
              편집
            </Button>
          )}
        </div>
      </header>
    </>
  );
};

export default BeforeHeader;

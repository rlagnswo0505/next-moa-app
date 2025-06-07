'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const menubar = [
  {
    id: 'groupPurchase',
    label: '공구',
  },
  {
    id: 'menuDaily',
    label: '데일리',
  },
];

const MenuHeader = () => {
  const [activeTab, setActiveTab] = useState('groupPurchase');

  const [searchFocus, setSearchFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 아이콘 클릭 시 인풋 포커스
  const handleIconClick = () => {
    setSearchFocus(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // 인풋 외부 클릭 시 닫기
  useEffect(() => {
    if (!searchFocus) return;
    const handleClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setSearchFocus(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [searchFocus]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // 네비게이션 바 높이 고려

      for (let i = menubar.length - 1; i >= 0; i--) {
        const section = document.getElementById(menubar[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(menubar[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop + 100; // 네비게이션 바 높이만큼 오프셋
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="flex items-center gap-2 py-2 sticky top-23 z-10 w-full max-w-[600px] bg-white">
      {/* 검색 영역 */}
      <div className={searchFocus ? 'relative w-full transition-all duration-200' : 'relative w-10 transition-all duration-200'}>
        <div className="bg-muted flex items-center justify-start rounded-full min-h-10">
          {!searchFocus && (
            <Button type="button" onClick={handleIconClick} className="w-10 h-10 flex items-center justify-center rounded-full" size={'icon'} variant="ghost">
              <Search className="text-muted-foreground/50 w-6 h-6" />
            </Button>
          )}
          {searchFocus && (
            <>
              <Search className="text-muted-foreground/50 absolute top-2 left-2 transform pointer-events-none" />
              <Input ref={inputRef} className={'rounded-full pl-10 border-[#f2f2f2] w-full bg-[#f9f9f9]'} placeholder="매장, 음식 검색" onBlur={() => setSearchFocus(false)} autoFocus />
            </>
          )}
        </div>
      </div>
      {!searchFocus && (
        <>
          {menubar.map((menu) => (
            <Button
              key={menu.id}
              variant="outline"
              className={`py-2 px-3 rounded-full ${activeTab === menu.id ? 'border-moa text-moa' : 'text-muted-foreground hover:bg-muted/70'}`}
              onClick={() => {
                setActiveTab(menu.id);
                scrollToSection(menu.id);
              }}
            >
              {menu.label}
            </Button>
          ))}
        </>
      )}
    </section>
  );
};

export default MenuHeader;

import React from 'react';
import AdBanner from './_component/AdBanner';

import SearchBar from './_component/SearchBar';
import HorizonScroll from './_component/HorizonScroll';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const categories = [
  { id: 1, name: '전체' },
  { id: 2, name: '한식' },
  { id: 3, name: '중식' },
  { id: 4, name: '일식' },
  { id: 5, name: '양식' },
  { id: 6, name: '패스트푸드' },
  { id: 7, name: '디저트' },
  { id: 8, name: '음료' },
  { id: 9, name: '주류' },
  { id: 10, name: '기타' },
];

const Home = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <section className="mt-2.5 px-4">
        <SearchBar />
      </section>
      <section className="px-4">
        <AdBanner />
      </section>
      <section className="pl-4">
        <HorizonScroll categories={categories} />
      </section>
      <section className="px-4 pb-15">
        <h2 className="font-bold text-lg">내 주변 할인 공구</h2>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-bold">
            <strong className="text-moa">30</strong>
            개의 공구
          </span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">정렬기준</span>
            <Select defaultValue="apple">
              <SelectTrigger className="w-fit min-w-[100px] border-none shadow-none font-bold">
                <SelectValue placeholder="정렬기준" />
              </SelectTrigger>
              <SelectContent side="bottom" align="end">
                <SelectGroup>
                  <SelectItem value="apple">가까운 순</SelectItem>
                  <SelectItem value="banana">저가순</SelectItem>
                  <SelectItem value="blueberry">고가순</SelectItem>
                  <SelectItem value="grapes">인기순</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Card className="w-full h-40 rounded-lg mt-4">
            <CardHeader></CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </Card>
          <Card className="w-full h-40 rounded-lg mt-4"></Card>
        </div>
      </section>
    </div>
  );
};

export default Home;

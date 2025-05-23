'use client';

import React, { useState } from 'react';
import AdBanner from './_component/AdBanner';

import SearchBar from './_component/SearchBar';
import HorizonScroll from './_component/HorizonScroll';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { faker } from '@faker-js/faker';

import ProductCard from './_component/ProductCard';

import { Coupon } from '@/model/Coupon';
import AddCartDrawer from './_component/AddCartDrawer';

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

export const allCoupons = [
  {
    id: 1,
    store: '라오니 피자 강남점',
    menu: '콤비네이션 L 세트',
    category: '일식',
    discount: '20%',
    price: 24000,
    originalPrice: 30000,
    stock: 15,
    participated: 45,
    total: 60,
    walkTime: 10,
    distance: '0.6km',
    remainingTime: '14분',
    image: faker.image.url(),
  },
  {
    id: 2,
    store: '엄마 밥상 강남점',
    menu: '비빔밥 정식',
    category: '한식',
    discount: '20%',
    price: 8000,
    originalPrice: 10000,
    stock: 15,
    participated: 45,
    total: 60,
    walkTime: 10,
    distance: '0.6km',
    remainingTime: '112분',
    image: faker.image.url(),
  },
  {
    id: 3,
    store: '스시 마이 강남점',
    menu: '초밥 세트',
    category: '일식',
    discount: '20%',
    price: 24000,
    originalPrice: 30000,
    stock: 15,
    participated: 45,
    total: 60,
    walkTime: 10,
    distance: '0.6km',
    remainingTime: '14분',
    image: faker.image.url(),
  },
  {
    id: 4,
    store: '스시 마이 강남점',
    menu: '초밥 세트',
    category: '일식',
    discount: '20%',
    price: 24000,
    originalPrice: 30000,
    stock: 15,
    participated: 45,
    total: 60,
    walkTime: 10,
    distance: '0.6km',
    remainingTime: '14분',
    image: faker.image.url(),
  },
];

type DrawerItem = Coupon & {
  quantity: number;
  checked: boolean;
};

const Home = () => {
  const [open, setOpen] = useState(false);

  const [drawerItem, setDrawerItem] = useState<DrawerItem | null>(null);

  const handleOpen = () => {
    setOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleChange = (e: boolean) => {
    setOpen(e);
    if (!e) {
      document.body.style.overflow = 'auto';
    }
  };

  const addDrawerItem = (item: Coupon) => {
    const addCountItem = { ...item, quantity: 1, checked: true };
    setDrawerItem(addCountItem);
  };
  const handleIncrease = () => {
    if (drawerItem) {
      setDrawerItem({ ...drawerItem, quantity: drawerItem.quantity + 1 });
    }
  };

  const handleDecrease = () => {
    if (drawerItem && drawerItem.quantity > 1) {
      setDrawerItem({ ...drawerItem, quantity: drawerItem.quantity - 1 });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchBar />
      <section className="px-4 mt-14">
        <AdBanner />
      </section>
      <section className="pl-4">
        <HorizonScroll categories={categories} />
      </section>
      <section className="px-4 pb-20">
        <h2 className="font-bold text-lg">내 주변 할인 공구</h2>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-bold">
            <strong className="text-moa">30</strong>
            개의 공구
          </span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-muted-foreground text-sm">정렬기준</span>
            <Select defaultValue="apple">
              <SelectTrigger className="w-fit min-w-[100px] border-none shadow-none font-bold cursor-pointer" size="sm">
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
        <div className="grid gap-2 grid-cols-2 mt-2">
          {allCoupons.map((coupon: Coupon) => (
            <ProductCard key={coupon.id} coupon={coupon} handleOpen={handleOpen} addDrawerItem={addDrawerItem} />
          ))}
        </div>
      </section>
      <AddCartDrawer open={open} handleChange={handleChange} drawerItem={drawerItem} handleIncrease={handleIncrease} handleDecrease={handleDecrease} />
    </div>
  );
};

export default Home;

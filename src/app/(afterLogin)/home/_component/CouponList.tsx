'use client';

import { useQuery } from '@tanstack/react-query';
import AddCartDrawer from '@/app/_components/AddCartDrawer';
import { DrawerItem, Coupon } from '@/model/Coupon';
import { getMainDealList, GetMainDealListParams } from '@/app/(afterLogin)/home/lib/getMainDealList';

import { useState } from 'react';
import ProductCard from './ProductCard';

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState<DrawerItem | null>(null);

  // 쿼리 파라미터 예시 (필요에 따라 수정)
  const queryParams: GetMainDealListParams = {
    p_category_id: undefined,
    p_keyword: '',
    p_limit_cnt: 10,
    p_offset_cnt: 0,
    p_sort_by: 'distance',
    p_user_lat: 37.5665,
    p_user_lng: 126.978,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['mainDealList', queryParams],
    queryFn: () => getMainDealList(queryParams),
  });

  const handleChange = (e: boolean) => {
    setOpen(e);
  };

  // Drawer에 아이템 추가
  const addDrawerItem = (item: Coupon) => {
    setDrawerItem({ ...item, quantity: 1, checked: true });
    setOpen(true);
  };

  if (isLoading) return <div className="text-center py-10">로딩 중...</div>;
  if (error) return <div className="text-center py-10 text-red-500">쿠폰 목록을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <>
      <div className="grid gap-2 grid-cols-2 mt-2">{data && data.map((coupon: Coupon) => <ProductCard key={coupon.id} coupon={coupon} addDrawerItem={addDrawerItem} />)}</div>
      <AddCartDrawer open={open} handleChange={handleChange} drawerItem={drawerItem} setDrawerItem={setDrawerItem} />
    </>
  );
};

export default CouponList;

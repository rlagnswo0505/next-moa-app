export type Coupon = {
  id: number;
  store: string;
  menu: string;
  category: string;
  discount: string;
  price: number;
  originalPrice: number;
  stock: number;
  participated: number;
  total: number;
  walkTime: number;
  distance: string;
  remainingTime: string;
  image: string;
  state?: 'available' | 'used' | 'expired'; // 쿠폰 상태 추가
};

export type CouponList = Coupon[];

export type DrawerItem = Coupon & {
  quantity: number;
  checked: boolean;
};

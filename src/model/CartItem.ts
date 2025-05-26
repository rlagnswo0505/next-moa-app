import { Coupon } from './Coupon';

export type CartItem = Coupon & {
  quantity: number;
  checked: boolean;
};

export type CartItems = CartItem[];

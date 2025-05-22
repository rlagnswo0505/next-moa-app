// cart 라는 상태 만들고 제품의 id 값으로 수량을 추가 하고 취소하는 로직을 구현 해당 제품에는 checked 값이 있어서 나중에 총 주문금액 시 checked 값이 true 인 것만 계산하도록 한다.
import { CartItem, CartItems } from '@/model/CartItem';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  cartItems: CartItems;
  addToCart: (item: CartItem) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  toggleChecked: (id: number) => void;
  allToggleChecked: (checked: boolean) => void;
  clearCart: () => void;
}

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [] as CartItem[],

      /**
       * 장바구니 상품 수량 변경
       * @param id - 상품 ID
       * @param quantity - 변경할 수량
       * @returns void
       * @description 장바구니 상품의 수량을 변경합니다.
       */
      addToCart: (item: CartItem) =>
        set((state: any) => {
          // 장바구니에 이미 있는 상품인지 확인
          const existingItem = state.cartItems.find((cartItem: CartItem) => cartItem.id === item.id);
          // 장바구니에 이미 있는 상품이면 수량만 증가
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((cartItem: CartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
            };
          }
          // 장바구니에 없는 상품이면 새로 추가
          return { cartItems: [...state.cartItems, { ...item, quantity: 1, checked: true }] };
        }),

      /**
       * 장바구니 상품 수량 감소
       * @param id - 상품 ID
       * @description 장바구니 상품의 수량을 감소시킵니다.
       */
      decreaseQuantity: (id: number) =>
        set((state: any) => {
          const existingItem = state.cartItems.find((cartItem: CartItem) => cartItem.id === id);
          // 장바구니에 있는 상품이면 수량 감소
          if (existingItem && existingItem.quantity > 1) {
            return {
              cartItems: state.cartItems.map((cartItem: CartItem) => (cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)),
            };
          }
          // 장바구니에 없는 상품이면 아무것도 하지 않음
          return state;
        }),

      /**
       * 장바구니 상품 삭제
       * @param id - 상품 ID
       * @returns void
       * @description 장바구니에서 상품을 삭제합니다.
       */
      removeFromCart: (id: number) =>
        set((state: any) => ({
          cartItems: state.cartItems.filter((item: CartItem) => item.id !== id),
        })),

      /**
       * 장바구니 상품 선택/해제
       * @param id - 상품 ID
       * @returns void
       * @description 장바구니 상품의 선택 상태를 토글합니다.
       */
      toggleChecked: (id: number) =>
        set((state: any) => ({
          cartItems: state.cartItems.map((item: CartItem) => (item.id === id ? { ...item, checked: !item.checked } : item)),
        })),

      /**
       * 전체 선택/해제
       * @param checked - true: 전체 선택, false: 전체 해제
       * @returns void
       */
      allToggleChecked: (checked: boolean) =>
        set((state: any) => ({
          cartItems: state.cartItems.map((item: CartItem) => ({ ...item, checked })),
        })),

      /**
       * 장바구니 비우기
       * @returns void
       * @description 장바구니에 담긴 모든 상품을 비웁니다.
       */
      clearCart: () =>
        set(() => ({
          cartItems: [],
        })),
    }),
    {
      name: 'moa-cart-storage', // unique name
    }
  )
);

export default useCartStore<CartStore>;

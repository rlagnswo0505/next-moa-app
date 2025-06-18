// cart 라는 상태 만들고 제품의 id 값으로 수량을 추가 하고 취소하는 로직을 구현 해당 제품에는 checked 값이 있어서 나중에 총 주문금액 시 checked 값이 true 인 것만 계산하도록 한다.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartCheckStore {
  checkedMap: Record<number, boolean>; // cart_item_id: checked
  toggleChecked: (id: number) => void;
  allToggleChecked: (ids: number[], checked: boolean) => void;
  clearChecked: () => void;
}

const useCartCheckStore = create(
  persist<CartCheckStore>(
    (set) => ({
      checkedMap: {},
      toggleChecked: (id) =>
        set((state) => ({
          checkedMap: { ...state.checkedMap, [id]: !state.checkedMap[id] },
        })),
      allToggleChecked: (ids, checked) =>
        set(() => ({
          checkedMap: Object.fromEntries(ids.map((id) => [id, checked])),
        })),
      clearChecked: () => set({ checkedMap: {} }),
    }),
    {
      name: 'moa-cart-checked',
    }
  )
);

export default useCartCheckStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/*
  내 주소 목록 저장
  - 주소 목록을 저장하고 불러오는 상태 관리
  - 주소 목록은 배열 형태로 저장
  - 주소 추가, 삭제, 수정 기능 제공
  - 주소 목록은 로컬 스토리지에 저장되어 페이지 새로고침 시에도 유지됨
  - 주소 목록은 최대 10개까지만 저장 가능
  - 현재 설정된 주소는 한개만 가능 checked 속성으로 관리
 */

interface Address {
  id: string;
  name: string;
  address: string;
  checked: boolean;
}

interface AddressState {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id' | 'checked'>) => void;
  removeAddress: (id: string) => void;
  updateAddress: (id: string, updatedAddress: Omit<Address, 'id' | 'checked'>) => void;
  setCheckedAddress: (id: string) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      addAddress: (address) => {
        const newAddress = { ...address, id: crypto.randomUUID(), checked: false };
        set((state) => {
          const updatedAddresses = [...state.addresses, newAddress];
          return { addresses: updatedAddresses.slice(0, 10) }; // 최대 10개까지만 저장
        });
      },
      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((address) => address.id !== id),
        }));
      },
      updateAddress: (id, updatedAddress) => {
        set((state) => ({
          addresses: state.addresses.map((address) => (address.id === id ? { ...address, ...updatedAddress } : address)),
        }));
      },
      setCheckedAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((address) => (address.id === id ? { ...address, checked: true } : { ...address, checked: false })),
        }));
      },
    }),
    {
      name: 'moa-address-storage', // 로컬 스토리지 키
    }
  )
);

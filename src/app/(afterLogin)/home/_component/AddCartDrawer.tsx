import React from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter } from '@/components/ui/drawer';
import Image from 'next/image';
import CounterButton from '../../cart/_component/CounterButton';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import useCartStore from '@/store/cart';
type Props = {
  open: boolean;
  handleChange: (e: boolean) => void;
  drawerItem: any;
  handleIncrease: () => void;
  handleDecrease: () => void;
};

const AddCartDrawer = ({ open, handleChange, drawerItem, handleIncrease, handleDecrease }: Props) => {
  const { addToCart } = useCartStore((state: any) => state);

  const totalOriginalPrice = drawerItem?.originalPrice * drawerItem?.quantity;

  const totalPrice = drawerItem?.price * drawerItem?.quantity;

  const handleAddToCart = () => {
    if (drawerItem) {
      addToCart(drawerItem);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[600px]">
          <DrawerHeader>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="옵션을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </DrawerHeader>
          {drawerItem ? (
            <div className="p-4">
              <div className="h-[200px]">
                <section className="flex items-start gap-4 pb-4">
                  <div className="min-w-20 min-h-20 w-20 h-20 rounded-md overflow-hidden">
                    <Image src={drawerItem.image} alt={drawerItem.menu} width={80} height={80} className="object-cover relative rounded-md w-full h-full" />
                  </div>
                  <div>
                    <h4 className="text-lg">[{drawerItem.store}]</h4>
                    <h4 className="text-lg">{drawerItem.menu}</h4>
                  </div>
                </section>
                <section className="flex items-start justify-between border-y py-2 mt-2">
                  <div>
                    <span className="text-muted-foreground line-through">{totalOriginalPrice?.toLocaleString()}원</span>
                    <h4 className="text-xl font-bold">{totalPrice?.toLocaleString()}원</h4>
                  </div>
                  <div>
                    <CounterButton cartItem={drawerItem} handleIncrease={handleIncrease} handleDecrese={handleDecrease} />
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="text-center text-muted-foreground">장바구니에 담긴 상품이 없습니다.</h4>
              <p className="text-center text-muted-foreground">상품을 선택하여 장바구니에 담아보세요.</p>
            </div>
          )}
          <DrawerFooter>
            <Button
              size={'lg'}
              className="rounded-full h-12"
              onClick={() => {
                handleAddToCart();
                handleChange(false);
              }}
            >
              장바구니 담기
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCartDrawer;

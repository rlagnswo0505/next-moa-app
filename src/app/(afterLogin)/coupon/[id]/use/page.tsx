import { allCoupons } from '@/_data/allCoupon';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Store } from 'lucide-react';
import React from 'react';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

const UsePage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <div className="flex items-center gap-2 mt-10">
      <Button className="flex flex-col w-25 h-25 border-moa text-moa hover:bg-moa hover:text-white" variant={'outline'} asChild>
        <Link href={`/coupon/${id}/use/takeout`}>
          <ShoppingBag />
          포장
        </Link>
      </Button>
      <Button className="flex flex-col w-25 h-25 border-moa text-moa hover:bg-moa hover:text-white" variant={'outline'} asChild>
        <Link href={`/coupon/${id}/use/dainin`}>
          <Store />
          매장
        </Link>
      </Button>
    </div>
  );
};

export default UsePage;

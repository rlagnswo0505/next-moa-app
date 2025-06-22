'use client';

import ConfirmDialog from '@/app/_components/ConfirmDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useAddressStore } from '@/store/adress';
import { Building, Check, House, MapPin } from 'lucide-react';
import React from 'react';

const EditAddressPage = () => {
  const { addresses, setCheckedAddress, updateAddress, removeAddress } = useAddressStore((state) => state);
  const [editId, setEditId] = React.useState<string | null>(null);
  const [editName, setEditName] = React.useState('');
  const [confirmOpenId, setConfirmOpenId] = React.useState<string | null>(null);

  const handleEdit = (addressId: string, currentName: string) => {
    setEditId(addressId);
    setEditName(currentName);
  };

  const handleSave = (addressId: string) => {
    if (!editName.trim()) return;
    const addr = addresses.find((a) => a.id === addressId);
    if (!addr) return;
    updateAddress(addressId, { ...addr, name: editName });
    setEditId(null);
    setEditName('');
  };

  return (
    <div className="py-4">
      <ul>
        {addresses.map((address) => (
          <li key={address.id} className="flex items-start justify-between py-2 px-4 border-b hover:bg-gray-50 gap-2">
            <div className="py-3">{address.name === '우리집' ? <House /> : address.name === '회사' ? <Building /> : <MapPin />}</div>
            <div className="flex-1 ml-2 flex flex-col">
              <div className="flex items-center gap-2">
                {editId === address.id ? (
                  <>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-32 h-8 text-base"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave(address.id);
                      }}
                      // 전체 선택
                      onFocus={(e) => e.target.select()}
                      autoFocus
                    />
                    <Button size="sm" className="ml-1" onClick={() => handleSave(address.id)}>
                      저장
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="font-bold text-lg">{address.name}</span>
                    {address.checked && <Badge className="text-moa bg-moa-foreground/20">현재 설정된 주소</Badge>}
                  </>
                )}
              </div>
              <span>{address.roadAddress}</span>
              <div className="flex gap-1 items-center mt-2">
                {editId !== address.id && (
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => handleEdit(address.id, address.name)}>
                    수정
                  </Button>
                )}
                {!address.checked && (
                  <>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => setConfirmOpenId(address.id)}>
                      삭제
                    </Button>
                    <ConfirmDialog open={confirmOpenId === address.id} title={`'${address.name}' 주소를 삭제할까요?`} subTitle="" onOpenChange={(open) => setConfirmOpenId(open ? address.id : null)} onConfirm={() => removeAddress(address.id)} confirmText="주소 삭제" />
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditAddressPage;

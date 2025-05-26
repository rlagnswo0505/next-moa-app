import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import React from 'react';

type Props = {
  open?: boolean;
  title: string;
  subTitle: string;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  confirmText?: string;
};

/**
 * ConfirmDialog
 * @description 확인 다이얼로그 컴포넌트입니다.
 * 사용자가 확인 버튼을 클릭하면 onConfirm 콜백이 호출됩니다.
 * onOpenChange 콜백은 다이얼로그의 열림 상태를 제어하는 데 사용됩니다.
 * @param {boolean} open - 다이얼로그의 열림 상태입니다.
 * @param {string} title - 다이얼로그의 제목입니다.
 * @param {string} subTitle - 다이얼로그의 설명입니다.
 * @param {function} onOpenChange - 다이얼로그의 열림 상태를 제어하는 콜백 함수입니다.
 * @param {function} onConfirm - 확인 버튼 클릭 시 호출되는 콜백 함수입니다.
 * @param {string} confirmText - 확인 버튼의 텍스트입니다.
 * @returns {JSX.Element} - ConfirmDialog 컴포넌트입니다.
 */
const ConfirmDialog = ({ open = false, title, subTitle, onOpenChange = () => {}, onConfirm = () => {}, confirmText = '확인하기' }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{subTitle}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="flex-1">취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="bg-moa flex-1"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;

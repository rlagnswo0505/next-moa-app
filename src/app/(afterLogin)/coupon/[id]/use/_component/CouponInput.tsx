'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

const formSchema = z.object({
  code: z.string().min(1, '쿠폰 코드를 입력해주세요.').max(20, '쿠폰 코드는 최대 20자까지 입력할 수 있습니다.'),
});

const CouponInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.success('쿠폰 사용이 완료되었습니다.', {
      description: `(사용일시 : ${new Date().toLocaleDateString()})`,
      action: {
        label: '확인',
        onClick: () => console.log('Undo'),
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl className="md:text-base">
                  <Input placeholder="쿠폰 사용 코드를 입력해주세요." {...field} className="h-14" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-14" disabled={!form.formState.isValid || form.formState.isSubmitting}>
            사용하기
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CouponInput;

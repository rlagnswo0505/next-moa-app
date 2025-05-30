'use client';

import type React from 'react';

import { use, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { allCoupons } from '@/_data/allCoupon';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

type Params = Promise<{ id: string }>;

const reviewSchema = z.object({
  rating: z.number().min(1, '별점을 선택해주세요.'),
  reviewText: z.string().min(1, '리뷰 내용을 작성해주세요.').max(500, '500자 이하로 입력해주세요.'),
  private: z.boolean(),
  images: z.array(z.any()).max(5, '최대 5개의 이미지만 업로드할 수 있습니다.'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const ReviewPage = ({ params }: { params: Params }) => {
  const { id } = use(params);
  const coupon = allCoupons?.find((item: any) => item.id === Number(id));

  const [hoveredRating, setHoveredRating] = useState(0);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      reviewText: '',
      private: false,
      images: [],
    },
    mode: 'onChange',
  });

  const images = form.watch('images');

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + images.length > 5) {
      toast.error(
        '최대 5개의 이미지만 업로드할 수 있습니다.',

        {
          action: {
            label: '확인',
            onClick: () => console.log('Image upload error'),
          },
        }
      );
      return;
    }
    form.setValue('images', [...images, ...files], { shouldValidate: true });
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // 이미지 삭제
  const removeImage = (index: number) => {
    const newImages = images.filter((_: any, i: number) => i !== index);
    form.setValue('images', newImages, { shouldValidate: true });
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // 별점 클릭
  const handleStarClick = (starIndex: number) => {
    form.setValue('rating', starIndex, { shouldValidate: true });
  };

  // 별점 호버
  const handleStarHover = (starIndex: number) => {
    setHoveredRating(starIndex);
  };

  // 제출
  const onSubmit = (data: ReviewFormValues) => {
    // 서버 전송 로직
    console.log(data);
    toast.success('리뷰가 성공적으로 등록되었습니다!', {
      action: {
        label: '확인',
        onClick: () => console.log('Review submitted'),
      },
    });
    form.reset();
    setImagePreviews([]);
    setHoveredRating(0);
  };

  if (!coupon) {
    return <div className="w-full h-[50dvh] flex justify-center items-center">쿠폰을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h4 className="text-2xl font-bold text-center">리뷰 작성</h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-10">
            {/* 별점 선택 */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-2 flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" className="p-1 hover:scale-110 transition-transform" onClick={() => handleStarClick(star)} onMouseEnter={() => handleStarHover(star)} onMouseLeave={() => setHoveredRating(0)}>
                        <Star className={`w-10 h-10 ${star <= (hoveredRating || field.value) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{field.value > 0 && `${field.value}점`}</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2 flex flex-col items-center">
              <h4 className="text-2xl font-bold">식사는 맛있게 하셨나요?</h4>
              <div className="text-xl">[{coupon?.store}]</div>
              <div>메뉴 : {coupon?.menu}</div>
            </div>

            {/* 이미지 업로드 */}
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem className="space-y-2">
                  <FormLabel>이미지 (최대 5개)</FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">클릭하여 이미지를 업로드하세요</p>
                    </label>
                  </div>
                  {/* 이미지 미리보기 */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <Image src={preview || '/placeholder.svg'} alt={`Preview ${index + 1}`} width={200} height={200} className="w-full h-32 object-cover rounded-lg" />
                          <Button variant="outline" size={'icon'} type="button" onClick={() => removeImage(index)} className="absolute -top-3 -right-3 bg-white text-black rounded-full p-1 transition-opacity w-8 h-8">
                            <X />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col w-full gap-2">
              {/* 사장님께만 보이기 checkbox */}
              <FormField
                control={form.control}
                name="private"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <Checkbox id="private" checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                    <Label htmlFor="private" className="text-sm text-gray-600">
                      사장님에게만 보이기
                    </Label>
                  </FormItem>
                )}
              />

              {/* 리뷰 텍스트 */}
              <FormField
                control={form.control}
                name="reviewText"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea id="review-text" placeholder="식사에 후기를 작성해주세요 :)" {...field} rows={6} className="resize-none min-h-40 bg-accent" maxLength={500} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-muted-foreground">솔직하게 작성하신 리뷰는 고객님과 사장님들께 큰 도움이 됩니다. 그러나 허위사실, 명예훼손, 욕설, 타인 비방글은 서비스 이용약관이나 법률에 따라 제재를 받을 수 있습니다.</p>
            {/* 제출 버튼 */}
            <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
              리뷰 등록하기
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ReviewPage;

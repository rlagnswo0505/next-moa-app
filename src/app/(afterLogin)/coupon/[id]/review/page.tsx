'use client';

import type React from 'react';

import { use, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { allCoupons } from '@/_data/allCoupon';

type Params = Promise<{ id: string }>;

const ReviewPage = ({ params }: { params: Params }) => {
  const { id } = use(params);

  const coupon = allCoupons?.find((item: any) => item.id === Number(id));

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex: number) => {
    setHoveredRating(starIndex);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + images.length > 5) {
      alert('최대 5개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    setImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }
    if (!reviewText.trim()) {
      alert('리뷰 내용을 작성해주세요.');
      return;
    }

    // 여기서 리뷰 데이터를 서버로 전송
    console.log({
      rating,
      reviewText,
      reviewerName,
      images,
    });

    alert('리뷰가 성공적으로 등록되었습니다!');

    // 폼 초기화
    setRating(0);
    setReviewText('');
    setReviewerName('');
    setImages([]);
    setImagePreviews([]);
  };

  if (!coupon) {
    return <div className="w-full h-[50dvh] flex justify-center items-center">쿠폰을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h4 className="text-2xl font-bold text-center">리뷰 작성</h4>
        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
          {/* 별점 선택 */}
          <div className="space-y-2 flex flex-col items-center">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" className="p-1 hover:scale-110 transition-transform" onClick={() => handleStarClick(star)} onMouseEnter={() => handleStarHover(star)} onMouseLeave={() => setHoveredRating(0)}>
                  <Star className={`w-10 h-10 ${star <= (hoveredRating || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">{rating > 0 && `${rating}점`}</span>
            </div>
          </div>
          <div
            className="space-y-2
            flex flex-col items-center
          
          "
          >
            <h4 className="text-2xl font-bold">식사는 맛있게 하셨나요?</h4>
            <div className="text-xl">[{coupon?.store}]</div>
            <div>메뉴 : {coupon?.menu}</div>
          </div>

          {/* 이미지 업로드 */}
          <div className="space-y-2">
            <Label>이미지 (최대 5개)</Label>
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
                    <Button
                      variant="outline"
                      size={'icon'}
                      onClick={() => removeImage(index)}
                      className="absolute -top-3 -right-3 bg-white text-black rounded-full p-1 transition-opacity
                    w-8 h-8
                    "
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 리뷰 텍스트 */}
          <div className="space-y-2">
            <Label htmlFor="review-text">리뷰 내용</Label>
            <Textarea id="review-text" placeholder="식사에 후기를 작성해주세요 :)" value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={6} className="resize-none" />
            <div className="text-right text-sm text-gray-500">{reviewText.length}/500</div>
          </div>

          {/* 제출 버튼 */}
          <Button type="submit" className="w-full" size="lg">
            리뷰 등록하기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;

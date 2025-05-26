import { Ratings } from '@/app/_components/Rating';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { faker } from '@faker-js/faker';
import { reviewList } from '@/_data/review';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { User } from 'lucide-react';

import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const STAR_RATING = 4.3;
const REVIEW_COUNT = 1200;

const reviewImages = [
  {
    rating: 3.5,
    content: faker.lorem.sentence(),
    src: faker.image.url(),
    alt: faker.commerce.productName(),
  },
  {
    src: faker.image.url(),
    alt: faker.commerce.productName(),
  },
  {
    src: faker.image.url(),
    alt: faker.commerce.productName(),
  },
  {
    src: faker.image.url(),
    alt: faker.commerce.productName(),
  },
];

const ReviewTab = () => {
  return (
    <div>
      <div className="flex items-center gap-2 my-10 justify-center">
        <Ratings rating={STAR_RATING} variant="yellow" />
        <div className="text-xl flex">
          <strong>{STAR_RATING}</strong>
          <div className="flex items-center gap-1 text-muted-foreground/50">
            <strong>/ 5</strong>
            <span className="text-sm">({REVIEW_COUNT.toLocaleString()})</span>
          </div>
        </div>
      </div>
      {/* 이미지 6개 */}
      <ul className="grid grid-cols-4 gap-2 mt-2">
        {reviewImages.map((image, index) => (
          <li key={index} className={'rounded-lg overflow-hidden cursor-pointer'}>
            <AspectRatio ratio={1 / 1}>
              <Image fill src={image.src} alt={image.alt} className=" object-cover" />
              {index === 3 && <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-lg ">+ 더 보기</div>}
            </AspectRatio>
          </li>
        ))}
      </ul>
      <div>
        {reviewList.map((review, index) => (
          <div key={index} className="flex flex-col items-start gap-3 mt-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={review.profileImage} alt={`${review.nickname}의 프로필 이미지`} className="object-cover" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <span className="font-bold">{review.nickname}</span>
            </div>

            <div className="w-full flex justify-between items-center gap-2">
              <Ratings rating={review.rating} fill variant="yellow" size={16} />
              <span className="text-xs text-muted-foreground font-bold">{review.createdAt}</span>
            </div>
            {review.images.length > 0 && (
              <ul className="w-full grid grid-cols-5 gap-2 mt-2">
                {review.images.map((img, imgIndex) => (
                  <li
                    key={imgIndex}
                    className="rounded-lg cursor-pointer
                            overflow-hidden
                          "
                  >
                    <AspectRatio ratio={1 / 1}>
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    </AspectRatio>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-sm text-foreground whitespace-pre-line">{review.content}</p>
            <Separator className="my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewTab;

'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import Image from 'next/image';
import { faker } from '@faker-js/faker';

import 'swiper/css';
import 'swiper/css/pagination';

import './adbanner.css';

const AdBanner = () => {
  const ads = [
    {
      id: 1,
      imageUrl: faker.image.url(),
    },
    {
      id: 2,
      imageUrl: faker.image.url(),
    },
    {
      id: 3,
      imageUrl: faker.image.url(),
    },
    {
      id: 4,
      imageUrl: faker.image.url(),
    },
  ];

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      pagination={{
        clickable: true,
      }}
    >
      {ads.map((ad) => (
        <SwiperSlide key={ad.id}>
          <div className="relative w-full h-40 rounded-lg overflow-hidden">
            <Image src={ad.imageUrl} alt={'이미지'} className="object-cover" fill />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AdBanner;

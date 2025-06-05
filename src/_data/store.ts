import { faker } from '@faker-js/faker';

export const store = {
  id: 1,
  store: '라오니 피자 강남점',
  walkTime: 10,
  distance: '0.6km',
  remainingTime: '14분',
  image: faker.image.url(),
  rating: 4.5,
  address: '서울특별시 강남구 테헤란로 123',
  tel: '02-1234-5678',
  lat: 37.123456,
  lng: 127.123456,
  reviewCount: 123,
  // 영업시간
  businessHours: '매일 11:00 - 22:00',
  menus: [
    {
      id: 1,
      name: '콤비네이션 L 세트',
      category: '피자',
      discount: '20%',
      price: 24000,
      originalPrice: 30000,
      stock: 15,
      participated: 45,
      total: 60,
    },
    {
      id: 2,
      name: '포테이토 M 세트',
      category: '피자',
      discount: '15%',
      price: 20400,
      originalPrice: 24000,
      stock: 20,
      participated: 30,
      total: 50,
    },
    {
      id: 3,
      name: '치즈스틱',
      category: '사이드',
      discount: '10%',
      price: 9000,
      originalPrice: 10000,
      stock: 25,
      participated: 50,
      total: 75,
    },
    {
      id: 4,
      name: '콜라 1.25L',
      category: '음료',
      discount: '5%',
      price: 3800,
      originalPrice: 4000,
      stock: 30,
      participated: 60,
      total: 90,
    },
  ],
  review: [
    {
      userId: 'user',
      nickname: '사용자1',
      rating: 5,
      content: `이 음식은 정말 맛있어요! 특히 소스가 일품입니다. 다음에도 꼭 다시 주문할게요.
    
    아무거나

    아
    `,
      images: [
        {
          src: faker.image.url(),
          alt: '맛있는 음식 사진',
        },
        {
          src: faker.image.url(),
          alt: '음식 사진',
        },
      ],
      createdAt: '2025-05-10',
      profileImage: faker.image.avatar(),
    },
    {
      userId: 'user2',
      nickname: '사용자2',
      rating: 4,
      content: faker.lorem.sentences(),
      images: [
        {
          src: faker.image.url(),
          alt: '음식 사진',
        },
      ],
      createdAt: '2025-05-11',
      profileImage: faker.image.avatar(),
    },
  ],
};

import { faker } from '@faker-js/faker';

export const reviewList = [
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
  {
    userId: 'user3',
    nickname: '사용자3',
    rating: 3,
    content: faker.lorem.sentences(),
    images: [],
    createdAt: '2025-05-12',
    profileImage: faker.image.avatar(),
  },
];

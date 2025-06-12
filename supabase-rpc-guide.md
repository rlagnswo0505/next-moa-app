# Supabase RPC API 가이드

## 1. 메인(딜리스트) 통합 조회: `get_main_deal_list`

**파라미터**
- `p_user_lat`: 사용자 위도 (예: 37.5665)
- `p_user_lng`: 사용자 경도 (예: 126.9780)
- `p_category_id`: 카테고리ID (nullable)
- `p_keyword`: 검색어 (nullable)
- `p_sort_by`: 정렬기준 ('distance' or 'created_at')
- `p_limit_cnt`: 1페이지 조회 개수 (기본 20)
- `p_offset_cnt`: offset (기본 0)

**SQL 예시**
```sql
select * from get_main_deal_list(
  37.5665,
  126.9780,
  null,
  null,
  'distance',
  10,
  0
);
```

**JS 예시**
```js
await supabase.rpc('get_main_deal_list', {
  p_user_lat: 37.5665,
  p_user_lng: 126.9780,
  p_category_id: null,
  p_keyword: '',
  p_sort_by: 'distance',
  p_limit_cnt: 10,
  p_offset_cnt: 0
});
```

---

## 2. 딜 상세 조회: `get_deal_detail`

| 이름             | 타입      | 설명                |
|------------------|-----------|---------------------|
| p_deal_id        | integer   | 조회할 딜 ID (입력) |
| id               | integer   | 딜 고유 ID          |
| title            | text      | 딜 제목             |
| description      | text      | 딜 상세 설명        |
| price            | integer   | 판매가(할인가)      |
| discount_rate    | integer   | 할인율(%)           |
| original_price   | integer   | 원가                |
| stock            | integer   | 재고                |
| status           | text      | 딜 상태             |
| thumbnail_url    | text      | 대표 이미지 URL     |
| images           | text[]    | 추가 이미지 URL 배열|
| options          | jsonb     | 옵션정보            |
| store_id         | integer   | 매장 ID             |
| store_name       | text      | 매장명              |
| store_address    | text      | 매장 주소           |
| store_phone      | text      | 매장 연락처         |
| store_latitude   | numeric   | 매장 위도           |
| store_longitude  | numeric   | 매장 경도           |
| category_id      | integer   | 카테고리 ID         |
| category_name    | text      | 카테고리명          |

**SQL 예시**
```sql
select * from get_deal_detail(1);
```

**JS 예시**
```js
const { data, error } = await supabase.rpc('get_deal_detail', {
  p_deal_id: 1
});
if (error) {
  console.error('상세 조회 실패:', error);
} else {
  const detail = data[0];
  console.log('딜 상세:', detail);
}
```

---

## 3. 장바구니 불러오기: `get_cart_items`

| 이름                   | 타입      | 설명                  |
|------------------------|-----------|-----------------------|
| p_user_id              | uuid      | 회원 uuid(필수)       |
| cart_item_id           | integer   | 장바구니 항목 고유ID  |
| deal_id                | integer   | 딜ID                  |
| deal_title             | text      | 딜명                  |
| deal_thumbnail_url     | text      | 썸네일(대표 이미지)   |
| deal_price             | integer   | 판매가(딜 단가)       |
| deal_discount_rate     | integer   | 할인율                |
| deal_stock             | integer   | 딜 남은 재고          |
| option_id              | integer   | 옵션ID                |
| option_name            | text      | 옵션명                |
| option_additional_price| integer   | 옵션 추가금액         |
| option_stock           | integer   | 옵션 재고             |
| quantity               | integer   | 담은 수량             |
| added_at               | timestamp | 장바구니 담은 시각    |

**SQL 예시**
```sql
SELECT * FROM get_cart_items('00000000-0000-0000-0000-000000000003');
```

**JS 예시**
```js
await supabase.rpc('get_cart_items', { p_user_id: '00000000-0000-0000-0000-000000000003' });
```

---

## 4. 장바구니 추가: `add_to_cart`

| 파라미터         | 타입    | 설명                        |
|------------------|---------|-----------------------------|
| p_user_id        | UUID    | 장바구니 소유자(회원) ID    |
| p_deal_id        | INTEGER | 딜(상품) ID                 |
| p_deal_option_id | INTEGER | 옵션 ID (없으면 NULL)       |
| p_qty            | INTEGER | 담을 수량(기본 1)           |

**SQL 예시**
```sql
SELECT add_to_cart('00000000-0000-0000-0000-000000000003', 1, NULL, 2);
```

**JS 예시**
```js
await supabase.rpc('add_to_cart', {
  p_user_id: '00000000-0000-0000-0000-000000000003',
  p_deal_id: 1,
  p_deal_option_id: null,
  p_qty: 2
});
```

---

## 5. 장바구니 수량 변경: `update_cart_item_qty`

| 파라미터        | 타입    | 설명             |
|-----------------|---------|------------------|
| p_user_id       | UUID    | 회원(장바구니 주인) ID |
| p_cart_item_id  | INTEGER | 변경할 cart_items의 id(PK) |
| p_qty           | INTEGER | 변경할 수량 (0이하로 주면 항목 삭제) |

**SQL 예시**
```sql
SELECT update_cart_item_qty('00000000-0000-0000-0000-000000000003', 7, 3);
```

**JS 예시**
```js
await supabase.rpc('update_cart_item_qty', {
  p_user_id: '00000000-0000-0000-0000-000000000003',
  p_cart_item_id: 7,
  p_qty: 3
});
```

---

## 6. 장바구니 항목 삭제: `remove_from_cart`

| 파라미터        | 타입    | 설명                  |
|-----------------|---------|-----------------------|
| p_user_id       | UUID    | 회원(장바구니 주인) ID|
| p_cart_item_id  | INTEGER | 삭제할 cart_items의 id(PK) |

**SQL 예시**
```sql
SELECT remove_from_cart('00000000-0000-0000-0000-000000000003', 7);
```

**JS 예시**
```js
await supabase.rpc('remove_from_cart', {
  p_user_id: '00000000-0000-0000-0000-000000000003',
  p_cart_item_id: 7
});
```

---

## 7. 주문 생성/결제: `place_order`

| 파라미터       | 타입    | 설명                                      |
|----------------|---------|---------------------------------------------|
| p_user_id      | UUID    | 주문자(회원) 고유ID                        |
| p_items        | JSONB   | 주문할 cart_items 목록 예: `[{"cart_item_id":7,"qty":2}]` |
| p_pay_method   | TEXT    | 결제수단('CARD','KAKAO','NAVER', 등), 기본 'CARD' |

**SQL 예시**
```sql
SELECT place_order(
  '00000000-0000-0000-0000-000000000003',
  '[{"cart_item_id":7,"qty":2},{"cart_item_id":8,"qty":1}]'::jsonb,
  'CARD'
);
```

**JS 예시**
```js
await supabase.rpc('place_order', {
  p_user_id: '00000000-0000-0000-0000-000000000003',
  p_items: [{ cart_item_id: 7, qty: 2 }, { cart_item_id: 8, qty: 1 }],
  p_pay_method: 'CARD'
});
```

---

## 8. 마이페이지 주문 내역 조회: `get_my_orders`

| 파라미터   | 타입    | 설명                      |
|------------|---------|---------------------------|
| p_user_id  | UUID    | 회원(주문자) ID           |
| p_limit    | INTEGER | 1페이지 최대 반환 개수(기본 20) |
| p_offset   | INTEGER | 페이지 시작 위치(기본 0)  |

**SQL 예시**
```sql
SELECT * FROM get_my_orders('00000000-0000-0000-0000-000000000003', 10, 0);
```

**JS 예시**
```js
await supabase.rpc('get_my_orders', {
  p_user_id: '00000000-0000-0000-0000-000000000003',
  p_limit: 10,
  p_offset: 0
});
```

---

## 9. 내 쿠폰 목록 조회: `get_my_coupons`

| 파라미터   | 타입    | 설명                     |
|------------|---------|--------------------------|
| p_user_id  | UUID    | 회원(쿠폰 소유자) ID     |
| p_limit    | INTEGER | 1페이지 최대 반환 개수(기본 20) |
| p_offset   | INTEGER | 페이지 시작 위치(기본 0) |

**SQL 예시**
```sql
SELECT * FROM get_my_coupons('00000000-0000-0000-0000-000000000003', 10, 0);
```

**JS 예시**
```js
await supabase.rpc('get_my_coupons', {
  p_user_id: '00000000-0000-0000-0000-000000000003',
  p_limit: 10,
  p_offset: 0
});
```

---

## 10. 리뷰 등록: `write_review`

| 파라미터    | 타입    | 설명                                |
|-------------|---------|-------------------------------------|
| p_user_id   | UUID    | 회원(리뷰작성자) ID                 |
| p_coupon_id | INTEGER | 해당 쿠폰 ID                        |
| p_deal_id   | INTEGER | 딜(상품) ID                         |
| p_rating    | INTEGER | 평점(1~5)                           |
| p_comment   | TEXT    | 리뷰 코멘트                         |

**SQL 예시**
```sql
SELECT write_review(
  '00000000-0000-0000-0000-000000000001', -- user_id
  1,                                      -- coupon_id
  1,                                      -- deal_id
  5,                                      -- 평점
  '정말 맛있고 친절했어요!'                -- 코멘트
);
```

**JS 예시**
```js
const { data, error } = await supabase.rpc('write_review', {
  p_user_id:   '00000000-0000-0000-0000-000000000001',
  p_coupon_id: 1,
  p_deal_id:   1,
  p_rating:    5,
  p_comment:   '정말 맛있고 친절했어요!'
});
if (data && data[0] === 'OK') {
  // 성공 처리
} else {
  // 실패/중복 메시지 처리
}
```

---

## 11. 내가 쓴 리뷰 목록 조회: `get_my_reviews`

| 파라미터   | 타입    | 설명                      |
|------------|---------|---------------------------|
| p_user_id  | UUID    | 회원(작성자) ID           |
| p_limit    | INTEGER | 1페이지 최대 개수(기본 20)|
| p_offset   | INTEGER | 시작위치(기본 0)          |

**SQL 예시**
```sql
SELECT * FROM get_my_reviews('00000000-0000-0000-0000-000000000001', 10, 0);
```

**JS 예시**
```js
await supabase.rpc('get_my_reviews', {
  p_user_id: '00000000-0000-0000-0000-000000000001',
  p_limit: 10,
  p_offset: 0
});
```

---

## 12. 리뷰 수정/삭제: `update_or_delete_review`

| 파라미터   | 타입    | 설명                                   |
|------------|---------|----------------------------------------|
| p_user_id  | UUID    | 리뷰작성자 ID                          |
| p_review_id| INTEGER | 리뷰 PK                                |
| p_mode     | TEXT    | 'update' 또는 'delete'                 |
| p_rating   | INTEGER | (수정시) 평점(1~5, NULL 가능)          |
| p_comment  | TEXT    | (수정시) 코멘트(NULL 허용)             |

**SQL 예시**
```sql
-- 수정
SELECT update_or_delete_review(
  '00000000-0000-0000-0000-000000000001', 10, 'update', 4, '가격이 조금 아쉬움'
);

-- 삭제
SELECT update_or_delete_review(
  '00000000-0000-0000-0000-000000000001', 11, 'delete'
);
```

**JS 예시**
```js
// 수정
await supabase.rpc('update_or_delete_review', {
  p_user_id: '00000000-0000-0000-0000-000000000001',
  p_review_id: 10,
  p_mode: 'update',
  p_rating: 4,
  p_comment: '가격이 조금 아쉬움'
});

// 삭제
await supabase.rpc('update_or_delete_review', {
  p_user_id: '00000000-0000-0000-0000-000000000001',
  p_review_id: 11,
  p_mode: 'delete'
});
```
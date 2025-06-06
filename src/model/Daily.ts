export type DailyItem = {
  id: number;
  store: string;
  menus: string[];
  rating: number;
  review: number;
  discount: {
    min: number;
    max: number;
  };
};

export type DailyList = DailyItem[];

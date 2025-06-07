import HorizonScroll from '@/app/_components/HorizonScroll';
import AdBanner from './_component/AdBanner';
import CouponList from './_component/CouponList';
import SearchBar from '@/app/_components/SearchBar';
import DailyList from './_component/DailyList';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <SearchBar />
      <section className="px-2 mt-14 md:px-4">
        <AdBanner />
      </section>
      <section className="pl-2 md:pl-4">
        <HorizonScroll />
      </section>
      <section className="pl-2 md:pl-4">
        <h1 className="my-2 font-bold">언제나 다양하게, 데일리 할인</h1>
        <DailyList />
      </section>
      <section className="px-2 pb-20 md:px-4">
        <h2 className="font-bold text-lg">내 주변 할인 공구</h2>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-bold">
            <strong className="text-moa">30</strong>
            개의 공구
          </span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-muted-foreground text-sm">정렬기준</span>
            <Select defaultValue="apple">
              <SelectTrigger className="w-fit min-w-[100px] border-none shadow-none font-bold cursor-pointer" size="sm">
                <SelectValue placeholder="정렬기준" />
              </SelectTrigger>
              <SelectContent side="bottom" align="end">
                <SelectGroup>
                  <SelectItem value="apple">가까운 순</SelectItem>
                  <SelectItem value="banana">저가순</SelectItem>
                  <SelectItem value="blueberry">고가순</SelectItem>
                  <SelectItem value="grapes">인기순</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CouponList />
      </section>
    </div>
  );
};

export default Home;

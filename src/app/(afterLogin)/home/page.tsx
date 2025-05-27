import HorizonScroll from '@/app/_components/HorizonScroll';
import AdBanner from './_component/AdBanner';
import CouponList from './_component/CouponList';
import SearchBar from '@/app/_components/SearchBar';

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <SearchBar />
      <section className="px-4 mt-14">
        <AdBanner />
      </section>
      <section className="pl-4">
        <HorizonScroll />
      </section>
      <section className="px-4 pb-20">
        <CouponList />
      </section>
    </div>
  );
};

export default Home;

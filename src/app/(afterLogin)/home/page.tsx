import HorizonScroll from '@/app/_components/HorizonScroll';
import AdBanner from './_component/AdBanner';
import CouponList from './_component/CouponList';
import SearchBar from '@/app/_components/SearchBar';

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
      <section className="px-2 pb-20 md:px-4">
        <CouponList />
      </section>
    </div>
  );
};

export default Home;

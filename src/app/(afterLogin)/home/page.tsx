import AdBanner from './_component/AdBanner';
import CouponList from './_component/CouponList';
import HorizonScroll from './_component/HorizonScroll';
import SearchBar from './_component/SearchBar';

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

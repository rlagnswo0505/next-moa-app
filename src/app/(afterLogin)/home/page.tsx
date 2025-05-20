import React from 'react';
import SearchBar from './_component/SearchBar';
import AdBanner from './_component/AdBanner';

const Home = () => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <section className="mt-2.5">
        <SearchBar />
      </section>
      <section>
        <AdBanner />
      </section>
      <section></section>
      <section></section>
    </div>
  );
};

export default Home;

import React from 'react';
import Header from '../_components/Header';
import Footer from '../_components/Footer';

type Props = {
  children: React.ReactNode;
};

const AfterLoginLayout = ({ children }: Props) => {
  return (
    <>
      <section className="max-w-[600px] mx-auto">
        <Header />
        {children}
      </section>
      <Footer />
    </>
  );
};

export default AfterLoginLayout;

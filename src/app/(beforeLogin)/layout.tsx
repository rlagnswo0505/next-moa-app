import React from 'react';
import Header from '../_components/Header';

type Props = {
  children: React.ReactNode;
};

const AfterLoginLayout = ({ children }: Props) => {
  return (
    <>
      <section className="max-w-[600px] mx-auto">
        <Header rightButton={false} />
        <div>{children}</div>
      </section>
    </>
  );
};

export default AfterLoginLayout;

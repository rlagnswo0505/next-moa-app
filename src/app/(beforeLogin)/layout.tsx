import React from 'react';
import BeforeHeader from './_component/BeforeHeader';

type Props = {
  children: React.ReactNode;
};

const AfterLoginLayout = ({ children }: Props) => {
  return (
    <>
      <section className="max-w-[600px] mx-auto">
        <BeforeHeader />
        <div>{children}</div>
      </section>
    </>
  );
};

export default AfterLoginLayout;

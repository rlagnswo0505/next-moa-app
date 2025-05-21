import React from 'react';

const page = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <h1>쿠폰 상세 페이지</h1>
      {id}
    </div>
  );
};

export default page;

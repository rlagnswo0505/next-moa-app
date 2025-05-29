'use client';

import React from 'react';
import FullNaverMap from './_component/FullNaverMap';

const MapPage = () => {
  return (
    <div className="w-full h-[calc(100dvh-44px)] flex justify-center items-center">
      <FullNaverMap />
    </div>
  );
};

export default MapPage;

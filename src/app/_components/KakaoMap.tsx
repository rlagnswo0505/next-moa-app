// KakaoMap.tsx

import Script from 'next/script';
import React, { useRef, useEffect } from 'react';

declare global {
  interface Window {
    kakao: {
      maps: any;
    };
  }
}

const { kakao } = window;

function KakaoMap() {
  const container = useRef(null);
  const options = {
    center: new kakao.maps.LatLng(37.56637787425258, 126.97827585270615),
    level: 5,
  };
  useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);
    const location = [
      [37.56637787425258, 126.97827585270615],
      [37.56606939560325, 126.9826002893739],
      [37.56581495896049, 126.9752617019476],
    ];
    location.map((e) => {
      const markerPosition = new kakao.maps.LatLng(e[0], e[1]);
      new kakao.maps.Marker({ map, position: markerPosition });
    });
  }, []);
  return (
    <div className="container">
      <div id={'map'} ref={container}></div>
    </div>
  );
}

export default KakaoMap;

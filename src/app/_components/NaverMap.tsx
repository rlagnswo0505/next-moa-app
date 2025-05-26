import React, { useEffect } from 'react';

const APP_KEY = process.env.NEXT_PUBLIC_NAVER_APP_KEY;

const NaverMap = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!naver || !naver.maps || !mapRef.current) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.978),
      zoom: 10,
    });

    const locations = [
      { lat: 37.5665, lng: 126.978 },
      { lat: 37.5651, lng: 126.989 },
      { lat: 37.5673, lng: 126.975 },
    ];

    locations.forEach((location) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(location.lat, location.lng),
        map,
      });
    });
  }, []);
  return (
    <>
      <div id="map" ref={mapRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};

export default NaverMap;

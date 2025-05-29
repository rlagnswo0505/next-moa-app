'use client';

import { Button } from '@/components/ui/button';
import { Locate } from 'lucide-react';
import Script from 'next/script';
import React, { useEffect } from 'react';

const APP_KEY = process.env.NEXT_PUBLIC_NAVER_APP_KEY;

const FullNaverMap = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  const [myLocation, setMyLocation] = React.useState({
    lat: 37.5665, // Default to Seoul
    lng: 126.978,
  });

  const moveToMyLocation = () => {
    if (!naver || !naver.maps || !mapRef.current) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(myLocation.lat, myLocation.lng),
      zoom: 17,
    });

    new naver.maps.Marker({
      position: new naver.maps.LatLng(myLocation.lat, myLocation.lng),
      map,
    });
  };

  useEffect(() => {
    if (!naver || !naver.maps || !mapRef.current) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.978),
      zoom: 10,
    });

    const locations = [{ lat: 37.5665, lng: 126.978 }];

    locations.forEach((location) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(location.lat, location.lng),
        map,
      });
    });
  }, []);

  return (
    <>
      <Button variant={'outline'} className="fixed top-16 right-0 left-0 z-10 mx-auto w-30 rounded-full" size={'lg'} onClick={moveToMyLocation}>
        <Locate />
        현재 위치로
      </Button>
      <div
        id="map"
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </>
  );
};

export default FullNaverMap;

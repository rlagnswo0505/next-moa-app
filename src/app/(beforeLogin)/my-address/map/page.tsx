'use client';
import { Button } from '@/components/ui/button';
import { Locate } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import CenterMarker from './_component/CenterMarker';

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null); // naver.maps.Map 인스턴스 저장
  const [address, setAddress] = useState<{ roadAddress: string; jibunAddress: string }>({
    roadAddress: '',
    jibunAddress: '',
  });
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 37.5665, lng: 126.978 });
  const [isGrabbing, setIsGrabbing] = useState(false);

  // 지도 최초 1회 생성 및 이벤트 등록
  useEffect(() => {
    if (!window.naver || !window.naver.maps || !mapRef.current) return;
    const naver = window.naver;
    if (mapInstance.current) return; // 이미 생성된 경우 재생성 방지

    mapInstance.current = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: { style: naver.maps.ZoomControlStyle.SMALL, position: naver.maps.Position.TOP_RIGHT },
    });
    // 이벤트 등록
    naver.maps.Event.addListener(mapInstance.current, 'dragstart', function () {
      setIsGrabbing(true);
    });
    naver.maps.Event.addListener(mapInstance.current, 'dragend', function () {
      setIsGrabbing(false);
      const c = mapInstance.current.getCenter();
      setCenter({ lat: c.lat(), lng: c.lng() });
      getAddressFromLatLng(c.lat(), c.lng());
    });
    // 최초 주소 조회
    getAddressFromLatLng(center.lat, center.lng);
    // eslint-disable-next-line
  }, []); // 빈 배열로 최초 1회만 실행

  // center 변경 시 지도 중심 이동
  useEffect(() => {
    if (!window.naver || !window.naver.maps || !mapInstance.current) return;
    const naver = window.naver;
    const latlng = new naver.maps.LatLng(center.lat, center.lng);
    mapInstance.current.setCenter(latlng);
    // center가 바뀌면 주소도 갱신
    getAddressFromLatLng(center.lat, center.lng);
    // eslint-disable-next-line
  }, [center]);

  // 페이지 진입 시 현재 위치로 이동
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCenter({ lat, lng });
      },
      () => {
        // 위치 권한 거부 시 기본 위치 유지
      }
    );
    // eslint-disable-next-line
  }, []);

  // 좌표로 주소 변환
  const getAddressFromLatLng = (lat: number, lng: number) => {
    if (!window.naver || !window.naver.maps) return;
    window.naver.maps.Service.reverseGeocode(
      {
        coords: new window.naver.maps.LatLng(lat, lng),
        orders: 'roadaddr,addr',
      },
      (status: any, response: any) => {
        if (status === window.naver.maps.Service.Status.OK) {
          const result = response.v2.address;
          setAddress({
            roadAddress: result.roadAddress || '',
            jibunAddress: result.jibunAddress || '',
          });
        } else {
          setAddress({ roadAddress: '', jibunAddress: '' });
        }
      }
    );
  };

  // 현재 위치로 이동 (지도 인스턴스 재생성 없이 center만 변경)
  const moveToCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('현재 위치를 찾을 수 없습니다.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
      },
      () => {
        alert('현재 위치를 찾을 수 없습니다.');
      }
    );
  };

  return (
    <>
      <div id="map" ref={mapRef} className="w-full h-[80dvh] relative">
        {/* 가운데 마커 */}
        <CenterMarker isGrabbing={isGrabbing} />
        {/* 현재위치로 이동 */}
        <Button className="absolute top-4 left-4 z-20 shadow-lg rounded-full p-2 text-primary bg-primary-foreground hover:bg-accent-foreground/20" onClick={moveToCurrentLocation} size="icon">
          <Locate />
        </Button>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md z-9999">
        {isGrabbing ? (
          <div className="flex flex-col gap-1 mb-2">
            <h2 className="text-lg font-bold">주소 찾는 중...</h2>
            <span className="text-sm text-gray-800">주소 찾는 중...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-1 mb-2">
            <h2 className="text-lg font-bold">도로명: {address.roadAddress || '주소를 찾을 수 없습니다.'}</h2>
            <span className="text-sm text-gray-800">지번: {address.jibunAddress || '주소를 찾을 수 없습니다.'}</span>
          </div>
        )}

        <Button size={'lg'} className="rounded-full w-full mt-4" disabled={isGrabbing || !address.roadAddress}>
          {isGrabbing ? '주소 찾는 중' : '이 위치로 주소 등록'}
        </Button>
      </div>
    </>
  );
};

export default MapPage;

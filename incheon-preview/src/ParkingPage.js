import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';

function ParkingPage() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">인천공항 주차 정보</h2>
      <div className="text-center text-gray-600 mt-10">
        현재는 실시간 주차장 정보 제공이 어렵습니다. <br />
        대신&nbsp;
        <a
          href="https://www.airport.kr/ap_ko/965/subview.do"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          인천공항 공식 주차 안내 페이지
        </a>
        를 참고해주세요.
      </div>
      {/* 홈으로 돌아가기 링크 */}
    <div className="mt-8 text-center">
    <span
    onClick={() => navigate('/')}
    className="text-sm text-gray-500 hover:underline cursor-pointer"
    >
    홈으로 돌아가기
    </span>
    </div>
    </div>
  );
}

export default ParkingPage;

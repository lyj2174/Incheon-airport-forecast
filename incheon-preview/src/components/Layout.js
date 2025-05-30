// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white flex flex-col justify-between">
         <header className="bg-[#fcfcfc] shadow h-20 px-4 flex items-center justify-between">
      {/* 로고 */}
      <div className="flex-shrink-0">
        <img
          src="/incheon.png"
          alt="Incheon Airport Forecast"
          className="w-[180px] sm:w-[250px] h-auto object-contain translate-x-2 -translate-y-1"
        />
      </div>
    
      {/* 메뉴 (좌우 스크롤 허용, 줄바꿈 금지) */}
      <div className="flex gap-4 overflow-x-auto flex-nowrap items-center ml-4 mr-7 sm:ml-0">
        <Link to="/weather" className="text-base sm:text-base text-black font-dohyun whitespace-nowrap hover:underline">날씨</Link>
        <Link to="/tips" className="text-base sm:text-base text-black font-dohyun whitespace-nowrap hover:underline">여행TIP</Link>
        <Link to="/parking" className="text-base sm:text-base text-black font-dohyun whitespace-nowrap hover:underline">주차정보</Link>
        <Link to="/exchange" className="text-base sm:text-base text-black font-dohyun whitespace-nowrap hover:underline">환율정보</Link>
      </div>
    </header>

      <main className="max-w-screen-md mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;

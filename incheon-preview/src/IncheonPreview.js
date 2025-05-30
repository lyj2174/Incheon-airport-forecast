import React, { useState,useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





function IncheonPreview() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const navigate = useNavigate();
  const formatDate = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().split('T')[0];
  };

  const handleSubmit = () => {
    if (!selectedDate || selectedHour === null) {
      alert("날짜와 시간을 선택해주세요.");
      return;
    }
    alert(`예측 요청\n날짜: ${formatDate(selectedDate)}\n시간: ${selectedHour}:00`);
    navigate(`/result?date=${formatDate(selectedDate)}&hour=${selectedHour}`);
  };

const scrollRef = useRef(null);

let isDown = false;
let startX;
let scrollLeft;

const handleMouseDown = (e) => {
  isDown = true;
  scrollRef.current.classList.add('cursor-grabbing');
  startX = e.pageX - scrollRef.current.offsetLeft;
  scrollLeft = scrollRef.current.scrollLeft;
};

const handleMouseLeave = () => {
  isDown = false;
  scrollRef.current.classList.remove('cursor-grabbing');
};

const handleMouseUp = () => {
  isDown = false;
  scrollRef.current.classList.remove('cursor-grabbing');
};

const handleMouseMove = (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollRef.current.offsetLeft;
  const walk = (x - startX) * 1.5; // 스크롤 속도 조절
  scrollRef.current.scrollLeft = scrollLeft - walk;
};
 

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


<main className="w-full max-w-[100%] sm:max-w-5xl mx-auto px-4 sm:px-6 py-8 text-center">
        <p className="text-base font-dohyun text-gray-700 mb-6">
          날짜와 시간을 선택하면 비행기 탑승 소요시간을 미리 보실 수 있습니다.
          </p>

        <Calendar
          onChange={(date) => {
            if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
              setSelectedDate(null);
              setSelectedHour(null);
            } else {
              setSelectedDate(date);
              setSelectedHour(null);
            }
          }}
          value={selectedDate}
          formatDay={(locale, date) => date.getDate()}
          tileDisabled={({ date }) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
          }}
          tileClassName={({ date }) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today ? 'calendar-disabled' : null;
          }}
          className="mx-auto mb-4 rounded-lg shadow react-calendar"
        />

{selectedDate && (
  <>
    <p className="text-center text-sm mb-3 text-gray-600">
      선택한 날짜: <strong>{formatDate(selectedDate)}</strong>
    </p>

    <div
  ref={scrollRef}
  className="overflow-x-auto flex gap-2 mb-4 pb-2 timeslot-scroll-container cursor-grab select-none"
  onMouseDown={handleMouseDown}
  onMouseLeave={handleMouseLeave}
  onMouseUp={handleMouseUp}
  onMouseMove={handleMouseMove}
>
  {Array.from({ length: 24 }, (_, i) => (
    <button
      key={i}
      onClick={() => setSelectedHour(i)}
      className={`min-w-[100px] px-4 py-2 rounded-lg border text-sm shadow-sm transition-all duration-200 ${
        selectedHour === i
          ? 'bg-emerald-600 text-white border-emerald-600'
          : 'bg-white border-gray-300 text-gray-800 hover:bg-emerald-100'
      }`}
    >
      {i}:00 ~ {i + 1}:00
    </button>
  ))}
</div>




            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              결과 보기
            </button>
          </>
        )}
      </main>

      <footer className="bg-[#ffffff] text-center text-sm text-gray-700 py-4">
        <p className="mb-1 font-semibold">Flight time required — Calculator</p>
        <p className="text-xs text-gray-600">Feedback</p>
        <p className="text-xs text-blue-700 underline">lyj2174@hufs.ac.kr</p>
      </footer>
    </div>
  );
}

export default IncheonPreview;
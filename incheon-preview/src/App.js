import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IncheonPreview from './IncheonPreview';
import WeatherPage from './WeatherPage';
import TipsPage from './TipsPage.js';
import ResultPage from './ResultPage';
import ParkingPage from './ParkingPage';
import ExchangePage from './ExchangePage';

function App() {
  // ✅ Render 슬립 방지를 위한 ping 요청
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://incheon-airport-forecast.onrender.com/ping");
    }, 5 * 60 * 1000); // 5분 간격으로 요청

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IncheonPreview />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/exchange" element={<ExchangePage />} />
      </Routes>
    </Router>
  );
}

export default App;

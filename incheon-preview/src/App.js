import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IncheonPreview from './IncheonPreview';
import WeatherPage from './WeatherPage';
import TipsPage from './TipsPage.js';
import ResultPage from './ResultPage';
import ParkingPage from './ParkingPage';
import ExchangePage from './ExchangePage';

function App() {
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

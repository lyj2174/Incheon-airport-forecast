import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';

function WeatherPage() {
  const API_KEY = 'a0d1cd1b04311d34818eb4f1a5aeabc7'; // <- 네 키 넣기
  const navigate = useNavigate();
  const airport = { name: '인천공항', lat: 37.4602, lon: 126.4407 };

  const cities = [
    { name: '도쿄', lat: 35.6895, lon: 139.6917 },
    { name: '로마', lat: 41.9028, lon: 12.4964 },
    { name: '런던', lat: 51.5074, lon: -0.1278 },
    { name: '방콕', lat: 13.7563, lon: 100.5018 },
    { name: '시드니', lat: -33.8688, lon: 151.2093 },
    { name: '아부다비', lat: 24.4539, lon: 54.3773 },
    { name: '이스탄불', lat: 41.0082, lon: 28.9784 },
    { name: '자카르타', lat: -6.2088, lon: 106.8456 },
    { name: '타이베이', lat: 25.0330, lon: 121.5654 },
    { name: '파리', lat: 48.8566, lon: 2.3522 },
    { name: '하노이', lat: 21.0285, lon: 105.8542 },
    { name: '홍콩', lat: 22.3193, lon: 114.1694 },
    { name: '호치민', lat: 10.8231, lon: 106.6297 },
    { name: '쿠알라룸푸르', lat: 3.1390, lon: 101.6869 },
    { name: '뉴욕', lat: 40.7128, lon: -74.0060 },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const [airportWeather, setAirportWeather] = useState(null);
  const [cityWeathers, setCityWeathers] = useState({});

  // 인천공항 날씨
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${airport.lat}&lon=${airport.lon}&appid=${API_KEY}&units=metric&lang=kr`)
      .then(res => setAirportWeather(res.data))
      .catch(err => console.error('인천공항 날씨 오류:', err));
  }, []);

  // 도시별 날씨
  useEffect(() => {
    cities.forEach(city => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=kr`)
        .then(res => {
          setCityWeathers(prev => ({ ...prev, [city.name]: res.data }));
        })
        .catch(err => {
          console.error(`${city.name} 날씨 오류:`, err);
        });
    });
  }, []);

  return (
    <Layout>
    <div className="min-h-screen px-6 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">인천공항 날씨</h2>
      {airportWeather ? (
        <div className="max-w-md mx-auto bg-blue-50 p-6 rounded-xl shadow text-center space-y-2 mb-10">
          <p className="text-xl font-semibold text-blue-800">{airportWeather.weather[0].description}</p>
          <p>🌡️ 온도: {airportWeather.main.temp} °C</p>
          <p>💧 습도: {airportWeather.main.humidity}%</p>
          <p>🌬️ 바람: {airportWeather.wind.speed} m/s</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">날씨 불러오는 중...</p>
      )}

      <h3 className="text-xl font-bold text-center mb-4">주요 여행지 날씨</h3>

      <div className="flex overflow-x-auto gap-4 pb-4 px-1">
        {cities.map(city => (
          <div
            key={city.name}
            className="min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-md p-4 flex-shrink-0 text-center"
          >
            <h4 className="text-md font-semibold mb-1">{city.name}</h4>
            {cityWeathers[city.name] ? (
              <>
                <p className="text-gray-700">{cityWeathers[city.name].weather[0].description}</p>
                <p className="text-sm">🌡️ {cityWeathers[city.name].main.temp} °C</p>
                <p className="text-sm">💧 {cityWeathers[city.name].main.humidity}%</p>
              </>
            ) : (
              <p className="text-sm text-gray-400">로딩 중...</p>
            )}
          </div>
        ))}
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
    </Layout>
  ); 
} 

export default WeatherPage;

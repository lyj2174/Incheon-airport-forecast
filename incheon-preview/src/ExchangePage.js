import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';

function ExchangePage() {
  const [rates, setRates] = useState(null);
  const navigate = useNavigate();
  const currencies = [
    { code: 'USD', name: '미국 달러' },
    { code: 'EUR', name: '유로' },
    { code: 'JPY', name: '일본 엔' },
    { code: 'CNY', name: '중국 위안' },
    { code: 'THB', name: '태국 바트' },
    { code: 'VND', name: '베트남 동' },
  ];

  const unitMultipliers = {
    USD: 1,
    EUR: 1,
    JPY: 100,
    CNY: 1,
    THB: 1,
    VND: 100,
  };

  useEffect(() => {
    axios
      .get(
        'https://api.apilayer.com/exchangerates_data/latest?base=KRW&symbols=USD,EUR,JPY,CNY,THB,VND',
        {
          headers: {
            apikey: 'fjAibiyOhe5DPHBhOVi61ALAfbE1nKmN',
          },
        }
      )
      .then((res) => {
        const rawRates = res.data.rates;
        const converted = {};
        Object.entries(rawRates).forEach(([code, value]) => {
          const multiplier = unitMultipliers[code] || 1;
          const rate = (multiplier / value).toFixed(2); // 환율 계산
          converted[code] = rate;
        });
        setRates(converted);
      })
      .catch((err) => {
        console.error('환율 API 오류:', err);
      });
  }, []);

  return (
    <Layout>
    <div className="min-h-screen px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">💱 오늘의 환율 (KRW 기준)</h2>

      {rates ? (
        <div className="flex flex-wrap justify-center gap-4">
          {currencies.map(({ code, name }) => (
            <div
              key={code}
              className="w-44 bg-blue-50 border border-blue-200 rounded-xl shadow p-4 text-center"
            >
              <h3 className="text-lg font-semibold text-blue-800">{name}</h3>
              <p className="text-sm text-gray-700">{code}</p>
              <p className="text-xl font-bold text-blue-900 mt-2">
                {Number(rates[code]).toLocaleString()} 원
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ({unitMultipliers[code]} {code} 기준)
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">환율 정보를 불러오는 중입니다...</p>
      )}
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

export default ExchangePage;

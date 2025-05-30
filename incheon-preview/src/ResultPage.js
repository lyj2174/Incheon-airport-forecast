// src/ResultPage.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';


function ResultPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const date = searchParams.get('date');
    const hour = searchParams.get('hour');
    
    console.log('✅ date:', date);
    console.log('✅ hour:', hour);    

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (date && hour !== null) {
      axios.get(`https://incheon-airport-forecast.onrender.com/predict?date=${date}&hour=${hour}`, {
            withCredentials: false,
          })
            .then(res => {
              console.log('예측 응답:', res.data);
              setResult(res.data);
              setLoading(false);
            })
            .catch(err => {
              console.error('예측 요청 실패:', err);
              setLoading(false);
            });
    }
  }, [date, hour]);

  if (loading) return <div className="text-center mt-10">결과를 불러오는 중입니다...</div>;
  if (!result || result.error) return <div className="text-center text-red-600 mt-10">예측 데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">예측 결과</h2>

      <div className="text-center my-6 p-6 bg-blue-50 border border-blue-300 rounded-xl">
        <p className="text-xl font-bold text-blue-800 mb-2">
          ✈️ 출국 예상 소요 시간: {result.estimated_time_minutes}분
        </p>
        <p className="text-base text-gray-700">
          현재 혼잡도 수준은 <strong>{result.congestion_level}</strong> 입니다.
        </p>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">시간대별 탑승객 수</h3>
      <Bar
        data={{
          labels: result.graph_data.hours,
          datasets: [
            {
              label: '탑승객 수',
              data: result.graph_data.passenger_counts,
              backgroundColor: 'rgba(37, 99, 235, 0.6)', // blue-600
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.parsed.y} 명`,
              },
            },
          },
        }}
      />
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

export default ResultPage;

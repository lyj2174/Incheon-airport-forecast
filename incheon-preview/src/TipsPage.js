import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';

function TipsPage() {
    const navigate = useNavigate();
  const Section = ({ title, children }) => (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 mb-6">
      <h3 className="text-xl font-bold text-blue-800 mb-2">{title}</h3>
      <div className="text-sm text-gray-800 space-y-2">{children}</div>
    </div>
  );

  return (
    <Layout>
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">여행 TIP 총정리</h2>

      <Section title="1. 수하물 관련 꿀팁">
        <ul className="list-disc ml-5 space-y-1">
          <li>국제선 일반 수하물 허용: 23kg 이하, 158cm 이내 (가로+세로+높이)</li>
          <li>기내 반입 제한: 액체 100ml 이하만 가능 (지퍼백 필수)</li>
          <li>삼각김밥, 젤리, 고추장도 액체 취급</li>
          <li>노트북, 보조배터리: 반드시 기내로 가져가야 함</li>
        </ul>
      </Section>

      <Section title="2. 공항 출국 절차">
        <ol className="list-decimal ml-5 space-y-1">
          <li>항공사 카운터에서 수속 (e-ticket, 여권 제시)</li>
          <li>수하물 위탁</li>
          <li>출국심사 (자동심사 가능 여부 확인!)</li>
          <li>탑승 게이트로 이동 (보안검색 후 면세구역 진입)</li>
        </ol>
      </Section>

      <Section title="3. 공항 내 서비스 & 팁">
        <ul className="list-disc ml-5 space-y-1">
          <li>무료 와이파이 제공 (SSID: Incheon Airport Free WiFi)</li>
          <li>노트북 충전 가능한 좌석 많음 (탑승동 및 게이트 근처)</li>
          <li>캡슐호텔, 샤워실, 마사지샵 존재 (유료)</li>
        </ul>
      </Section>

      <Section title="4. 세관 & 면세 상식">
        <ul className="list-disc ml-5 space-y-1">
          <li>해외 구매물품 800달러까지 면세</li>
          <li>전자담배 액상도 100ml 이하로 제한됨</li>
          <li>고가 시계, 명품 가방은 신고 권장</li>
        </ul>
      </Section>

      <Section title="5. 해외여행 필수 앱 & 꿀팁">
        <ul className="list-disc ml-5 space-y-1">
          <li><strong>구글 번역</strong>: 사진으로도 번역 가능</li>
          <li><strong>카카오 T</strong>: 공항 리무진, 택시 예약 편리</li>
          <li><strong>트리플</strong>: 여행 일정 정리 + 오프라인 지도</li>
          <li>비행기 탑승권은 캡처해서 저장해두기 (배터리 꺼져도 대비)</li>
        </ul>
      </Section>

      <Section title="6. 돌발 상황 대처법">
        <ul className="list-disc ml-5 space-y-1">
          <li>비행기 지연 시 항공사 카운터에 문의하면 식사 쿠폰 받을 수 있음</li>
          <li>여권 분실 시: 인천공항 내 출입국관리사무소 방문 → 긴급여권 발급</li>
          <li>짐 안 나왔을 땐: 항공사 수하물 사무실에 즉시 신고</li>
        </ul>
      </Section>

      <Section title="7. 자주 묻는 질문 (FAQ)">
        <ul className="list-disc ml-5 space-y-1">
          <li>Q: 수하물 무게 초과 시? → kg당 추가 요금 부과</li>
          <li>Q: 기내 반입 가능한 음식? → 포장된 간식류는 대부분 가능</li>
          <li>Q: 면세점은 언제까지? → 탑승 30분 전까지 이용 가능</li>
        </ul>
      </Section>
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

export default TipsPage;

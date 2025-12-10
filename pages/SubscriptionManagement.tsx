import React from 'react';
import { ArrowLeft, Calendar, Repeat, CreditCard, ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

export const SubscriptionManagement: React.FC = () => {
  const navigate = useNavigate();

  // Mock Subscription Data
  const subscriptions = [
    {
      id: 'SUB-01',
      product: PRODUCTS[2], // 멀티비타민
      interval: '4주',
      nextDate: '2024.04.15',
      paymentMethod: '신용카드 (1234)',
      count: 3 // 3회차
    },
    {
      id: 'SUB-02',
      product: PRODUCTS[5], // 아이 프로텍트
      interval: '8주',
      nextDate: '2024.05.01',
      paymentMethod: '네이버페이',
      count: 1 // 1회차
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">정기구독 관리</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* Active Subscriptions */}
        <div className="space-y-4">
          <h2 className="px-1 text-sm font-bold text-gray-500 dark:text-gray-400">이용 중인 구독 서비스</h2>
          {subscriptions.map((sub) => (
            <div key={sub.id} className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 animate-slide-up relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 bg-primary/10 rounded-bl-2xl">
                 <span className="text-xs font-bold text-primary flex items-center gap-1">
                   <Repeat size={12} /> {sub.interval} 반복
                 </span>
              </div>
              
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                  <img src={sub.product.image} alt={sub.product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <p className="text-xs font-bold text-gray-400 mb-1">{sub.product.brand}</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-2">{sub.product.name}</p>
                  <div className="flex items-center gap-2">
                     <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">현재 {sub.count}회차 이용중</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Calendar size={14} />
                    <span>다음 결제일</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{sub.nextDate}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <CreditCard size={14} />
                    <span>결제수단</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{sub.paymentMethod}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                 <button className="py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                   이번 회차 건너뛰기
                 </button>
                 <button className="py-3 rounded-xl bg-primary/5 text-primary text-sm font-bold hover:bg-primary/10 transition-colors">
                   배송지/날짜 변경
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-5 text-white shadow-lg shadow-primary/20">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <AlertCircle size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-1">구독하면 더 저렴해요!</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-3">
                        정기구독 신청 시 매회 <strong>5% 즉시 할인</strong>과 무료배송 혜택을 드립니다.
                    </p>
                    <button onClick={() => navigate('/list')} className="text-xs font-bold bg-white text-primary px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors">
                        구독 가능한 상품 보기
                    </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};
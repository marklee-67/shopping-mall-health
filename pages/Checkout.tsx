import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-28">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border-light dark:border-border-dark bg-white dark:bg-background-dark px-4">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">주문/결제</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 space-y-2 p-2">
        {/* Order Items Accordion */}
        <section className="bg-white dark:bg-white/5 rounded-xl overflow-hidden shadow-sm">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between p-4"
          >
            <p className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">주문상품 (2개)</p>
            <ChevronDown size={24} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="border-t border-border-light dark:border-border-dark">
              <div className="flex items-center gap-4 p-4 border-b border-border-light dark:border-border-dark last:border-0">
                <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="item" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="font-medium text-text-light-primary dark:text-text-dark-primary line-clamp-1">활력충전 비타민C 1000</p>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">90정 / 1개</p>
                </div>
                <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">18,000원</p>
              </div>
              <div className="flex items-center gap-4 p-4">
                <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="item" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="font-medium text-text-light-primary dark:text-text-dark-primary line-clamp-1">알티지 오메가3 플러스</p>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">60캡슐 / 1개</p>
                </div>
                <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">25,000원</p>
              </div>
            </div>
          )}
        </section>

        {/* Shipping Info */}
        <section className="bg-white dark:bg-white/5 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">배송지 정보</h3>
            <button className="text-sm font-bold text-primary">변경</button>
          </div>
          <div className="space-y-1 mb-4">
            <p className="font-bold text-text-light-primary dark:text-text-dark-primary">김민준</p>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">010-1234-5678</p>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">서울특별시 강남구 테헤란로 123, 45층</p>
          </div>
          <div className="relative">
            <select className="w-full appearance-none rounded-lg border border-border-light dark:border-gray-600 bg-white dark:bg-gray-800 py-3 pl-4 pr-10 text-sm text-text-light-primary dark:text-text-dark-primary focus:border-primary focus:ring-primary">
              <option value="">배송 메모를 선택해주세요.</option>
              <option value="door">문 앞에 놓아주세요.</option>
              <option value="security">경비실에 맡겨주세요.</option>
              <option value="call">배송 전 연락주세요.</option>
            </select>
            <ChevronDown size={20} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-white dark:bg-white/5 rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-4">결제 수단</h3>
          <div className="space-y-3">
            {[
              { id: 'card', label: '신용/체크카드' },
              { id: 'naver', label: '네이버페이' },
              { id: 'kakao', label: '카카오페이' },
              { id: 'phone', label: '휴대폰 결제' },
            ].map((method, index) => (
              <label key={method.id} className={`flex cursor-pointer items-center rounded-lg border p-4 transition-colors ${index === 0 ? 'border-primary bg-primary/5' : 'border-border-light dark:border-gray-600'}`}>
                <input
                  type="radio"
                  name="payment"
                  defaultChecked={index === 0}
                  className="h-5 w-5 border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                />
                <span className={`ml-3 text-base font-medium ${index === 0 ? 'text-primary' : 'text-text-light-primary dark:text-text-dark-primary'}`}>
                  {method.label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="bg-white dark:bg-white/5 rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-4">결제 금액</h3>
          <div className="space-y-2 border-b border-border-light dark:border-border-dark pb-4 text-base">
            <div className="flex justify-between text-text-light-secondary dark:text-text-dark-secondary">
              <span>총 상품금액</span>
              <span>43,000원</span>
            </div>
            <div className="flex justify-between text-text-light-secondary dark:text-text-dark-secondary">
              <span>배송비</span>
              <span>3,000원</span>
            </div>
            <div className="flex justify-between text-red-500 font-medium">
              <span>할인금액</span>
              <span>- 5,000원</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">최종 결제 금액</span>
            <span className="text-xl font-bold text-primary">41,000원</span>
          </div>
        </section>

        {/* Consent */}
        <section className="bg-white dark:bg-white/5 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="relative flex items-center">
                <input 
                    type="checkbox" 
                    id="consent" 
                    defaultChecked
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:bg-primary checked:border-transparent focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                />
                <Check size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </div>
            <label htmlFor="consent" className="ml-2 cursor-pointer text-sm text-text-light-primary dark:text-text-dark-primary select-none">
              주문 내용을 확인하였으며, 결제에 동의합니다.
            </label>
          </div>
        </section>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border-light dark:border-border-dark bg-white dark:bg-background-dark p-4 shadow-top">
        <button className="w-full h-14 rounded-xl bg-primary text-base font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors">
          41,000원 결제하기
        </button>
      </div>
    </div>
  );
};
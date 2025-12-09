import React from 'react';
import { ArrowLeft, Home, X, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = [PRODUCTS[6], PRODUCTS[7], PRODUCTS[8]]; // Mock cart items

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-40">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border-light dark:border-border-dark bg-white dark:bg-background-dark px-4">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">장바구니</h1>
        <button onClick={() => navigate('/')} className="flex h-10 w-10 items-center justify-center -mr-2 text-text-light-primary dark:text-text-dark-primary">
          <Home size={24} />
        </button>
      </header>

      <main className="flex-1">
        <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark bg-white dark:bg-background-dark px-4 py-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 rounded-full border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              id="select-all"
            />
            <label htmlFor="select-all" className="text-base font-medium text-text-light-primary dark:text-text-dark-primary">
              전체선택 (3/3)
            </label>
          </div>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400">
            선택삭제
          </button>
        </div>

        <div className="mt-2 space-y-2">
          {cartItems.map((item, index) => (
            <div key={item.id} className="relative bg-white dark:bg-white/5 p-4 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500">
                <X size={20} />
              </button>
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 rounded-full border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                <div className="h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <p className="pr-6 text-sm font-semibold text-text-light-primary dark:text-text-dark-primary leading-tight line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">{item.brand}</p>
                  <p className="text-base font-bold text-text-light-primary dark:text-text-dark-primary mt-1">
                    {item.price.toLocaleString()}원
                  </p>
                  <div className="mt-2 flex h-8 w-28 items-center justify-between rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-black/20">
                    <button className="flex h-full w-9 items-center justify-center text-gray-500 hover:text-primary transition-colors">
                      <Minus size={16} />
                    </button>
                    <span className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">1</span>
                    <button className="flex h-full w-9 items-center justify-center text-gray-500 hover:text-primary transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-20 left-0 right-0 z-10 border-t border-border-light dark:border-border-dark bg-white dark:bg-background-dark p-4 shadow-top">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-base text-text-light-secondary dark:text-text-dark-secondary">
            <span>상품 금액</span>
            <span>152,000원</span>
          </div>
          <div className="flex justify-between text-base text-text-light-secondary dark:text-text-dark-secondary">
            <span>배송비</span>
            <span>+ 3,000원</span>
          </div>
          <div className="my-2 h-px bg-border-light dark:border-border-dark"></div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">결제 예정 금액</span>
            <span className="text-xl font-bold text-primary">155,000원</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full h-14 rounded-xl bg-primary text-base font-bold text-white hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
        >
          155,000원 결제하기
        </button>
      </footer>
    </div>
  );
};

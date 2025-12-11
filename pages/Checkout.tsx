import React, { useState, useMemo } from 'react';
import { ArrowLeft, ChevronDown, Check, CreditCard, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const { cartItems } = useCart();
  const { user } = useAuth();

  // Calculate totals based on selected items in cart
  const { totalProductPrice, totalDiscount, shippingFee, finalPrice, selectedItems } = useMemo(() => {
    const selected = cartItems.filter(item => item.selected);
    let originalPrice = 0;
    let productPrice = 0;

    selected.forEach(item => {
      originalPrice += (item.originalPrice || item.price) * item.quantity;
      productPrice += item.price * item.quantity;
    });

    const discount = originalPrice - productPrice;
    // 배송비 정책: 상품 금액이 있으면 3000원, 없으면 0원 (Cart.tsx와 동일 로직)
    const shipping = productPrice > 0 ? 3000 : 0;
    
    return {
      totalProductPrice: productPrice,
      totalDiscount: discount,
      shippingFee: shipping,
      finalPrice: productPrice + shipping,
      selectedItems: selected
    };
  }, [cartItems]);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-28">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white dark:bg-background-dark px-4">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">주문/결제</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 space-y-4 p-4">
        {/* Order Items Accordion */}
        <section className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between p-5 bg-gray-50/50 dark:bg-white/5"
          >
            <p className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">주문상품 ({selectedItems.length}개)</p>
            <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="border-t border-gray-100 dark:border-gray-800">
              {selectedItems.length > 0 ? (
                selectedItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-100 dark:border-gray-700">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="font-bold text-sm text-text-light-primary dark:text-text-dark-primary line-clamp-1">{item.name}</p>
                      <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-0.5">{item.brand} / {item.quantity}개</p>
                    </div>
                    <p className="font-bold text-text-light-primary dark:text-text-dark-primary">{(item.price * item.quantity).toLocaleString()}원</p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  선택된 상품이 없습니다.
                </div>
              )}
            </div>
          )}
        </section>

        {/* Shipping Info */}
        <section className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">배송지 정보</h3>
            <button className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">변경</button>
          </div>
          <div className="space-y-1 mb-4 pl-1">
            <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-lg text-text-light-primary dark:text-text-dark-primary">{user?.name || '김민준'}</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-1.5 py-0.5 rounded">기본배송지</span>
            </div>
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{user?.phone || '010-1234-5678'}</p>
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{user?.address || '서울특별시 강남구 테헤란로 123, 45층'}</p>
          </div>
          <div className="relative">
            <select className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-3.5 pl-4 pr-10 text-sm font-medium text-text-light-primary dark:text-text-dark-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
              <option value="">배송 메모를 선택해주세요.</option>
              <option value="door">문 앞에 놓아주세요.</option>
              <option value="security">경비실에 맡겨주세요.</option>
              <option value="call">배송 전 연락주세요.</option>
            </select>
            <ChevronDown size={20} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary mb-4">결제 수단</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'card', label: '신용/체크카드', icon: CreditCard },
              { id: 'naver', label: '네이버페이', icon: null },
              { id: 'kakao', label: '카카오페이', icon: null },
              { id: 'phone', label: '휴대폰 결제', icon: Smartphone },
            ].map((method, index) => (
              <label key={method.id} className={`flex flex-col items-center justify-center gap-2 cursor-pointer rounded-xl border p-4 transition-all hover:bg-gray-50 ${index === 0 ? 'border-primary bg-primary/5 shadow-inner' : 'border-gray-200 dark:border-gray-700'}`}>
                <div className="relative w-full text-center">
                    <input
                    type="radio"
                    name="payment"
                    defaultChecked={index === 0}
                    className="absolute top-0 right-0 h-4 w-4 border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 opacity-0"
                    />
                     {index === 0 && <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center"><Check size={10} className="text-white"/></div>}
                </div>
                {method.icon && <method.icon size={24} className={index === 0 ? 'text-primary' : 'text-gray-400'} />}
                <span className={`text-sm font-bold ${index === 0 ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
                  {method.label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary mb-4">결제 금액</h3>
          <div className="space-y-3 border-b border-dashed border-gray-200 dark:border-gray-700 pb-4 text-sm">
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>총 상품금액</span>
              <span>{totalProductPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>배송비</span>
              <span>{shippingFee.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-secondary font-medium">
              <span>할인금액</span>
              <span>- {totalDiscount.toLocaleString()}원</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">최종 결제 금액</span>
            <span className="text-2xl font-black text-primary">{finalPrice.toLocaleString()}원</span>
          </div>
        </section>

        {/* Consent */}
        <section className="p-2">
          <div className="flex items-center justify-center">
            <div className="relative flex items-center">
                <input 
                    type="checkbox" 
                    id="consent" 
                    defaultChecked
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:bg-primary checked:border-transparent focus:ring-primary dark:border-gray-600 dark:bg-gray-700 transition-all"
                />
                 <Check size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </div>
            <label htmlFor="consent" className="ml-2 cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400 select-none">
              주문 내용을 확인하였으며, 결제에 동의합니다.
            </label>
          </div>
        </section>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-100 dark:border-border-dark bg-white/90 dark:bg-background-dark/90 backdrop-blur-md p-4 shadow-top">
        <button 
          disabled={finalPrice === 0}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary text-base font-bold text-white shadow-lg shadow-primary/20 hover:opacity-95 transition-all active:scale-[0.99] max-w-[480px] mx-auto block disabled:opacity-50 disabled:shadow-none"
        >
          {finalPrice.toLocaleString()}원 결제하기
        </button>
      </div>
    </div>
  );
};
import React, { useMemo } from 'react';
import { ArrowLeft, Home, X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    toggleSelection, 
    selectAll, 
    removeSelected 
  } = useCart();

  // Calculate totals
  const { totalOriginalPrice, totalDiscount, totalProductPrice, shippingFee, finalPrice, selectedCount } = useMemo(() => {
    let originalPrice = 0;
    let productPrice = 0;
    let count = 0;

    cartItems.forEach(item => {
      if (item.selected) {
        originalPrice += (item.originalPrice || item.price) * item.quantity;
        productPrice += item.price * item.quantity;
        count++;
      }
    });

    const discount = originalPrice - productPrice;
    const shipping = productPrice > 0 ? 3000 : 0;
    
    return {
      totalOriginalPrice: originalPrice,
      totalDiscount: discount,
      totalProductPrice: productPrice,
      shippingFee: shipping,
      finalPrice: productPrice + shipping,
      selectedCount: count
    };
  }, [cartItems]);

  const isAllSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  const handleSelectAll = () => {
    selectAll(!isAllSelected);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-80">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white dark:bg-background-dark px-4">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">장바구니</h1>
        <button onClick={() => navigate('/')} className="flex h-10 w-10 items-center justify-center -mr-2 text-text-light-primary dark:text-text-dark-primary">
          <Home size={24} />
        </button>
      </header>

      <main className="flex-1 p-4 space-y-4">
        {cartItems.length > 0 ? (
          <>
            <div className="flex items-center justify-between bg-white dark:bg-white/5 px-4 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center">
                    <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="peer h-5 w-5 rounded-full border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 cursor-pointer appearance-none border checked:bg-primary checked:border-transparent transition-all"
                    id="select-all"
                    />
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity" viewBox="0 0 14 10" fill="none">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                
                <label htmlFor="select-all" className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary cursor-pointer">
                  전체선택 ({selectedCount}/{cartItems.length})
                </label>
              </div>
              <button 
                onClick={removeSelected}
                className="text-xs font-medium text-gray-500 hover:text-red-500 dark:text-gray-400 transition-colors"
              >
                선택삭제
              </button>
            </div>

            <div className="space-y-3">
              {cartItems.map((item, index) => {
                return (
                  <div key={item.id} className="relative bg-white dark:bg-white/5 p-4 rounded-2xl animate-slide-up shadow-sm border border-transparent hover:border-primary/10 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 dark:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                    <div className="flex items-start gap-4">
                      <div className="pt-8">
                        <div className="relative flex items-center">
                            <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleSelection(item.id)}
                            className="peer h-5 w-5 rounded-full border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 cursor-pointer appearance-none border checked:bg-primary checked:border-transparent transition-all"
                            />
                            <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity" viewBox="0 0 14 10" fill="none">
                                <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                      </div>
                      <div className="h-24 w-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                      </div>
                      <div className="flex flex-1 flex-col gap-1 min-w-0 pt-1">
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500">{item.brand}</p>
                        <p className="pr-6 text-sm font-bold text-text-light-primary dark:text-text-dark-primary leading-tight line-clamp-2">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-base font-extrabold text-text-light-primary dark:text-text-dark-primary">
                            {item.price.toLocaleString()}<span className="text-sm font-normal">원</span>
                          </p>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-2 flex h-8 w-28 items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20 overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="flex h-full w-9 items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-full w-9 items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6 text-gray-300">
                <ShoppingBag size={40} />
            </div>
            <p className="mb-6 font-medium">장바구니에 담긴 상품이 없습니다.</p>
            <button 
              onClick={() => navigate('/list')}
              className="px-8 py-3 bg-primary text-white rounded-full text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors"
            >
              상품 보러가기
            </button>
          </div>
        )}
      </main>

      {cartItems.length > 0 && (
        <footer className="fixed bottom-[84px] left-0 right-0 z-10 border-t border-gray-100 dark:border-border-dark bg-white dark:bg-background-dark p-5 shadow-top rounded-t-[2rem]">
          <div className="space-y-3 mb-5 max-w-[480px] mx-auto">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>상품 금액</span>
              <span className="font-medium text-gray-900 dark:text-gray-200">{totalProductPrice.toLocaleString()}원</span>
            </div>
            {totalDiscount > 0 && (
               <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>할인 금액</span>
                <span className="font-medium text-secondary">- {totalDiscount.toLocaleString()}원</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>배송비</span>
              <span className="font-medium text-gray-900 dark:text-gray-200">+ {shippingFee.toLocaleString()}원</span>
            </div>
            <div className="my-2 h-px bg-gray-100 dark:border-gray-700"></div>
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-900 dark:text-white">결제 예정 금액</span>
              <span className="text-2xl font-black text-primary">{finalPrice.toLocaleString()}<span className="text-lg font-bold text-gray-900 dark:text-white ml-1">원</span></span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            disabled={selectedCount === 0}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary text-base font-bold text-white hover:opacity-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed max-w-[480px] mx-auto block"
          >
            {finalPrice.toLocaleString()}원 결제하기
          </button>
        </footer>
      )}
    </div>
  );
};
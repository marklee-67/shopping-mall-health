import React, { useState, useMemo } from 'react';
import { ArrowLeft, Home, X, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

interface CartItemState {
  id: string;
  quantity: number;
  selected: boolean;
}

export const Cart: React.FC = () => {
  const navigate = useNavigate();

  // Initialize cart items with selected state and quantity
  const [items, setItems] = useState<CartItemState[]>(() => {
    // Using mock items (indices 6, 7, 8 from PRODUCTS)
    const initialProducts = [PRODUCTS[6], PRODUCTS[7], PRODUCTS[8]];
    return initialProducts.map(p => ({
      id: p.id,
      quantity: 1,
      selected: true
    }));
  });

  // Toggle individual item selection
  const handleToggleSelect = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  // Toggle select all
  const handleSelectAll = () => {
    const allSelected = items.every(item => item.selected);
    setItems(prev => prev.map(item => ({ ...item, selected: !allSelected })));
  };

  // Update quantity
  const handleQuantityChange = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Remove selected items
  const handleRemoveSelected = () => {
    setItems(prev => prev.filter(item => !item.selected));
  };

  // Calculate totals
  const { totalOriginalPrice, totalDiscount, totalProductPrice, shippingFee, finalPrice, selectedCount } = useMemo(() => {
    let originalPrice = 0;
    let productPrice = 0;
    let count = 0;

    items.forEach(item => {
      if (item.selected) {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (product) {
          originalPrice += (product.originalPrice || product.price) * item.quantity;
          productPrice += product.price * item.quantity;
          count++;
        }
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
  }, [items]);

  const isAllSelected = items.length > 0 && items.every(item => item.selected);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-80">
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
        {items.length > 0 ? (
          <>
            <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark bg-white dark:bg-background-dark px-4 py-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="h-5 w-5 rounded-full border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                  id="select-all"
                />
                <label htmlFor="select-all" className="text-base font-medium text-text-light-primary dark:text-text-dark-primary cursor-pointer">
                  전체선택 ({selectedCount}/{items.length})
                </label>
              </div>
              <button 
                onClick={handleRemoveSelected}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                선택삭제
              </button>
            </div>

            <div className="mt-2 space-y-2">
              {items.map((item, index) => {
                const product = PRODUCTS.find(p => p.id === item.id);
                if (!product) return null;

                return (
                  <div key={item.id} className="relative bg-white dark:bg-white/5 p-4 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500"
                    >
                      <X size={20} />
                    </button>
                    <div className="flex items-start gap-4">
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => handleToggleSelect(item.id)}
                          className="h-5 w-5 rounded-full border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                        />
                      </div>
                      <div className="h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <p className="pr-6 text-sm font-semibold text-text-light-primary dark:text-text-dark-primary leading-tight line-clamp-2">
                          {product.name}
                        </p>
                        <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">{product.brand}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">
                            {product.price.toLocaleString()}원
                          </p>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              {product.originalPrice.toLocaleString()}원
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-2 flex h-8 w-28 items-center justify-between rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-black/20">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="flex h-full w-9 items-center justify-center text-gray-500 hover:text-primary transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="flex h-full w-9 items-center justify-center text-gray-500 hover:text-primary transition-colors"
                          >
                            <Plus size={16} />
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
          <div className="flex flex-col items-center justify-center h-full pt-32 text-gray-400">
            <p className="mb-4">장바구니에 담긴 상품이 없습니다.</p>
            <button 
              onClick={() => navigate('/list')}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold"
            >
              상품 보러가기
            </button>
          </div>
        )}
      </main>

      {items.length > 0 && (
        <footer className="fixed bottom-[84px] left-0 right-0 z-10 border-t border-border-light dark:border-border-dark bg-white dark:bg-background-dark p-4 shadow-top">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-base text-text-light-secondary dark:text-text-dark-secondary">
              <span>상품 금액</span>
              <span>{totalProductPrice.toLocaleString()}원</span>
            </div>
            {totalDiscount > 0 && (
               <div className="flex justify-between text-base text-text-light-secondary dark:text-text-dark-secondary">
                <span>할인 금액</span>
                <span className="text-red-500">- {totalDiscount.toLocaleString()}원</span>
              </div>
            )}
            <div className="flex justify-between text-base text-text-light-secondary dark:text-text-dark-secondary">
              <span>배송비</span>
              <span>+ {shippingFee.toLocaleString()}원</span>
            </div>
            <div className="my-2 h-px bg-border-light dark:border-border-dark"></div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">결제 예정 금액</span>
              <span className="text-xl font-bold text-primary">{finalPrice.toLocaleString()}원</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            disabled={selectedCount === 0}
            className="w-full h-14 rounded-xl bg-primary text-base font-bold text-white hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {finalPrice.toLocaleString()}원 결제하기
          </button>
        </footer>
      )}
    </div>
  );
};
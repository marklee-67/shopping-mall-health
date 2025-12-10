import React from 'react';
import { ArrowLeft, ChevronRight, Package, Truck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

export const OrderHistory: React.FC = () => {
  const navigate = useNavigate();

  // Mock Data
  const orders = [
    {
      id: 'ORD-20240315-01',
      date: '2024.03.15',
      status: '배송중',
      products: [PRODUCTS[0], PRODUCTS[1]], // 루테인, 오메가3
      totalPrice: 81000
    },
    {
      id: 'ORD-20240228-02',
      date: '2024.02.28',
      status: '배송완료',
      products: [PRODUCTS[2]], // 멀티비타민
      totalPrice: 28800
    },
    {
      id: 'ORD-20240110-03',
      date: '2024.01.10',
      status: '배송완료',
      products: [PRODUCTS[9]], // 홍삼정
      totalPrice: 89000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '배송중': return 'text-primary bg-primary/10';
      case '배송완료': return 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-800';
      case '주문취소': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">주문 내역 조회</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 p-4 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 animate-slide-up">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50 dark:border-gray-800">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{order.date} 주문</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>

            <div className="space-y-4">
              {order.products.map((product, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-xs font-bold text-gray-400 mb-0.5">{product.brand}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{product.name}</p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{product.price.toLocaleString()}원</p>
                  </div>
                </div>
              ))}
            </div>

            {order.status === '배송중' && (
               <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 flex gap-2">
                 <button className="flex-1 py-2.5 rounded-xl border border-primary text-primary text-sm font-bold hover:bg-primary/5 transition-colors">
                   배송조회
                 </button>
                 <button className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-sm font-bold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                   문의하기
                 </button>
               </div>
            )}
            
            {order.status === '배송완료' && (
               <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 flex gap-2">
                 <button onClick={() => navigate('/mypage/reviews')} className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity">
                   리뷰작성
                 </button>
                 <button className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                   재구매
                 </button>
               </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};
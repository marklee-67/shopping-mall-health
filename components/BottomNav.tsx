import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, User, ShoppingBag } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-[84px] pb-4 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-border-dark shadow-top">
      <div className="flex h-full justify-around items-center px-2 max-w-[480px] mx-auto">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center w-1/4 gap-1 transition-all duration-300 ${
            isActive('/') ? 'text-primary scale-105' : 'text-gray-300 dark:text-gray-600 hover:text-gray-500'
          }`}
        >
          <div className="relative">
            <Home size={26} strokeWidth={isActive('/') ? 2.5 : 2} fill={isActive('/') ? "currentColor" : "none"} className={isActive('/') ? "opacity-20" : ""} />
            <Home size={26} strokeWidth={isActive('/') ? 2.5 : 2} className={`absolute inset-0 ${isActive('/') ? 'text-primary' : 'opacity-0'}`} />
          </div>
          <span className={`text-[10px] ${isActive('/') ? 'font-bold text-primary' : 'font-medium'}`}>홈</span>
        </button>
        <button
          onClick={() => navigate('/list')}
          className={`flex flex-col items-center justify-center w-1/4 gap-1 transition-all duration-300 ${
            isActive('/list') ? 'text-primary scale-105' : 'text-gray-300 dark:text-gray-600 hover:text-gray-500'
          }`}
        >
          <Grid size={26} strokeWidth={isActive('/list') ? 2.5 : 2} />
          <span className={`text-[10px] ${isActive('/list') ? 'font-bold text-primary' : 'font-medium'}`}>카테고리</span>
        </button>
        <button
          onClick={() => navigate('/cart')}
          className={`flex flex-col items-center justify-center w-1/4 gap-1 transition-all duration-300 ${
            isActive('/cart') ? 'text-primary scale-105' : 'text-gray-300 dark:text-gray-600 hover:text-gray-500'
          }`}
        >
          <ShoppingBag size={26} strokeWidth={isActive('/cart') ? 2.5 : 2} />
          <span className={`text-[10px] ${isActive('/cart') ? 'font-bold text-primary' : 'font-medium'}`}>장바구니</span>
        </button>
        <button
          onClick={() => navigate('/mypage')}
          className={`flex flex-col items-center justify-center w-1/4 gap-1 transition-all duration-300 ${
            isActive('/mypage') ? 'text-primary scale-105' : 'text-gray-300 dark:text-gray-600 hover:text-gray-500'
          }`}
        >
           <User size={26} strokeWidth={isActive('/mypage') ? 2.5 : 2} />
          <span className={`text-[10px] ${isActive('/mypage') ? 'font-bold text-primary' : 'font-medium'}`}>마이페이지</span>
        </button>
      </div>
    </div>
  );
};
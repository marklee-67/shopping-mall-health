import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, Heart, User, ShoppingBag } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-border-light dark:border-border-dark">
      <div className="flex h-full justify-around items-center px-2">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center w-1/4 gap-1 ${
            isActive('/') ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className={`text-[10px] ${isActive('/') ? 'font-bold' : 'font-medium'}`}>홈</span>
        </button>
        <button
          onClick={() => navigate('/list')}
          className={`flex flex-col items-center justify-center w-1/4 gap-1 ${
            isActive('/list') ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          <Grid size={24} strokeWidth={isActive('/list') ? 2.5 : 2} />
          <span className={`text-[10px] ${isActive('/list') ? 'font-bold' : 'font-medium'}`}>카테고리</span>
        </button>
        <button
          onClick={() => navigate('/cart')}
          className={`flex flex-col items-center justify-center w-1/4 gap-1 ${
            isActive('/cart') ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          <ShoppingBag size={24} strokeWidth={isActive('/cart') ? 2.5 : 2} />
          <span className={`text-[10px] ${isActive('/cart') ? 'font-bold' : 'font-medium'}`}>장바구니</span>
        </button>
        <button
          onClick={() => navigate('/mypage')}
          className={`flex flex-col items-center justify-center w-1/4 gap-1 ${
            isActive('/mypage') ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          <User size={24} strokeWidth={isActive('/mypage') ? 2.5 : 2} />
          <span className={`text-[10px] ${isActive('/mypage') ? 'font-bold' : 'font-medium'}`}>마이페이지</span>
        </button>
      </div>
    </div>
  );
};

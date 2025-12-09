import React, { useState } from 'react';
import { ArrowLeft, Search, ShoppingBag, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('recommend');
  const { cartItems } = useCart();

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md transition-all">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">눈 건강</h1>
        <div className="flex items-center gap-1">
          <button className="flex h-10 w-10 items-center justify-center text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
            <Search size={22} />
          </button>
          <button onClick={() => navigate('/cart')} className="relative flex h-10 w-10 items-center justify-center -mr-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
            <ShoppingBag size={22} />
            {totalCartCount > 0 && (
              <div className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-1 ring-white dark:ring-background-dark animate-fade-in">
                {totalCartCount}
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="flex gap-2 p-4 overflow-x-auto whitespace-nowrap scrollbar-hide bg-white dark:bg-background-dark/50">
        <button className="flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-white dark:bg-white/5 px-4 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
          <SlidersHorizontal size={14} />
          <span className="text-xs font-bold">필터</span>
        </button>
        
        {[
            { id: 'recommend', label: '추천순' },
            { id: 'sales', label: '판매량순' },
            { id: 'lowPrice', label: '낮은가격순' },
            { id: 'new', label: '최신순' }
        ].map(filter => (
            <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-xs font-bold transition-all ${
                    activeFilter === filter.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20 border-transparent'
                    : 'bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                }`}
            >
                {filter.label}
            </button>
        ))}
      </div>

      <div className="px-4 py-2 flex justify-between items-center">
        <p className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary">
          총 <span className="font-bold text-primary dark:text-primary-light">{PRODUCTS.length}</span>개의 상품
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-4 animate-slide-up pb-10">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
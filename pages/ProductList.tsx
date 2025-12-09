import React from 'react';
import { ArrowLeft, Search, ShoppingBag, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

export const ProductList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border-light dark:border-border-dark bg-white/90 dark:bg-background-dark/90 px-4 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">눈 건강</h1>
        <div className="flex items-center gap-1">
          <button className="flex h-10 w-10 items-center justify-center text-text-light-primary dark:text-text-dark-primary">
            <Search size={24} />
          </button>
          <button onClick={() => navigate('/cart')} className="flex h-10 w-10 items-center justify-center -mr-2 text-text-light-primary dark:text-text-dark-primary">
            <ShoppingBag size={24} />
          </button>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="flex gap-2 p-4 overflow-x-auto whitespace-nowrap scrollbar-hide bg-white dark:bg-background-dark border-b border-border-light dark:border-border-dark">
        <button className="flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-lg bg-white dark:bg-white/5 px-3 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700">
          <SlidersHorizontal size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">효능/성분</span>
        </button>
        <button className="flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-lg bg-primary/10 dark:bg-primary/20 px-3 ring-1 ring-inset ring-primary/20">
          <span className="text-sm font-medium text-primary">추천순</span>
          <ChevronDown size={16} className="text-primary" />
        </button>
        <button className="flex h-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-white/5 px-3 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">판매량순</span>
        </button>
        <button className="flex h-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-white/5 px-3 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">낮은 가격순</span>
        </button>
      </div>

      <div className="px-4 py-3">
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          총 <span className="font-bold text-text-light-primary dark:text-text-dark-primary">{PRODUCTS.length}</span>개의 상품
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-4 animate-slide-up">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

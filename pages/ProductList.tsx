import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS, CATEGORY_LABELS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { category?: string; searchQuery?: string } | null;
  
  const initialCategory = state?.category || 'ALL';
  const initialSearchQuery = state?.searchQuery || '';

  const [activeFilter, setActiveFilter] = useState('recommend');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [isSearchOpen, setIsSearchOpen] = useState(!!initialSearchQuery);
  
  const { cartItems } = useCart();

  useEffect(() => {
    if (initialSearchQuery) {
        setSearchQuery(initialSearchQuery);
        setIsSearchOpen(true);
    }
  }, [initialSearchQuery]);

  const categoryLabel = CATEGORY_LABELS[initialCategory] || '전체 상품';
  const displayTitle = searchQuery ? `'${searchQuery}' 검색 결과` : categoryLabel;

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const sortedProducts = useMemo(() => {
    let items = [...PRODUCTS];

    // Filter by category
    if (initialCategory !== 'ALL') {
      items = items.filter(p => p.category === initialCategory);
    }

    // Filter by search query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        items = items.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.brand.toLowerCase().includes(query)
        );
    }

    // Sort
    switch (activeFilter) {
      case 'lowPrice':
        return items.sort((a, b) => a.price - b.price);
      case 'sales':
        return items.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'new':
        return items.sort((a, b) => Number(b.id) - Number(a.id));
      case 'recommend':
      default:
        return items;
    }
  }, [activeFilter, initialCategory, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Force re-render/filter with current local searchQuery state
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md transition-all">
        {isSearchOpen ? (
             <form onSubmit={handleSearchSubmit} className="flex w-full items-center gap-2 animate-fade-in">
                <button 
                    type="button" 
                    onClick={() => {
                        if (initialSearchQuery) {
                            navigate(-1);
                        } else {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                        }
                    }}
                    className="flex h-10 w-10 items-center justify-center -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                    <ArrowLeft size={22} />
                </button>
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder="검색어를 입력하세요"
                        autoFocus
                        className="w-full h-10 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-full px-4 text-sm outline-none focus:border-primary transition-all"
                    />
                    {searchQuery && (
                        <button 
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
                <button 
                    type="submit" 
                    className="flex h-10 w-10 items-center justify-center -mr-2 text-primary hover:bg-primary/5 rounded-full transition-colors"
                >
                    <Search size={22} />
                </button>
             </form>
        ) : (
            <>
                <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                <ArrowLeft size={22} />
                </button>
                <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">{displayTitle}</h1>
                <div className="flex items-center gap-1">
                <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="flex h-10 w-10 items-center justify-center text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                >
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
            </>
        )}
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
          총 <span className="font-bold text-primary dark:text-primary-light">{sortedProducts.length}</span>개의 상품
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-4 animate-slide-up pb-10">
        {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))
        ) : (
            <div className="col-span-2 py-20 flex flex-col items-center justify-center text-gray-400">
                <Search size={40} className="mb-4 opacity-20" />
                <p>검색 결과가 없습니다.</p>
            </div>
        )}
      </div>
    </div>
  );
};
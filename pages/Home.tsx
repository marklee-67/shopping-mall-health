import React, { useState } from 'react';
import { Search, ShoppingCart, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { CATEGORY_LABELS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { products } = useProducts();
  const { isAuthenticated } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/list', { state: { searchQuery: searchQuery } });
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      alert('회원가입이 필요한 서비스입니다.\n회원가입 페이지로 이동합니다.');
      navigate('/signup', { state: { from: '/cart' } });
      return;
    }
    navigate('/cart');
  };

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md border-b border-gray-100 dark:border-border-dark transition-all">
        {isSearchOpen ? (
          <form onSubmit={handleSearch} className="flex w-full items-center gap-2 animate-fade-in">
             <button 
                type="button" 
                onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
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
                <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-glow">
                    <span className="text-white font-bold text-sm">P</span>
                </div>
                <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">Peroxfarma Mall</h1>
                </div>
                <div className="flex items-center gap-3">
                <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                    <Search size={22} strokeWidth={2.5} />
                </button>
                <button onClick={handleCartClick} className="relative flex h-10 w-10 items-center justify-center rounded-full text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <ShoppingCart size={22} strokeWidth={2.5} />
                    {totalCartCount > 0 && (
                    <div className="absolute top-1.5 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-background-dark animate-fade-in">
                        {totalCartCount}
                    </div>
                    )}
                </button>
                </div>
            </>
        )}
      </div>

      <main className="flex-1">
        {/* Hero Banner - Dark Tech Style */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative overflow-hidden rounded-3xl min-h-[240px] shadow-2xl shadow-purple-900/20 group">
            {/* Background Image & Gradient */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=800')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-purple-900/80 to-pink-900/40" />
            
            {/* Content */}
            <div className="absolute inset-0 p-7 flex flex-col justify-end">
              <div className="transform transition-transform duration-500 translate-y-0">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-purple-200 bg-purple-900/50 backdrop-blur-md rounded-full border border-purple-500/30">
                  NEW ARRIVAL
                </span>
                <h2 className="text-white text-3xl font-bold leading-tight mb-2 drop-shadow-md">
                  하루의 시작,<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                    에너지 충전
                  </span>
                </h2>
                <p className="text-purple-100/90 text-sm font-medium mb-6 max-w-[200px] leading-relaxed">
                  활기찬 내일을 위한 프리미엄 비타민 컬렉션을 만나보세요.
                </p>
                <button 
                  onClick={() => navigate('/list')}
                  className="bg-white text-primary font-bold text-sm px-6 py-3 rounded-full hover:bg-purple-50 transition-colors shadow-lg shadow-black/10 flex items-center gap-2 w-fit"
                >
                  지금 구매하기 <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories - Pastel Gradient Strip */}
        <div className="py-8 my-4 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-purple-900/20">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex px-4 gap-6 min-w-max">
              {[
                { id: 'IMMUNITY', icon: '🛡️', label: '면역력' },
                { id: 'VASCULAR', icon: '❤️', label: '혈관' },
                { id: 'JOINT', icon: '🦴', label: '관절' },
                { id: 'EYE', icon: '👁️', label: '눈' },
                { id: 'ALL', icon: '💊', label: '전체' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => navigate('/list', { state: { category: cat.id } })}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-white/10 shadow-soft shadow-purple-200/50 dark:shadow-none flex items-center justify-center text-2xl group-active:scale-95 transition-all duration-300 border-2 border-white dark:border-white/10 group-hover:border-primary/20">
                    <span className="group-hover:scale-110 transition-transform">{cat.icon}</span>
                  </div>
                  <span className="text-xs font-semibold text-text-light-secondary dark:text-text-dark-secondary group-hover:text-primary transition-colors">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Header */}
        <div className="flex justify-between items-end px-5 mb-5">
          <div>
            <span className="text-primary font-bold text-xs tracking-wider uppercase mb-1 block">Best Seller</span>
            <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
              가장 사랑받는 상품
            </h2>
          </div>
          <button onClick={() => navigate('/list')} className="text-gray-400 text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1">
            더보기 <ArrowRight size={14} />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Brand Focus Sections (Daily Health) */}
        <div className="px-4 mt-10 space-y-6">
          
          {/* Daily Health Section */}
          <div className="relative overflow-hidden rounded-3xl h-[280px] shadow-2xl shadow-blue-900/10 group cursor-pointer" onClick={() => navigate('/product/2')}>
             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{backgroundImage: "url('https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800')"}}></div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90"></div>
             
             <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start">
               <div className="bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full mb-3">
                 <span className="text-white font-bold text-xs tracking-wider">DAILY HEALTH</span>
               </div>
               <h3 className="text-white text-3xl font-bold mb-2 leading-tight">건강한 혈행을 위한<br/>하루 한 알의 약속</h3>
               <p className="text-blue-100/80 text-sm mb-4 line-clamp-2">순도 높은 식물성 오메가3로 채우는 활력있는 일상. 데일리 헬스가 함께합니다.</p>
               <div className="flex items-center gap-2 text-white font-bold text-sm bg-white/10 pl-4 pr-2 py-2 rounded-full hover:bg-white/20 transition-colors">
                 자세히 보기 <div className="bg-white text-slate-900 rounded-full p-1"><ArrowRight size={12} /></div>
               </div>
             </div>
          </div>
        </div>

        {/* Health Info Card - Gradient Style */}
        <div className="px-4 mt-8 mb-4">
          <div 
            onClick={() => navigate('/health-tip')}
            className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-3xl cursor-pointer shadow-xl shadow-purple-500/20 group"
          >
             {/* Decorative Circles */}
             <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/20 blur-2xl"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-black/10 blur-xl"></div>
             
             <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <span className="inline-block px-2 py-0.5 rounded-md bg-white/20 text-white text-[10px] font-bold mb-2 backdrop-blur-sm">
                  HEALTH TIP
                </span>
                <h3 className="text-white text-lg font-bold leading-tight mb-1">
                  환절기 면역력<br />지키는 3가지 습관
                </h3>
                <p className="text-white/80 text-xs mt-2 group-hover:text-white transition-colors">지금 확인하기 &rarr;</p>
              </div>
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-purple-600 shadow-lg group-hover:scale-110 transition-transform">
                <ArrowRight size={24} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
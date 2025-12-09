import React from 'react';
import { Search, ShoppingCart, ArrowRight } from 'lucide-react';
import { CATEGORY_LABELS, PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/90 dark:bg-background-dark/90 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-1">
             <span className="text-white font-bold text-xs">HM</span>
          </div>
          <h1 className="text-xl font-bold text-primary dark:text-white">HealMe</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-text-light-primary dark:text-text-dark-primary">
            <Search size={24} />
          </button>
          <button onClick={() => navigate('/cart')} className="relative flex h-10 w-10 items-center justify-center rounded-full text-text-light-primary dark:text-text-dark-primary">
            <ShoppingCart size={24} />
            <div className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </div>
          </button>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="px-4 pt-4">
          <div
            className="relative flex flex-col justify-end overflow-hidden rounded-2xl min-h-[220px] bg-cover bg-center shadow-lg"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url('https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=800')`
            }}
          >
            <div className="p-6 relative z-10">
              <h2 className="text-white text-2xl font-bold leading-tight mb-1">
                하루 한 알,<br/>건강한 습관
              </h2>
              <p className="text-white/90 text-sm font-medium mb-4">
                지금 바로 특별 할인을 만나보세요!
              </p>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <div className="w-2 h-2 rounded-full bg-white/40"></div>
                <div className="w-2 h-2 rounded-full bg-white/40"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="overflow-x-auto scrollbar-hide py-6">
          <div className="flex px-4 gap-6 min-w-max">
            {[
              { id: 'IMMUNITY', icon: '🛡️', label: '면역력' },
              { id: 'VASCULAR', icon: '❤️', label: '혈관 건강' },
              { id: 'JOINT', icon: '🦴', label: '뼈/관절' },
              { id: 'EYE', icon: '👁️', label: '눈 건강' },
              { id: 'ALL', icon: '💊', label: '전체' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate('/list')}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-2xl group-active:scale-95 transition-transform">
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex justify-between items-center px-4 mb-4">
          <h2 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">
            맞춤형 건강 솔루션
          </h2>
          <button onClick={() => navigate('/list')} className="text-primary text-sm font-semibold hover:opacity-80">
            전체보기
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 px-4">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Health Info Card */}
        <div className="px-4 mt-8 mb-4">
          <div className="flex items-center justify-between bg-primary/10 dark:bg-primary/20 p-5 rounded-2xl cursor-pointer hover:bg-primary/15 transition-colors">
            <div className="flex-1">
              <p className="text-primary font-bold text-xs uppercase tracking-wider mb-1">건강 정보</p>
              <h3 className="text-text-light-primary dark:text-text-dark-primary text-base font-bold">
                환절기 면역력,<br />어떻게 지킬까?
              </h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-white/10 text-primary shadow-sm">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

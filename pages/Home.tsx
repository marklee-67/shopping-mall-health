import React from 'react';
import { Search, ShoppingCart, ArrowRight } from 'lucide-react';
import { CATEGORY_LABELS, PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pb-24 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md border-b border-gray-100 dark:border-border-dark transition-all">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-glow">
             <span className="text-white font-bold text-sm">H</span>
          </div>
          <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">HealMe</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <Search size={22} strokeWidth={2.5} />
          </button>
          <button onClick={() => navigate('/cart')} className="relative flex h-10 w-10 items-center justify-center rounded-full text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <ShoppingCart size={22} strokeWidth={2.5} />
            <div className="absolute top-1.5 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-background-dark">
              3
            </div>
          </button>
        </div>
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
                  onClick={() => navigate('/list')}
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
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Brand Focus Sections (Daily Health & Pure Nature) */}
        <div className="px-4 mt-10 space-y-6">
          
          {/* Daily Health Section */}
          <div className="relative overflow-hidden rounded-3xl h-[280px] shadow-2xl shadow-blue-900/10 group cursor-pointer" onClick={() => navigate('/product/2')}>
             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-217358c75ce8?q=80&w=800&auto=format&fit=crop')"}}></div>
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

          {/* Pure Nature Section */}
          <div className="relative overflow-hidden rounded-3xl h-[280px] shadow-2xl shadow-purple-900/10 group cursor-pointer" onClick={() => navigate('/product/4')}>
             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{backgroundImage: "url('https://images.unsplash.com/photo-1567306301408-9b74779a11af?q=80&w=800&auto=format&fit=crop')"}}></div>
             <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-900/20 to-transparent opacity-90"></div>
             
             <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start">
               <div className="bg-purple-600/90 backdrop-blur-md px-3 py-1 rounded-full mb-3">
                 <span className="text-white font-bold text-xs tracking-wider">PURE NATURE</span>
               </div>
               <h3 className="text-white text-3xl font-bold mb-2 leading-tight">자연에서 찾은<br/>선명함의 비밀</h3>
               <p className="text-purple-100/80 text-sm mb-4 line-clamp-2">북유럽 야생 빌베리의 영양을 그대로 담았습니다. 퓨어네이처의 특별함을 경험하세요.</p>
                <div className="flex items-center gap-2 text-white font-bold text-sm bg-white/10 pl-4 pr-2 py-2 rounded-full hover:bg-white/20 transition-colors">
                 상품 보러가기 <div className="bg-white text-purple-900 rounded-full p-1"><ArrowRight size={12} /></div>
               </div>
             </div>
          </div>

        </div>

        {/* Health Info Card - Gradient Style */}
        <div className="px-4 mt-8 mb-4">
          <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-3xl cursor-pointer shadow-xl shadow-purple-500/20 group">
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
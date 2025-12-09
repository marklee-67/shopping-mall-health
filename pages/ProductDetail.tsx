import React from 'react';
import { ArrowLeft, Share2, Heart, ShoppingBag, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';

export const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-white/90 dark:bg-background-dark/90 px-4 backdrop-blur-md">
        <button onClick={() => navigate('/list')} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">상품 상세</h1>
        <div className="flex items-center gap-1">
          <button className="flex h-10 w-10 items-center justify-center text-text-light-primary dark:text-text-dark-primary">
            <Share2 size={22} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center -mr-2 text-text-light-primary dark:text-text-dark-primary">
            <Heart size={22} />
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Image Carousel */}
        <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary shadow-sm"></div>
            <div className="w-2 h-2 rounded-full bg-white/60 shadow-sm backdrop-blur-sm"></div>
            <div className="w-2 h-2 rounded-full bg-white/60 shadow-sm backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <span className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary block mb-1">{product.brand}</span>
          <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary leading-tight mb-3">
            {product.name}
          </h2>
          <div className="flex items-baseline gap-2 mb-2">
             {product.discount && (
                <span className="text-2xl font-bold text-red-500">{product.discount}%</span>
             )}
            <span className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
              {product.price.toLocaleString()}원
            </span>
            {product.originalPrice && (
              <span className="text-base text-gray-400 line-through">
                {product.originalPrice.toLocaleString()}원
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {'★'.repeat(5)}
            </div>
            <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary ml-1">
              {product.rating} ({product.reviewCount} 리뷰)
            </span>
          </div>
        </div>

        <div className="h-2 bg-background-light dark:bg-white/5"></div>

        {/* Tabs */}
        <div className="sticky top-14 z-10 bg-white dark:bg-background-dark border-b border-border-light dark:border-border-dark flex">
          <button className="flex-1 py-3.5 text-sm font-bold text-primary border-b-2 border-primary">
            상세정보
          </button>
          <button className="flex-1 py-3.5 text-sm font-medium text-gray-500 dark:text-gray-400">
            리뷰 ({product.reviewCount})
          </button>
          <button className="flex-1 py-3.5 text-sm font-medium text-gray-500 dark:text-gray-400">
            건강정보
          </button>
        </div>

        {/* Detail Content */}
        <div className="p-5 space-y-8 animate-fade-in">
          {/* Nutrition Table */}
          <section>
            <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-3">영양 성분표</h3>
            <div className="overflow-hidden rounded-xl border border-border-light dark:border-border-dark">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="px-4 py-3 font-semibold">영양소</th>
                    <th className="px-4 py-3 font-semibold text-right">함량</th>
                    <th className="px-4 py-3 font-semibold text-right">기준치</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  <tr className="bg-white dark:bg-transparent">
                    <td className="px-4 py-3 text-text-light-primary dark:text-text-dark-primary">비타민C</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">100mg</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">100%</td>
                  </tr>
                  <tr className="bg-white dark:bg-transparent">
                    <td className="px-4 py-3 text-text-light-primary dark:text-text-dark-primary">비타민D</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">10μg</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">100%</td>
                  </tr>
                  <tr className="bg-white dark:bg-transparent">
                    <td className="px-4 py-3 text-text-light-primary dark:text-text-dark-primary">아연</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">8.5mg</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Intake Info */}
          <section>
            <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-3">섭취 방법</h3>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-background-light dark:bg-white/5">
              <div className="p-2 bg-white dark:bg-white/10 rounded-lg text-primary">
                <Calendar size={24} />
              </div>
              <div>
                <p className="font-bold text-text-light-primary dark:text-text-dark-primary mb-1">1일 1회, 1회 1정</p>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  식후 또는 식간에 충분한 물과 함께 섭취하세요.
                </p>
              </div>
            </div>
          </section>

          {/* Ingredients */}
          <section>
            <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-3">원료 정보</h3>
            <p className="text-base leading-relaxed text-text-light-secondary dark:text-text-dark-secondary bg-white dark:bg-transparent p-1">
              비타민C혼합제제(영국산), 건조효모(비타민D), 산화아연, 산화마그네슘, 해조칼슘(아일랜드산), 결정셀룰로스, 히드록시프로필메틸셀룰로스, 스테아린산마그네슘.
            </p>
            <div className="mt-4 rounded-xl overflow-hidden aspect-video relative">
                <img src="https://images.unsplash.com/photo-1555633514-abcea88cd093?auto=format&fit=crop&q=80&w=800" alt="Ingredients" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-bold text-lg flex items-center gap-2">
                        <CheckCircle size={20} /> 엄격한 품질 관리
                    </span>
                </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-background-dark p-4 border-t border-border-light dark:border-border-dark safe-area-bottom">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button 
            onClick={() => navigate('/cart')}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-background-light dark:bg-white/10 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
          >
            <ShoppingBag size={24} />
          </button>
          <button 
            onClick={() => navigate('/checkout')}
            className="flex-1 h-14 flex items-center justify-center rounded-xl bg-primary text-base font-bold text-white hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, ShoppingBag, Calendar, CheckCircle, ArrowRight, Star, User, ThumbsUp, HelpCircle, ChevronDown } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';

export const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [activeTab, setActiveTab] = useState('detail');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { cartItems, addToCart, toggleCart } = useCart();

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = cartItems.some(item => item.id === product.id);

  const REVIEWS = [
    { id: 1, user: '김**', rating: 5, date: '2024.03.15', content: '배송도 빠르고 포장도 꼼꼼해요. 꾸준히 먹어보겠습니다.', tags: ['배송빠름', '포장꼼꼼'] },
    { id: 2, user: '이**', rating: 4, date: '2024.03.14', content: '알약 크기가 적당해서 목넘김이 편해요. 효과는 더 지켜봐야겠네요.', tags: ['목넘김편함'] },
    { id: 3, user: '박**', rating: 5, date: '2024.03.10', content: '부모님 선물로 드렸는데 좋아하시네요. 재구매 의사 있습니다.', tags: ['선물추천'] },
    { id: 4, user: '최**', rating: 5, date: '2024.03.01', content: '피로가 좀 덜한 것 같아요. 아침에 일어날 때 개운합니다.', tags: ['효과좋음'] },
  ];

  const FAQS = [
    { q: '언제 섭취하는 것이 가장 좋나요?', a: '위장 장애 예방을 위해 식사 중이나 식후 즉시 섭취하는 것을 권장드립니다.' },
    { q: '다른 영양제와 같이 먹어도 되나요?', a: '종합비타민과 병용 섭취 가능하나, 성분이 중복되지 않도록 함량을 확인해주세요.' },
    { q: '임산부나 수유부가 섭취해도 되나요?', a: '전문가와 상담 후 섭취하시는 것을 권장드립니다.' },
    { q: '보관은 어떻게 하나요?', a: '직사광선을 피해 서늘한 곳에 보관하시고, 개봉 후에는 가급적 빨리 섭취해주세요.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md transition-all">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <div className="flex items-center gap-1">
          <button className="flex h-10 w-10 items-center justify-center text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
            <Share2 size={22} />
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

      <main className="flex-1">
        {/* Image Carousel */}
        <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-800">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 bg-black/10 backdrop-blur-md rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-sm"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-sm"></div>
          </div>
        </div>

        {/* Product Info */}
        <div className="px-5 pt-6 pb-8 rounded-b-[2rem] bg-white dark:bg-background-dark shadow-sm z-10 relative">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{product.brand}</span>
            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-md">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount})</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary leading-tight mb-4">
            {product.name}
          </h2>
          <div className="flex items-end gap-2 mb-2">
             {product.discount && (
                <span className="text-3xl font-black text-secondary">{product.discount}%</span>
             )}
            <span className="text-3xl font-black text-text-light-primary dark:text-text-dark-primary">
              {product.price.toLocaleString()}<span className="text-lg font-bold ml-1">원</span>
            </span>
          </div>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.originalPrice.toLocaleString()}원
            </span>
          )}
        </div>

        <div className="h-2 bg-gray-50 dark:bg-white/5"></div>

        {/* Tabs */}
        <div className="sticky top-14 z-10 bg-white dark:bg-background-dark border-b border-gray-100 dark:border-border-dark flex">
          {['detail', 'review', 'info'].map((tab) => (
             <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${
                    activeTab === tab 
                    ? 'text-primary' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
             >
                {tab === 'detail' && '상세정보'}
                {tab === 'review' && `리뷰 (${product.reviewCount})`}
                {tab === 'info' && '건강정보'}
                {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
             </button>
          ))}
        </div>

        {/* Detail Content */}
        {activeTab === 'detail' && (
          <div className="p-5 space-y-10 animate-fade-in pb-10">
            {/* Nutrition Table */}
            <section>
              <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded-full"></div>
                  영양 성분표
              </h3>
              <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="px-4 py-3 font-bold">영양소</th>
                      <th className="px-4 py-3 font-bold text-right">함량</th>
                      <th className="px-4 py-3 font-bold text-right">기준치</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr className="bg-white dark:bg-transparent">
                      <td className="px-4 py-3 font-medium text-text-light-primary dark:text-text-dark-primary">비타민C</td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">100mg</td>
                      <td className="px-4 py-3 text-right font-bold text-primary">100%</td>
                    </tr>
                    <tr className="bg-white dark:bg-transparent">
                      <td className="px-4 py-3 font-medium text-text-light-primary dark:text-text-dark-primary">비타민D</td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">10μg</td>
                      <td className="px-4 py-3 text-right font-bold text-primary">100%</td>
                    </tr>
                    <tr className="bg-white dark:bg-transparent">
                      <td className="px-4 py-3 font-medium text-text-light-primary dark:text-text-dark-primary">아연</td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">8.5mg</td>
                      <td className="px-4 py-3 text-right font-bold text-primary">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Intake Info */}
            <section>
              <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-secondary rounded-full"></div>
                  섭취 방법
              </h3>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-white/5 dark:to-white/5 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="p-3 bg-white dark:bg-white/10 rounded-xl text-primary shadow-sm">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="font-bold text-text-light-primary dark:text-text-dark-primary mb-1 text-base">1일 1회, 1회 1정</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    식후 또는 식간에 충분한 물과 함께 섭취하세요. 꾸준한 섭취가 중요합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Ingredients */}
            <section>
              <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gray-800 dark:bg-gray-200 rounded-full"></div>
                  원료 정보
              </h3>
              <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                  비타민C혼합제제(영국산), 건조효모(비타민D), 산화아연, 산화마그네슘, 해조칼슘(아일랜드산), 결정셀룰로스, 히드록시프로필메틸셀룰로스, 스테아린산마그네슘.
                  </p>
              </div>
            </section>
          </div>
        )}

        {/* Review Content */}
        {activeTab === 'review' && (
          <div className="p-5 animate-fade-in pb-10">
            {/* Rating Summary */}
            <div className="flex items-center gap-6 mb-8 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="text-center shrink-0">
                <div className="text-4xl font-black text-gray-900 dark:text-white mb-1">{product.rating}</div>
                <div className="flex text-yellow-400 justify-center mb-2 gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= Math.round(product.rating) ? "currentColor" : "none"} className={i > Math.round(product.rating) ? "text-gray-300 dark:text-gray-600" : ""} />)}
                </div>
                <div className="text-xs font-bold text-gray-400 dark:text-gray-500">총 {product.reviewCount}건</div>
              </div>
              <div className="flex-1 h-20 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
              <div className="flex-1 flex flex-col justify-center gap-1.5">
                {[5,4,3,2,1].map((score, i) => (
                  <div key={score} className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span className="w-4 font-bold">{score}점</span>
                    <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full" 
                        style={{ width: i === 0 ? '70%' : i === 1 ? '20%' : '5%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-6">
              {REVIEWS.map(review => (
                <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                            <User size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900 dark:text-white">{review.user}</p>
                            <div className="flex items-center gap-1">
                                <div className="flex text-yellow-400">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={10} fill={i <= review.rating ? "currentColor" : "none"} className={i > review.rating ? "text-gray-300 dark:text-gray-600" : ""} />)}
                                </div>
                                <span className="text-[10px] text-gray-400">{review.date}</span>
                            </div>
                        </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    {review.content}
                  </p>
                  <div className="flex gap-2 mb-3">
                    {review.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800 text-[10px] font-bold text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                            {tag}
                        </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <ThumbsUp size={12} />
                    <span>도움이 돼요</span>
                  </button>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                리뷰 더보기
            </button>
          </div>
        )}

        {/* Health Info Content */}
        {activeTab === 'info' && (
          <div className="p-5 animate-fade-in pb-10 space-y-10">
            {/* Health Column */}
            <section>
               <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded-full"></div>
                  이 영양소, 왜 필요할까요?
              </h3>
               <div className="grid gap-4">
                  <div className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/10 dark:to-background-dark p-5 rounded-2xl border border-orange-100 dark:border-orange-900/20 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-3">
                          <CheckCircle size={20} />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">항산화 작용으로 활력 충전</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          유해산소로부터 세포를 보호하여 신체 기능을 건강하게 유지하고 활력을 되찾는 데 도움을 줄 수 있습니다.
                      </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-background-dark p-5 rounded-2xl border border-blue-100 dark:border-blue-900/20 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mb-3">
                          <CheckCircle size={20} />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">정상적인 면역 기능</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          아연은 정상적인 면역 기능과 세포 분열에 필요하며, 환절기 건강 관리에 필수적입니다.
                      </p>
                  </div>
               </div>
            </section>

            {/* FAQ */}
            <section>
               <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-secondary rounded-full"></div>
                  자주 묻는 질문
              </h3>
              <div className="space-y-3">
                  {FAQS.map((faq, index) => (
                      <div key={index} className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                          <button 
                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                            className="w-full flex justify-between items-center p-4 bg-white dark:bg-white/5 text-left hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                          >
                              <div className="flex items-center gap-3">
                                  <span className="text-primary font-black text-lg">Q</span>
                                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{faq.q}</span>
                              </div>
                              <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                          </button>
                          <div className={`bg-gray-50 dark:bg-black/20 transition-all duration-300 overflow-hidden ${openFaqIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="p-4 pt-2 pb-5 flex gap-3">
                                  <div className="text-gray-400 font-black text-lg">A</div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-1">
                                      {faq.a}
                                  </p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl p-4 border-t border-gray-100 dark:border-border-dark safe-area-bottom shadow-top">
        <div className="flex items-center gap-3 max-w-[480px] mx-auto">
          <button 
             onClick={() => toggleCart(product)}
             className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors ${
                isInCart 
                ? 'border-red-200 bg-red-50 text-red-500 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-gray-400 dark:text-gray-500 hover:text-red-500 hover:border-red-200'
             }`}
          >
            <Heart size={24} fill={isInCart ? "currentColor" : "none"} className={isInCart ? "animate-pulse-slow" : ""} />
          </button>
          <button 
            onClick={() => {
                addToCart(product);
                navigate('/cart');
            }}
            className="flex-1 h-14 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary text-base font-bold text-white hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
};
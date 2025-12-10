import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORIES = [
    { id: 'ALL', label: '전체' },
    { id: 'DELIVERY', label: '배송' },
    { id: 'ORDER', label: '주문/결제' },
    { id: 'PRODUCT', label: '상품' },
    { id: 'RETURN', label: '반품/교환' },
  ];

  const FAQS = [
    { category: 'DELIVERY', q: '배송 기간은 얼마나 걸리나요?', a: '평일 오후 2시 이전 주문 건은 당일 출고되며, 보통 1-2일 이내에 수령 가능합니다. (주말/공휴일 제외)' },
    { category: 'ORDER', q: '주문 취소는 어떻게 하나요?', a: '주문 접수 및 입금 확인 단계에서는 [마이페이지 > 주문내역]에서 직접 취소가 가능합니다. 배송 준비 중 단계부터는 고객센터로 문의 부탁드립니다.' },
    { category: 'PRODUCT', q: '유통기한은 어디서 확인하나요?', a: '제품 패키지 측면 또는 하단에 별도 표기되어 있습니다. 상세페이지에서도 확인 가능합니다.' },
    { category: 'RETURN', q: '반품/교환 접수는 어떻게 하나요?', a: '제품 수령 후 7일 이내에 [마이페이지 > 주문내역]에서 신청 가능합니다. 단순 변심의 경우 왕복 배송비가 발생할 수 있습니다.' },
    { category: 'DELIVERY', q: '배송지를 변경하고 싶어요.', a: '상품이 출고되기 전이라면 [마이페이지 > 주문내역]에서 배송지 변경이 가능합니다.' },
  ];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = activeCategory === 'ALL' || faq.category === activeCategory;
    const matchesSearch = faq.q.includes(searchQuery) || faq.a.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-10">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">자주 묻는 질문</h1>
        <div className="w-10"></div>
      </header>

      <div className="bg-white dark:bg-background-dark p-4 pb-2 sticky top-14 z-10">
        <div className="relative mb-4">
            <input 
                type="text" 
                placeholder="궁금한 내용을 검색해보세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-primary transition-colors"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {CATEGORIES.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                        activeCategory === cat.id 
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
                        : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
      </div>

      <main className="p-4 space-y-3">
        {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-slide-up">
                <button 
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full text-left p-5 flex justify-between items-start hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-start gap-3">
                        <span className="text-primary font-black text-lg mt-0.5">Q</span>
                        <div>
                            <span className="inline-block text-[10px] text-gray-400 mb-1 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded">
                                {CATEGORIES.find(c => c.id === faq.category)?.label}
                            </span>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-relaxed">{faq.q}</h3>
                        </div>
                    </div>
                    <ChevronDown size={18} className={`text-gray-400 shrink-0 transition-transform duration-300 mt-1 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === index && (
                    <div className="bg-gray-50 dark:bg-black/20 p-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                            {faq.a}
                        </p>
                    </div>
                )}
            </div>
            ))
        ) : (
            <div className="py-20 text-center text-gray-400 text-sm">
                검색 결과가 없습니다.
            </div>
        )}
      </main>
    </div>
  );
};
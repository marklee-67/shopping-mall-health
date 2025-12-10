import React, { useState } from 'react';
import { ArrowLeft, Star, Edit, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

export const MyReviews: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'writable' | 'written'>('writable');

  // Mock Data for Writable Reviews (Products purchased recently)
  const writableReviews = [
    {
      id: 'ORD-ITEM-01',
      date: '2024.03.15',
      product: PRODUCTS[0], // 루테인
      deadline: 'D-3'
    },
    {
      id: 'ORD-ITEM-02',
      date: '2024.03.15',
      product: PRODUCTS[1], // 오메가3
      deadline: 'D-3'
    }
  ];

  // Mock Data for Written Reviews
  const writtenReviews = [
    {
      id: 1,
      date: '2024.02.20',
      product: PRODUCTS[2], // 멀티비타민
      rating: 5,
      content: '남편 사줬는데 피곤함이 덜하다고 하네요. 알약 크기도 적당해서 먹기 편하다고 합니다.',
      images: ['https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=200']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">상품 리뷰</h1>
        <div className="w-10"></div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark sticky top-14 z-10">
         <button 
           onClick={() => setActiveTab('writable')}
           className={`flex-1 py-3 text-sm font-bold relative transition-colors ${activeTab === 'writable' ? 'text-primary' : 'text-gray-400'}`}
         >
           작성 가능한 리뷰 <span className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full ml-1 text-gray-600 dark:text-gray-300">{writableReviews.length}</span>
           {activeTab === 'writable' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
         </button>
         <button 
           onClick={() => setActiveTab('written')}
           className={`flex-1 py-3 text-sm font-bold relative transition-colors ${activeTab === 'written' ? 'text-primary' : 'text-gray-400'}`}
         >
           작성한 리뷰 <span className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full ml-1 text-gray-600 dark:text-gray-300">{writtenReviews.length}</span>
           {activeTab === 'written' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
         </button>
      </div>

      <main className="flex-1 p-4 space-y-4">
        {activeTab === 'writable' ? (
           <div className="animate-fade-in space-y-4">
             {writableReviews.map((item) => (
               <div key={item.id} className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex gap-4 items-center">
                 <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-primary">{item.deadline} 남음</span>
                      <span className="text-xs text-gray-400">{item.date} 구매</span>
                    </div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1 mb-2">{item.product.name}</p>
                    <button className="flex items-center gap-1.5 text-xs font-bold bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
                      <Edit size={12} /> 리뷰 쓰기
                    </button>
                 </div>
               </div>
             ))}
           </div>
        ) : (
           <div className="animate-fade-in space-y-4">
              {writtenReviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                   <div className="flex gap-3 mb-3 pb-3 border-b border-gray-50 dark:border-gray-800">
                     <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                        <img src={review.product.image} alt={review.product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                     </div>
                     <div>
                        <p className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">{review.product.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex text-yellow-400">
                                {[1,2,3,4,5].map(i => <Star key={i} size={10} fill={i <= review.rating ? "currentColor" : "none"} className={i > review.rating ? "text-gray-300 dark:text-gray-600" : ""} />)}
                            </div>
                            <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                     </div>
                   </div>
                   
                   <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                     {review.content}
                   </p>

                   {review.images && (
                     <div className="flex gap-2">
                       {review.images.map((img, i) => (
                         <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                           <img src={img} alt="Review" className="w-full h-full object-cover" />
                         </div>
                       ))}
                     </div>
                   )}
                   
                   <div className="mt-3 flex justify-end">
                      <button className="text-xs font-medium text-gray-400 hover:text-gray-600 underline">수정하기</button>
                   </div>
                </div>
              ))}
           </div>
        )}
      </main>
    </div>
  );
};
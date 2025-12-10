import React, { useState } from 'react';
import { ArrowLeft, Plus, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Inquiry: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'list' | 'write'>('list');

  // Mock Data
  const inquiries = [
    {
      id: 1,
      date: '2024.03.14',
      type: '배송문의',
      title: '배송이 언제 시작되나요?',
      status: '답변완료',
      answer: '안녕하세요 고객님. 주문하신 상품은 금일 오후 출고 예정입니다. 내일 중으로 수령 가능하실 것으로 예상됩니다. 감사합니다.'
    },
    {
      id: 2,
      date: '2024.02.20',
      type: '상품문의',
      title: '유통기한 문의드립니다.',
      status: '답변대기',
      answer: null
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-10">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">1:1 문의</h1>
        <div className="w-10"></div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark sticky top-14 z-10">
         <button 
           onClick={() => setActiveTab('list')}
           className={`flex-1 py-3 text-sm font-bold relative transition-colors ${activeTab === 'list' ? 'text-primary' : 'text-gray-400'}`}
         >
           문의 내역
           {activeTab === 'list' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
         </button>
         <button 
           onClick={() => setActiveTab('write')}
           className={`flex-1 py-3 text-sm font-bold relative transition-colors ${activeTab === 'write' ? 'text-primary' : 'text-gray-400'}`}
         >
           문의하기
           {activeTab === 'write' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
         </button>
      </div>

      <main className="p-4 flex-1">
        {activeTab === 'list' ? (
          <div className="space-y-4 animate-fade-in">
             {inquiries.length > 0 ? (
                 inquiries.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                                    {item.type}
                                </span>
                                <span className="text-[10px] text-gray-400">{item.date}</span>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === '답변완료' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                                {item.status}
                            </span>
                        </div>
                        
                        <div>
                            <p className="font-bold text-sm text-gray-900 dark:text-white mb-2">{item.title}</p>
                        </div>

                        {item.answer && (
                            <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl flex gap-3">
                                <MessageSquare size={16} className="text-primary shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">답변</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                 ))
             ) : (
                <div className="py-20 text-center text-gray-400 text-sm">
                    작성된 문의 내역이 없습니다.
                </div>
             )}
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
             <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-900 dark:text-white ml-1">문의 유형</label>
                  <select className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 p-3 text-sm focus:border-primary outline-none">
                    <option>선택해주세요</option>
                    <option>주문/결제</option>
                    <option>배송문의</option>
                    <option>상품문의</option>
                    <option>반품/교환</option>
                    <option>기타</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-900 dark:text-white ml-1">제목</label>
                  <input type="text" placeholder="제목을 입력해주세요" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 p-3 text-sm focus:border-primary outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-900 dark:text-white ml-1">내용</label>
                  <textarea 
                    placeholder="문의하실 내용을 자세히 적어주세요." 
                    className="w-full h-40 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 p-3 text-sm focus:border-primary outline-none resize-none"
                  ></textarea>
                </div>
             </div>

             <button 
                onClick={() => {
                   alert('문의가 등록되었습니다.');
                   setActiveTab('list');
                }}
                className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
             >
                문의 등록하기
             </button>
          </div>
        )}
      </main>
    </div>
  );
};
import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HealthConsultation: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'write'

  // Mock Consultation Data
  const consultations = [
    {
      id: 1,
      date: '2024.03.10',
      category: '영양제 조합',
      title: '오메가3와 유산균 같이 먹어도 되나요?',
      status: '답변완료',
      answer: '안녕하세요 고객님, 약사 김건강입니다.\n\n오메가3와 유산균은 함께 드셔도 무방합니다. 다만, 오메가3는 지용성이므로 식사 직후에, 유산균은 위산의 영향을 덜 받기 위해 공복이나 식전에 드시는 것을 추천드립니다.\n\n더 궁금하신 점이 있다면 언제든 문의해주세요.',
    },
    {
      id: 2,
      date: '2024.02.25',
      category: '섭취 방법',
      title: '비타민C 공복 섭취 문의',
      status: '답변완료',
      answer: '안녕하세요 고객님.\n\n비타민C는 산성을 띠고 있어 위장이 약하신 분들은 공복 섭취 시 속쓰림을 유발할 수 있습니다. 가급적 식사 후 섭취를 권장드립니다.',
    },
    {
      id: 3,
      date: '2024.03.18',
      category: '부작용 문의',
      title: '철분제 섭취 후 변비가 생긴 것 같아요',
      status: '답변대기',
      answer: null,
    }
  ];

  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">건강 상담 신청</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 p-4">
        {activeTab === 'list' ? (
          <div className="space-y-4 animate-fade-in">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">나의 상담 내역 <span className="text-primary">{consultations.length}</span></h2>
                <button 
                  onClick={() => setActiveTab('write')}
                  className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  <Plus size={14} /> 상담 신청하기
                </button>
             </div>

             <div className="space-y-3">
               {consultations.map((item) => (
                 <div key={item.id} className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                   <button 
                     onClick={() => toggleAccordion(item.id)}
                     className="w-full text-left p-5 focus:outline-none"
                   >
                     <div className="flex justify-between items-start mb-2">
                       <div className="flex gap-2 items-center">
                         <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                           {item.category}
                         </span>
                         <span className="text-[10px] text-gray-400">{item.date}</span>
                       </div>
                       <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === '답변완료' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                         {item.status}
                       </span>
                     </div>
                     <div className="flex justify-between items-center">
                       <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{item.title}</h3>
                       <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openId === item.id ? 'rotate-180' : ''}`} />
                     </div>
                   </button>
                   
                   {openId === item.id && (
                     <div className="bg-gray-50 dark:bg-black/20 p-5 border-t border-gray-100 dark:border-gray-800 animate-slide-up">
                        {item.answer ? (
                          <div className="flex gap-3">
                             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-md">
                               <MessageCircle size={16} />
                             </div>
                             <div>
                               <p className="font-bold text-sm text-gray-900 dark:text-white mb-1">약사 답변</p>
                               <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                 {item.answer}
                               </p>
                             </div>
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-400 text-sm">
                            약사님이 답변을 작성 중입니다. <br/>조금만 기다려주세요.
                          </div>
                        )}
                     </div>
                   )}
                 </div>
               ))}
             </div>
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
             <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-900 dark:text-white ml-1">상담 카테고리</label>
                  <select className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 p-3 text-sm focus:border-primary outline-none">
                    <option>카테고리를 선택해주세요</option>
                    <option>영양제 조합</option>
                    <option>섭취 방법</option>
                    <option>부작용 문의</option>
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
                    placeholder="궁금한 내용을 자세히 적어주세요. 복용 중인 약물이 있다면 함께 적어주시면 더 정확한 상담이 가능합니다." 
                    className="w-full h-40 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 p-3 text-sm focus:border-primary outline-none resize-none"
                  ></textarea>
                </div>
             </div>

             <div className="flex gap-3">
               <button 
                 onClick={() => setActiveTab('list')}
                 className="flex-1 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 transition-colors"
               >
                 취소
               </button>
               <button 
                 onClick={() => {
                   alert('상담 신청이 완료되었습니다.');
                   setActiveTab('list');
                 }}
                 className="flex-1 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
               >
                 상담 신청하기
               </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};
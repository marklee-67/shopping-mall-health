import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Notice: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const notices = [
    {
      id: 1,
      title: '[공지] 설 연휴 배송 안내',
      date: '2024.02.01',
      content: '안녕하세요, 힐미입니다.\n\n설 연휴로 인해 2월 8일(목) 오후 2시 이후 주문 건부터는 2월 13일(화)부터 순차적으로 배송될 예정입니다.\n\n이용에 착오 없으시길 바랍니다. 새해 복 많이 받으세요!'
    },
    {
      id: 2,
      title: '[이벤트] 신규 회원 가입 웰컴 쿠폰 증정',
      date: '2024.01.15',
      content: '신규 회원님들을 위해 전 상품 10% 할인 쿠폰을 드립니다.\n마이페이지 > 쿠폰함에서 확인 가능합니다.'
    },
    {
      id: 3,
      title: '[점검] 시스템 정기 점검 안내',
      date: '2024.01.10',
      content: '더 안정적인 서비스를 위해 서버 점검이 진행될 예정입니다.\n\n일시: 2024.01.12(금) 02:00 ~ 04:00 (2시간)\n\n점검 시간 동안 서비스 이용이 제한될 수 있습니다.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-10">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">공지사항</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-3">
        {notices.map((notice, index) => (
           <div key={notice.id} className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-slide-up">
              <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Megaphone size={12} />
                        </div>
                        <span className="text-xs text-gray-400">{notice.date}</span>
                    </div>
                    <ChevronDown size={18} className={`text-gray-400 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-snug">{notice.title}</h3>
              </button>
              
              {openIndex === index && (
                  <div className="bg-gray-50 dark:bg-black/20 p-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                          {notice.content}
                      </p>
                  </div>
              )}
           </div>
        ))}
      </main>
    </div>
  );
};
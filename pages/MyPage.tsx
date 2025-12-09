import React from 'react';
import { Settings, ChevronRight, Receipt, Repeat, HeartPulse, MessageSquare, HelpCircle, PhoneCall, Megaphone, Bell, Info, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-background-light/90 dark:bg-background-dark/90 px-4 backdrop-blur-md">
        <div className="w-10"></div>
        <h1 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">마이페이지</h1>
        <button className="flex h-10 w-10 items-center justify-center text-text-light-primary dark:text-text-dark-primary">
          <Settings size={24} />
        </button>
      </header>

      <main className="flex-1 px-4">
        {/* Profile Card */}
        <div className="flex flex-col items-center py-6">
          <div className="flex w-full items-center gap-4 mb-6">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white dark:border-gray-700 shadow-md">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="h-full w-full object-cover" alt="Profile" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-1">김건강 님</h2>
              <p className="text-sm font-medium text-primary">건강 정보 맞춤 추천</p>
            </div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white dark:bg-white/5 py-3 text-sm font-bold text-text-light-primary dark:text-text-dark-primary border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            <Edit3 size={16} />
            건강 정보 수정
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: '포인트', value: '1,250 P' },
            { label: '쿠폰', value: '5' },
            { label: '찜한 상품', value: '12' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center rounded-2xl bg-white dark:bg-white/5 p-4 shadow-sm border border-transparent dark:border-white/5">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="h-px bg-border-light dark:bg-border-dark mb-6"></div>

        {/* Menu Sections */}
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-3">나의 건강 관리</h3>
            <div className="rounded-2xl bg-white dark:bg-white/5 overflow-hidden shadow-sm">
              {[
                { icon: Receipt, label: '주문 내역 조회' },
                { icon: Repeat, label: '정기구독 관리' },
                { icon: HeartPulse, label: '건강 상담 신청' },
                { icon: MessageSquare, label: '상품 리뷰' },
              ].map((item, i) => (
                <button key={i} className="flex w-full items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-border-light dark:border-border-dark last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      <item.icon size={18} />
                    </div>
                    <span className="font-medium text-text-light-primary dark:text-text-dark-primary">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-3">고객센터</h3>
            <div className="rounded-2xl bg-white dark:bg-white/5 overflow-hidden shadow-sm">
              {[
                { icon: HelpCircle, label: '자주 묻는 질문' },
                { icon: PhoneCall, label: '1:1 문의' },
                { icon: Megaphone, label: '공지사항' },
              ].map((item, i) => (
                <button key={i} className="flex w-full items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-border-light dark:border-border-dark last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      <item.icon size={18} />
                    </div>
                    <span className="font-medium text-text-light-primary dark:text-text-dark-primary">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-3">앱 설정</h3>
            <div className="rounded-2xl bg-white dark:bg-white/5 overflow-hidden shadow-sm">
                <button className="flex w-full items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      <Bell size={18} />
                    </div>
                    <span className="font-medium text-text-light-primary dark:text-text-dark-primary">알림 설정</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
                <div className="flex w-full items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      <Info size={18} />
                    </div>
                    <span className="font-medium text-text-light-primary dark:text-text-dark-primary">버전 정보</span>
                  </div>
                  <span className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary">v1.0.0</span>
                </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

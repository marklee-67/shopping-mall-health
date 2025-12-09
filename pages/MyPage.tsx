import React from 'react';
import { Settings, ChevronRight, Receipt, Repeat, HeartPulse, MessageSquare, HelpCircle, PhoneCall, Megaphone, Bell, Info, Edit3, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md border-b border-transparent transition-all">
        <div className="w-10"></div>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">마이페이지</h1>
        <button className="flex h-10 w-10 items-center justify-center text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <Settings size={22} />
        </button>
      </header>

      <main className="flex-1">
        {/* Profile Card */}
        <div className="relative px-4 pt-6 pb-8 bg-gradient-to-b from-white to-gray-50 dark:from-white/5 dark:to-background-dark">
          <div className="flex flex-col items-center">
            <div className="relative">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="h-full w-full object-cover" alt="Profile" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-1.5 rounded-full shadow-md border border-gray-100 dark:border-gray-600 text-primary">
                    <Edit3 size={14} />
                </button>
            </div>
            <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mt-3 mb-1">김건강 님</h2>
            <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">건강 정보 맞춤 추천</p>
          </div>

           {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mt-8">
            {[
                { label: '포인트', value: '1,250 P' },
                { label: '쿠폰', value: '5장' },
                { label: '찜한 상품', value: '12개' },
            ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center rounded-2xl bg-white dark:bg-white/5 p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
            ))}
            </div>
        </div>

        <div className="h-2 bg-gray-50 dark:bg-white/5"></div>

        {/* Menu Sections */}
        <div className="p-4 space-y-6">
          <section>
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-3 px-1">나의 건강 관리</h3>
            <div className="rounded-2xl bg-white dark:bg-white/5 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              {[
                { icon: Receipt, label: '주문 내역 조회' },
                { icon: Repeat, label: '정기구독 관리' },
                { icon: HeartPulse, label: '건강 상담 신청' },
                { icon: MessageSquare, label: '상품 리뷰' },
              ].map((item, i) => (
                <button key={i} className="flex w-full items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 group">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <item.icon size={18} />
                    </div>
                    <span className="font-bold text-sm text-text-light-primary dark:text-text-dark-primary">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-3 px-1">고객센터</h3>
            <div className="rounded-2xl bg-white dark:bg-white/5 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              {[
                { icon: HelpCircle, label: '자주 묻는 질문' },
                { icon: PhoneCall, label: '1:1 문의' },
                { icon: Megaphone, label: '공지사항' },
              ].map((item, i) => (
                <button key={i} className="flex w-full items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 group">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <item.icon size={18} />
                    </div>
                    <span className="font-bold text-sm text-text-light-primary dark:text-text-dark-primary">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-3 px-1">앱 설정</h3>
            <div className="rounded-2xl bg-white dark:bg-white/5 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                <button className="flex w-full items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800 group">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <Bell size={18} />
                    </div>
                    <span className="font-bold text-sm text-text-light-primary dark:text-text-dark-primary">알림 설정</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                </button>
                <div className="flex w-full items-center justify-between p-4 group">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      <Info size={18} />
                    </div>
                    <span className="font-bold text-sm text-text-light-primary dark:text-text-dark-primary">버전 정보</span>
                  </div>
                  <span className="text-sm font-bold text-primary">v1.0.0</span>
                </div>
            </div>
          </section>

          {/* Admin Login Link */}
          <div className="flex justify-center pb-8 pt-4">
            <button 
              onClick={() => navigate('/admin/login')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
            >
              <Shield size={14} />
              <span>관리자 로그인</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
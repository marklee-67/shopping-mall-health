import React, { useState, useEffect } from 'react';
import { Settings, ChevronRight, Receipt, Repeat, HeartPulse, MessageSquare, HelpCircle, PhoneCall, Megaphone, Bell, Info, Edit3, Shield, LogOut, LogIn, Check, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  
  // Nickname Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  
  // Coupon Modal State
  const [showCouponModal, setShowCouponModal] = useState(false);

  useEffect(() => {
    if (user?.name) {
        setEditName(user.name);
    }
  }, [user]);

  const handleSaveNickname = () => {
    if (editName.trim()) {
        updateUser(editName);
        setIsEditing(false);
    } else {
        alert('닉네임을 입력해주세요.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user?.name) setEditName(user.name);
  };

  const HEALTH_MENU = [
    { icon: Receipt, label: '주문 내역 조회', path: '/mypage/orders' },
    { icon: Repeat, label: '정기구독 관리', path: '/mypage/subscriptions' },
    { icon: HeartPulse, label: '건강 상담 신청', path: '/mypage/consultations' },
    { icon: MessageSquare, label: '상품 리뷰', path: '/mypage/reviews' },
  ];

  const CUSTOMER_MENU = [
    { icon: HelpCircle, label: '자주 묻는 질문', path: '/mypage/faq' },
    { icon: PhoneCall, label: '1:1 문의', path: '/mypage/inquiry' },
    { icon: Megaphone, label: '공지사항', path: '/mypage/notice' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md border-b border-transparent transition-all">
        <div className="w-10"></div>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">마이페이지</h1>
        <button 
          onClick={() => navigate('/mypage/settings/notifications')}
          className="flex h-10 w-10 items-center justify-center text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <Settings size={22} />
        </button>
      </header>

      <main className="flex-1">
        {/* Profile Card */}
        <div className="relative px-4 pt-6 pb-8 bg-gradient-to-b from-white to-gray-50 dark:from-white/5 dark:to-background-dark">
          {isAuthenticated ? (
             <div className="flex flex-col items-center animate-fade-in">
                <div className="relative">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-lg bg-gray-200">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="h-full w-full object-cover" alt="Profile" />
                    </div>
                </div>
                
                {isEditing ? (
                    <div className="flex items-center gap-2 mt-3 mb-1">
                        <input 
                            type="text" 
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-32 text-center text-lg font-bold text-text-light-primary dark:text-text-dark-primary border-b-2 border-primary bg-transparent outline-none pb-1"
                            autoFocus
                        />
                        <button 
                            onClick={handleSaveNickname}
                            className="p-1 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                        >
                            <Check size={16} />
                        </button>
                        <button 
                            onClick={handleCancelEdit}
                            className="p-1 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mt-3 mb-1">
                        <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">{user?.name} 님</h2>
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-primary transition-colors"
                        >
                            <Edit3 size={16} />
                        </button>
                    </div>
                )}

                <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mt-1">건강 정보 맞춤 추천</p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mt-8 w-full">
                {[
                    { label: '포인트', value: '1,250 P' },
                    { label: '쿠폰', value: '5장' },
                    { label: '찜한 상품', value: '12개' },
                ].map((stat, i) => (
                    <button 
                        key={i} 
                        onClick={() => {
                            if (stat.label === '쿠폰') setShowCouponModal(true);
                        }}
                        className="flex flex-col items-center justify-center rounded-2xl bg-white dark:bg-white/5 p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                    >
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-1">{stat.label}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </button>
                ))}
                </div>
             </div>
          ) : (
             <div className="flex flex-col items-center py-6 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 mb-4">
                    <User size={40} />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">
                    로그인하고 맞춤 건강 정보를 확인하세요!
                </p>
                <div className="flex gap-3 w-full max-w-xs">
                    <button 
                        onClick={() => navigate('/login')}
                        className="flex-1 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
                    >
                        로그인
                    </button>
                    <button 
                        onClick={() => navigate('/signup')}
                        className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark"
                    >
                        회원가입
                    </button>
                </div>
             </div>
          )}
        </div>

        <div className="h-2 bg-gray-50 dark:bg-white/5"></div>

        {/* Menu Sections */}
        <div className="p-4 space-y-6">
          <section>
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-3 px-1">나의 건강 관리</h3>
            <div className="rounded-2xl bg-white dark:bg-white/5 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              {HEALTH_MENU.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    if(!isAuthenticated) {
                        if(window.confirm('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?')) {
                            navigate('/login');
                        }
                    } else {
                        navigate(item.path);
                    }
                  }}
                  className="flex w-full items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 group"
                >
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
              {CUSTOMER_MENU.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => navigate(item.path)}
                  className="flex w-full items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 group"
                >
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
                <button 
                  onClick={() => navigate('/mypage/settings/notifications')}
                  className="flex w-full items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800 group"
                >
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
          
          {isAuthenticated ? (
            <div className="flex justify-center pb-8 pt-4">
                <button 
                onClick={logout}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                <LogOut size={14} />
                <span>로그아웃</span>
                </button>
            </div>
          ) : (
            <div className="flex justify-center pb-8 pt-4">
                <button 
                onClick={() => navigate('/admin/login')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                <Shield size={14} />
                <span>관리자 로그인</span>
                </button>
            </div>
          )}
        </div>
      </main>

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-sm max-h-[80vh] overflow-y-auto shadow-2xl relative flex flex-col">
                 <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">나의 쿠폰함</h2>
                    <button onClick={() => setShowCouponModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-5 space-y-3 overflow-y-auto">
                    {[
                        { title: "신규 회원 가입 웰컴 쿠폰", discount: "10%", description: "전 상품 사용 가능", expiry: "D-30", bg: "bg-primary/10", text: "text-primary" },
                        { title: "3월 봄맞이 건강 쿠폰", discount: "3,000원", description: "5만원 이상 구매 시", expiry: "D-15", bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-500" },
                        { title: "생일 축하 쿠폰", discount: "5,000원", description: "3만원 이상 구매 시", expiry: "2024.12.31", bg: "bg-pink-50 dark:bg-pink-900/20", text: "text-pink-500" },
                        { title: "재구매 감사 쿠폰", discount: "5%", description: "최대 1만원 할인", expiry: "D-7", bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-500" },
                        { title: "무료 배송 쿠폰", discount: "배송비", description: "배송비 무료 (제주/도서산간 제외)", expiry: "D-3", bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-500" },
                    ].map((coupon, idx) => (
                        <div key={idx} className="relative flex bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
                            <div className={`w-24 flex flex-col items-center justify-center ${coupon.bg} p-2 border-r border-dashed border-gray-200 dark:border-gray-700`}>
                                <span className={`text-lg font-black ${coupon.text}`}>{coupon.discount}</span>
                                <span className={`text-[10px] font-bold ${coupon.text} mt-1`}>할인</span>
                            </div>
                            <div className="flex-1 p-4 flex flex-col justify-center">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{coupon.title}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{coupon.description}</p>
                                <span className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded self-start">{coupon.expiry} 남음</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 mt-auto">
                    <button 
                        onClick={() => setShowCouponModal(false)}
                        className="w-full h-12 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
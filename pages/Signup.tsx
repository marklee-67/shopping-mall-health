import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Lock, Mail, CheckCircle, Smartphone, MapPin, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    nickname: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: ''
  });
  
  const from = location.state?.from?.pathname || '/';

  const showAlert = (message: string) => {
    setAlertModal({ isOpen: true, message });
  };

  const closeAlert = () => {
    setAlertModal({ isOpen: false, message: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.phone || !formData.nickname || !formData.address || !formData.password) {
      showAlert('모든 필드를 입력해주세요.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
        showAlert('비밀번호가 일치하지 않습니다.\n비밀번호를 다시 확인해주세요.');
        return;
    }

    // Pass all details to AuthContext
    signup(formData.email, formData.nickname, formData.phone, formData.address);
    // Navigate back to where they came from (e.g., product detail)
    navigate(from, { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
      <header className="flex h-14 items-center px-4">
        <button onClick={() => navigate(-1)} className="text-text-light-primary dark:text-text-dark-primary">
          <ArrowLeft size={24} />
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 pb-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">회원가입</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">힐미와 함께 건강한 일상을 시작해보세요!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. 이메일 (아이디) */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">이메일 (아이디)</label>
            <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="email" 
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>
          </div>

          {/* 2. 휴대번호 */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">휴대번호</label>
            <div className="relative">
                <Smartphone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="tel" 
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>
          </div>

          {/* 3. 닉네임 */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">닉네임</label>
            <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="닉네임을 입력하세요"
                    value={formData.nickname}
                    onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                    className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>
          </div>

          {/* 4. 배송지주소 */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">배송지주소</label>
            <div className="relative">
                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="주소를 입력하세요"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>
          </div>

          {/* 5. 비밀번호 */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">비밀번호</label>
            <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="password" 
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>
          </div>

          {/* 6. 비밀번호 확인 */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">비밀번호 확인</label>
            <div className="relative">
                <CheckCircle size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="password" 
                    placeholder="비밀번호를 한번 더 입력하세요"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className={`w-full h-12 rounded-xl border bg-gray-50 dark:bg-gray-800 pl-11 pr-4 text-sm focus:ring-1 outline-none transition-all ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-500'
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary'
                    }`}
                />
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 font-bold ml-1 mt-1 animate-fade-in">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          <div className="pt-4">
             <button 
                type="submit"
                className="w-full h-14 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98]"
             >
                가입하기
             </button>
          </div>

          <div className="flex justify-center gap-2 text-sm">
            <span className="text-gray-500">이미 계정이 있으신가요?</span>
            <button 
                type="button"
                onClick={() => navigate('/login', { state: { from } })} 
                className="font-bold text-primary hover:underline"
            >
                로그인
            </button>
          </div>
        </form>
      </main>

      {/* Custom Alert Modal */}
      {alertModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-xs p-6 shadow-2xl relative text-center">
                <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">알림</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-line leading-relaxed">
                    {alertModal.message}
                </p>
                <button 
                    onClick={closeAlert}
                    className="w-full h-12 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                    확인
                </button>
            </div>
        </div>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Lock, Mail, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, resetPassword } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // Forgot Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    // Mock login
    login(formData.email);
    navigate(from, { replace: true });
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!forgotEmail) {
          alert('이메일을 입력해주세요.');
          return;
      }
      setIsResetting(true);
      
      const success = await resetPassword(forgotEmail);
      
      setIsResetting(false);
      if (success) {
          alert(`'${forgotEmail}'로 임시 비밀번호가 발송되었습니다.\n이메일을 확인해주세요.`);
          setShowForgotModal(false);
          setForgotEmail('');
      } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark relative">
      <header className="flex h-14 items-center px-4">
        <button onClick={() => navigate(-1)} className="text-text-light-primary dark:text-text-dark-primary">
          <ArrowLeft size={24} />
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 pb-20">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-glow mx-auto mb-4">
             <span className="text-white font-bold text-xl">P</span>
          </div>
          <h1 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">로그인</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">반가워요! 다시 만나서 기뻐요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">이메일</label>
            <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="email" 
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>
          </div>

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
            <div className="flex justify-end mt-2">
                <button 
                    type="button" 
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs text-gray-500 hover:text-primary transition-colors"
                >
                    비밀번호를 잊으셨나요?
                </button>
            </div>
          </div>

          <div className="pt-2">
             <button 
                type="submit"
                className="w-full h-14 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98]"
             >
                로그인
             </button>
          </div>

          <div className="flex justify-center gap-2 text-sm">
            <span className="text-gray-500">계정이 없으신가요?</span>
            <button 
                type="button"
                onClick={() => navigate('/signup', { state: { from } })} 
                className="font-bold text-primary hover:underline"
            >
                회원가입
            </button>
          </div>
        </form>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-sm p-6 shadow-2xl relative">
                <button 
                    onClick={() => setShowForgotModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <X size={24} />
                </button>
                
                <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">비밀번호 찾기</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    가입하신 이메일 주소를 입력하시면<br/>임시 비밀번호를 발송해드립니다.
                </p>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="relative">
                        <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="email" 
                            required
                            placeholder="example@email.com"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isResetting}
                        className="w-full h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50"
                    >
                        {isResetting ? '발송 중...' : '임시 비밀번호 발송'}
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};
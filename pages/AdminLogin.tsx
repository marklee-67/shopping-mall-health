import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, User } from 'lucide-react';
import { ADMIN_CREDENTIALS } from '../constants';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === ADMIN_CREDENTIALS.id && password === ADMIN_CREDENTIALS.password) {
      navigate('/admin/dashboard');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="flex h-14 items-center px-4">
        <button onClick={() => navigate('/mypage')} className="text-text-light-primary dark:text-text-dark-primary">
          <ArrowLeft size={24} />
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 pb-20">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/30">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">관리자 로그인</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">
            관리자 계정으로 접속해주세요.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary ml-1">아이디</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={20} />
              </div>
              <input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setError('');
                }}
                className="w-full rounded-xl border border-border-light dark:border-gray-700 bg-white dark:bg-white/5 py-3.5 pl-11 pr-4 text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white transition-all"
                placeholder="아이디를 입력하세요"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary ml-1">비밀번호</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full rounded-xl border border-border-light dark:border-gray-700 bg-white dark:bg-white/5 py-3.5 pl-11 pr-4 text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white transition-all"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 text-sm font-medium text-center animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-4 text-base font-bold text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 mt-4 active:scale-[0.98]"
          >
            로그인
          </button>
        </form>
      </main>
    </div>
  );
};
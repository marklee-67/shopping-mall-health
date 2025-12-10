import React from 'react';
import { ArrowLeft, Droplets, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HealthTip: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark pb-10">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">건강 꿀팁</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-6">
        <div className="rounded-3xl overflow-hidden shadow-lg mb-6 relative">
           <div className="absolute inset-0 bg-gradient-to-r from-purple-500/90 to-pink-500/90 mix-blend-multiply z-10" />
           <img 
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800" 
            alt="Healthy Lifestyle" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
            <span className="inline-block px-2 py-1 rounded-md bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-sm w-fit border border-white/20">
              HEALTH TIP
            </span>
            <h2 className="text-3xl font-bold leading-tight text-white mb-1">
              환절기 면역력<br />지키는 3가지 습관
            </h2>
            <p className="text-white/80 text-sm">일교차가 큰 환절기, 건강을 지키는 노하우</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-500 dark:text-blue-200 flex items-center justify-center">
              <Droplets size={24} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">1. 충분한 수분 섭취</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                건조한 환절기에는 호흡기 점막이 마르지 않도록 물을 자주 마시는 것이 중요합니다. 하루 1.5~2L의 미지근한 물을 수시로 섭취해주세요.
                </p>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/10 p-5 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-800 text-orange-500 dark:text-orange-200 flex items-center justify-center">
              <Sun size={24} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">2. 비타민D와 햇볕 쬐기</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                면역 세포의 생성을 돕는 비타민D 합성을 위해 하루 20분 정도 햇볕을 쬐는 것이 좋습니다. 부족하다면 영양제로 보충하는 것도 좋은 방법입니다.
                </p>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-500 dark:text-indigo-200 flex items-center justify-center">
              <Moon size={24} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">3. 7시간 이상 숙면</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                수면 중에 분비되는 멜라토닌은 면역력을 강화하는 역할을 합니다. 규칙적인 수면 패턴을 유지하고 하루 7시간 이상 충분히 주무세요.
                </p>
            </div>
          </div>
        </div>

        <div className="pt-4">
            <button 
            onClick={() => navigate('/list', { state: { category: 'IMMUNITY' } })}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/20 hover:opacity-95 transition-opacity active:scale-[0.99]"
            >
            면역력 강화 추천 상품 보러가기
            </button>
        </div>
      </main>
    </div>
  );
};
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotificationSettings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    marketing: true,
    order: true,
    restock: false,
    night: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button 
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
    >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 px-4 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center -ml-2 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">알림 설정</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-6">
        <section className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">주문/배송 알림</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">주문 및 배송 상태 변화에 대한 알림을 받습니다.</p>
                </div>
                <Switch checked={settings.order} onChange={() => toggleSetting('order')} />
            </div>
            
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">마케팅 정보 수신 동의</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">이벤트, 할인 혜택 등 다양한 소식을 받습니다.</p>
                </div>
                <Switch checked={settings.marketing} onChange={() => toggleSetting('marketing')} />
            </div>

            <div className="p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">재입고 알림</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">품절된 상품이 재입고되었을 때 알림을 받습니다.</p>
                </div>
                <Switch checked={settings.restock} onChange={() => toggleSetting('restock')} />
            </div>
        </section>

        <section className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-4 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">야간 혜택 알림 제한</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">오후 9시 ~ 오전 8시 사이에는 혜택 알림을 받지 않습니다.</p>
                </div>
                <Switch checked={settings.night} onChange={() => toggleSetting('night')} />
            </div>
        </section>

        <p className="px-2 text-xs text-gray-400 text-center">
            기기 설정에서 알림 권한이 허용되어 있어야 알림을 받을 수 있습니다.
        </p>
      </main>
    </div>
  );
};
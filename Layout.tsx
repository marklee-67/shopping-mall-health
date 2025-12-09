import React from 'react';
import { useLocation } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideBottomNavPaths = ['/product', '/checkout', '/admin'];
  const shouldHideBottomNav = hideBottomNavPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="mx-auto max-w-[480px] min-h-screen bg-background-light dark:bg-background-dark shadow-xl relative overflow-hidden">
      {children}
      {!shouldHideBottomNav && <BottomNav />}
    </div>
  );
};
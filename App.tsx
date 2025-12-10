import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { MyPage } from './pages/MyPage';
import { OrderHistory } from './pages/OrderHistory';
import { SubscriptionManagement } from './pages/SubscriptionManagement';
import { HealthConsultation } from './pages/HealthConsultation';
import { MyReviews } from './pages/MyReviews';
import { FAQ } from './pages/FAQ';
import { Inquiry } from './pages/Inquiry';
import { Notice } from './pages/Notice';
import { NotificationSettings } from './pages/NotificationSettings';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/orders" element={<OrderHistory />} />
          <Route path="/mypage/subscriptions" element={<SubscriptionManagement />} />
          <Route path="/mypage/consultations" element={<HealthConsultation />} />
          <Route path="/mypage/reviews" element={<MyReviews />} />
          <Route path="/mypage/faq" element={<FAQ />} />
          <Route path="/mypage/inquiry" element={<Inquiry />} />
          <Route path="/mypage/notice" element={<Notice />} />
          <Route path="/mypage/settings/notifications" element={<NotificationSettings />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
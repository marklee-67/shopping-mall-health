import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  LogOut, 
  TrendingUp, 
  Users, 
  DollarSign,
  Plus,
  Trash2,
  Search,
  MoreVertical,
  X,
  Image as ImageIcon,
  Edit
} from 'lucide-react';
import { CATEGORY_LABELS } from '../constants';
import { Product } from '../types';
import { useProducts } from '../context/ProductContext';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  // Add/Edit Product State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    brand: '',
    name: '',
    price: '',
    originalPrice: '',
    category: 'IMMUNITY',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400'
  });

  // Mock Orders Data
  const orders = [
    { id: 'ORD-240315-01', user: '김민준', items: '오메가3 외 2건', total: 41000, status: 'pending', date: '10분 전' },
    { id: 'ORD-240315-02', user: '이영희', items: '루테인 플러스', total: 39000, status: 'paid', date: '1시간 전' },
    { id: 'ORD-240314-05', user: '박지성', items: '멀티비타민 포 맨', total: 28800, status: 'shipped', date: '어제' },
    { id: 'ORD-240314-04', user: '최동욱', items: '홍삼정 스틱', total: 89000, status: 'shipped', date: '어제' },
    { id: 'ORD-240313-01', user: '정수민', items: '눈 건강 포뮬라', total: 48000, status: 'delivered', date: '3일 전' },
  ];

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    setShowDeleteConfirm(null);
  };

  const handleAddProductClick = () => {
    setEditingId(null);
    setNewProduct({
        brand: '',
        name: '',
        price: '',
        originalPrice: '',
        category: 'IMMUNITY',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400'
    });
    setIsAddModalOpen(true);
  };

  const handleEditProductClick = (product: Product) => {
    setEditingId(product.id);
    setNewProduct({
        brand: product.brand,
        name: product.name,
        price: String(product.price),
        originalPrice: product.originalPrice ? String(product.originalPrice) : '',
        category: product.category,
        image: product.image
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.brand || !newProduct.name || !newProduct.price) {
        alert('필수 정보를 모두 입력해주세요.');
        return;
    }

    const price = Number(newProduct.price);
    const originalPrice = newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined;
    
    // Calculate discount if originalPrice exists
    let discount: number | undefined = undefined;
    if (originalPrice && originalPrice > price) {
        discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    }

    const productData = {
        brand: newProduct.brand,
        name: newProduct.name,
        price: price,
        originalPrice: originalPrice,
        discount: discount,
        category: newProduct.category,
        image: newProduct.image
    };

    if (editingId) {
        // Edit Mode
        const existingProduct = products.find(p => p.id === editingId);
        if (existingProduct) {
          updateProduct({
              ...existingProduct,
              ...productData
          });
        }
    } else {
        // Add Mode
        const productToAdd: Product = {
            id: Date.now().toString(),
            ...productData,
            rating: 0,
            reviewCount: 0,
        };
        addProduct(productToAdd);
    }
    
    setIsAddModalOpen(false);
    setEditingId(null);
    setNewProduct({
        brand: '',
        name: '',
        price: '',
        originalPrice: '',
        category: 'IMMUNITY',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400'
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <span className="px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-700">입금대기</span>;
      case 'paid': return <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700">결제완료</span>;
      case 'shipped': return <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-700">배송중</span>;
      case 'delivered': return <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700">배송완료</span>;
      default: return <span className="px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-700">기타</span>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background-dark pb-20 relative">
      {/* Admin Header */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-slate-900 px-4 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-sm">A</div>
          <h1 className="text-white font-bold text-lg">관리자 모드</h1>
        </div>
        <button 
          onClick={() => navigate('/mypage')} 
          className="p-2 text-gray-300 hover:text-white transition-colors"
          title="나가기"
        >
          <LogOut size={20} />
        </button>
      </header>

      {/* Tabs */}
      <div className="sticky top-14 z-10 bg-white dark:bg-white/5 border-b border-gray-200 dark:border-gray-800 flex shadow-sm">
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: '대시보드' },
          { id: 'products', icon: Package, label: '상품관리' },
          { id: 'orders', icon: ShoppingBag, label: '주문관리' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 transition-colors relative ${
              activeTab === tab.id 
                ? 'text-primary' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-xs font-bold">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <main className="flex-1 p-4">
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 bg-white dark:bg-white/5 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <DollarSign size={16} />
                  <span className="text-sm font-medium">오늘 매출</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">1,250,000<span className="text-lg font-normal ml-1">원</span></h3>
                <div className="mt-2 flex items-center text-green-500 text-sm font-medium">
                  <TrendingUp size={14} className="mr-1" />
                  <span>전일 대비 +12.5%</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-white/5 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <ShoppingBag size={16} />
                  <span className="text-xs font-medium">신규 주문</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">12건</h3>
              </div>

              <div className="bg-white dark:bg-white/5 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Users size={16} />
                  <span className="text-xs font-medium">방문자 수</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">843명</h3>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3 dark:text-white">최근 알림</h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex gap-3 items-start">
                   <div className="bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0">
                     <ShoppingBag size={16} />
                   </div>
                   <div>
                     <p className="text-sm font-bold dark:text-gray-200">재고 부족 경고</p>
                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">'루테인 플러스' 상품의 재고가 5개 미만입니다.</p>
                     <p className="text-[10px] text-gray-400 mt-2">10분 전</p>
                   </div>
                </div>
                <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex gap-3 items-start">
                   <div className="bg-green-100 text-green-600 p-2 rounded-lg shrink-0">
                     <Users size={16} />
                   </div>
                   <div>
                     <p className="text-sm font-bold dark:text-gray-200">신규 회원 가입</p>
                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">오늘 15명의 신규 회원이 가입했습니다.</p>
                     <p className="text-[10px] text-gray-400 mt-2">1시간 전</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products View */}
        {activeTab === 'products' && (
          <div className="animate-fade-in h-full flex flex-col">
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="상품명 검색" 
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-sm"
                />
              </div>
              <button 
                onClick={handleAddProductClick}
                className="h-10 px-4 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-1 shadow-md shadow-primary/20"
              >
                <Plus size={16} />
                <span className="hidden xs:inline">등록</span>
              </button>
            </div>

            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="bg-white dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex gap-3 relative overflow-hidden">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-xs text-gray-500">{product.brand}</p>
                      <div className="flex gap-1 -mt-1 -mr-1">
                        <button 
                            onClick={() => handleEditProductClick(product)}
                            className="text-gray-400 hover:text-primary p-1"
                        >
                            <Edit size={16} />
                        </button>
                        <button 
                            onClick={() => setShowDeleteConfirm(product.id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                        >
                            <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate pr-6">{product.name}</h4>
                    <div className="mt-1 flex items-center gap-1.5">
                        {product.originalPrice && (
                             <span className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString()}원</span>
                        )}
                        <span className="text-primary font-bold text-sm">{product.price.toLocaleString()}원</span>
                        {product.discount && (
                            <span className="text-xs font-bold text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">{product.discount}%</span>
                        )}
                    </div>
                  </div>
                  
                  {/* Delete Confirmation Overlay */}
                  {showDeleteConfirm === product.id && (
                    <div className="absolute inset-0 bg-white/95 dark:bg-black/90 z-10 flex items-center justify-between px-4 animate-fade-in">
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">삭제하시겠습니까?</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-3 py-1.5 text-xs font-bold text-gray-500 bg-gray-100 rounded-lg"
                        >
                          취소
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-red-500 rounded-lg"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders View */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in">
             <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
              <button className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold whitespace-nowrap">전체</button>
              <button className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-bold whitespace-nowrap">입금대기</button>
              <button className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-bold whitespace-nowrap">결제완료</button>
              <button className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-bold whitespace-nowrap">배송중</button>
            </div>

            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{order.user}</span>
                      <span className="text-xs text-gray-400">{order.date}</span>
                    </div>
                    <button className="text-gray-400"><MoreVertical size={16} /></button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{order.items}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50 dark:border-gray-800">
                    {getStatusBadge(order.status)}
                    <span className="font-bold text-gray-900 dark:text-white">{order.total.toLocaleString()}원</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {editingId ? '상품 수정' : '상품 등록'}
                    </h2>
                    <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSaveProduct} className="p-5 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">브랜드</label>
                        <input 
                            type="text" 
                            required
                            placeholder="예: 헬시 라이프"
                            value={newProduct.brand}
                            onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-sm focus:border-primary outline-none" 
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">상품명</label>
                        <input 
                            type="text" 
                            required
                            placeholder="상품명을 입력하세요"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-sm focus:border-primary outline-none" 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">할인 전 가격 <span className="text-xs font-normal text-gray-400">(선택)</span></label>
                            <input 
                                type="number" 
                                placeholder="0"
                                value={newProduct.originalPrice}
                                onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-sm focus:border-primary outline-none" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">판매 가격</label>
                            <input 
                                type="number" 
                                required
                                placeholder="0"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-sm focus:border-primary outline-none" 
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">카테고리</label>
                        <select 
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-sm focus:border-primary outline-none"
                        >
                            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                                key !== 'ALL' && <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">이미지 URL</label>
                        <div className="relative">
                            <ImageIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                required
                                placeholder="https://..."
                                value={newProduct.image}
                                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 pl-10 text-sm focus:border-primary outline-none" 
                            />
                        </div>
                        {newProduct.image && (
                            <div className="mt-2 w-full h-32 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700">
                                <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors mt-4"
                    >
                        {editingId ? '수정 완료' : '상품 등록하기'}
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};
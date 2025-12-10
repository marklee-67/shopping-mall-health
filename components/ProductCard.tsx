import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'row';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'grid' }) => {
  const navigate = useNavigate();
  const { cartItems, toggleCart } = useCart();

  const isInCart = cartItems.some(item => item.id === product.id);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCart(product);
  };

  if (variant === 'row') {
    return (
      <div onClick={handleClick} className="flex gap-4 cursor-pointer bg-white dark:bg-white/5 rounded-2xl p-3 animate-fade-in shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/10">
        <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <p className="text-xs font-bold text-primary mb-0.5">{product.brand}</p>
          <p className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary truncate">
            {product.name}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
               {product.discount && (
                 <span className="text-base font-extrabold text-secondary">{product.discount}%</span>
               )}
               <span className="text-base font-extrabold text-text-light-primary dark:text-text-dark-primary">
                {product.price.toLocaleString()}원
               </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                {product.rating}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={handleClick} className="flex flex-col gap-3 cursor-pointer animate-fade-in group">
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-soft hover:shadow-glow transition-all duration-300 border border-gray-100 dark:border-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Heart Button - Moved to Left Top */}
        <button 
          onClick={handleHeartClick}
          className={`absolute top-2.5 left-2.5 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm shadow-sm hover:scale-110 transition-all ${
            isInCart 
              ? 'bg-red-50 text-red-500 dark:bg-red-900/30' 
              : 'bg-white/90 text-gray-400 hover:bg-white hover:text-red-500 dark:bg-black/50'
          }`}
        >
          <Heart size={18} fill={isInCart ? "currentColor" : "none"} className={isInCart ? "animate-pulse-slow" : ""} />
        </button>

        {/* Discount Badge - Moved to Right Top */}
        {product.discount && (
            <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-secondary to-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {product.discount}%
            </div>
        )}
      </div>
      <div className="px-1">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-1">{product.brand}</p>
        <p className="text-sm font-bold leading-tight text-text-light-primary dark:text-text-dark-primary truncate mb-1.5 group-hover:text-primary transition-colors">
          {product.name}
        </p>
        <div className="flex items-center gap-2">
          {product.discount && (
            <span className="text-lg font-extrabold text-secondary">{product.discount}%</span>
          )}
          <span className="text-lg font-extrabold leading-normal text-text-light-primary dark:text-text-dark-primary">
            {product.price.toLocaleString()}
            <span className="text-sm font-normal ml-0.5">원</span>
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through decoration-gray-400/50">{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
          </div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {product.rating} <span className="text-gray-300 mx-1">|</span> {product.reviewCount}개 리뷰
          </p>
        </div>
      </div>
    </div>
  );
};
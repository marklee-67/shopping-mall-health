import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'row';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'grid' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  if (variant === 'row') {
    return (
      <div onClick={handleClick} className="flex gap-4 cursor-pointer bg-white dark:bg-background-dark/50 rounded-2xl p-3 animate-fade-in shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-white/5">
        <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-white/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <p className="text-xs font-semibold text-primary mb-0.5">{product.brand}</p>
          <p className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary truncate">
            {product.name}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-extrabold text-text-light-primary dark:text-text-dark-primary">
              {product.price.toLocaleString()}원
            </span>
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
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-soft hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm dark:bg-black/50 shadow-sm hover:bg-white hover:text-red-500 hover:scale-110 transition-all text-gray-400">
          <Heart size={18} />
        </button>
        {product.discount && (
            <div className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                {product.discount}% OFF
            </div>
        )}
      </div>
      <div className="px-1">
        <p className="text-xs font-bold text-text-light-secondary dark:text-text-dark-secondary mb-1">{product.brand}</p>
        <p className="text-sm font-bold leading-tight text-text-light-primary dark:text-text-dark-primary truncate mb-1.5 group-hover:text-primary transition-colors">
          {product.name}
        </p>
        <div className="flex items-center gap-2">
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
            {product.rating} <span className="text-gray-300">|</span> 리뷰 {product.reviewCount}
          </p>
        </div>
      </div>
    </div>
  );
};
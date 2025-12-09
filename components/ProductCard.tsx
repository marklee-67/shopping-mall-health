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
      <div onClick={handleClick} className="flex gap-4 cursor-pointer bg-white dark:bg-background-dark/50 rounded-xl p-2 animate-fade-in">
        <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <p className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</p>
          <p className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary truncate">
            {product.name}
          </p>
          <div className="mt-1">
            <span className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">
              {product.price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={handleClick} className="flex flex-col gap-2 cursor-pointer animate-fade-in group">
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm dark:bg-black/50 hover:bg-white hover:text-red-500 transition-colors">
          <Heart size={18} className="text-gray-800 dark:text-white" />
        </button>
      </div>
      <div>
        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">{product.brand}</p>
        <p className="text-sm font-medium leading-tight text-text-light-primary dark:text-text-dark-primary truncate">
          {product.name}
        </p>
        <div className="mt-1 flex items-center gap-2">
          {product.discount && (
             <span className="text-sm font-bold text-red-500">{product.discount}%</span>
          )}
          <span className="text-base font-bold leading-normal text-text-light-primary dark:text-text-dark-primary">
            {product.price.toLocaleString()}원
          </span>
        </div>
        {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString()}원</span>
        )}
        <div className="flex items-center gap-1 mt-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
            {product.rating} ({product.reviewCount})
          </p>
        </div>
      </div>
    </div>
  );
};

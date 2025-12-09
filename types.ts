export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  category: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

export enum Category {
  ALL = 'ALL',
  IMMUNITY = 'IMMUNITY',
  VASCULAR = 'VASCULAR',
  JOINT = 'JOINT',
  EYE = 'EYE',
}
export interface Product {
  id: string;
  name: string;
  collection: string;
  price: number;
  colors: ColorVariant[];
  sizes: SizeVariant[];
  description: string;
  details: string[];
  images: ProductImage[];
  featured: boolean;
  newArrival: boolean;
}

export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
  images: string[];
  inStock: boolean;
}

export interface SizeVariant {
  id: string;
  label: string;
  inStock: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
  type: 'hero' | 'detail' | 'back' | 'model' | 'flat';
}

export interface CartItem {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
  product: Product;
  color: ColorVariant;
  size: SizeVariant;
}

export interface WishlistItem {
  productId: string;
  colorId: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  campaignImage: string;
  campaignAlt: string;
  products: string[]; // product IDs
  color: string;
}

export interface Model {
  id: string;
  name: string;
  campaignImages: CampaignImage[];
}

export interface CampaignImage {
  src: string;
  alt: string;
  collectionId: string;
  type: 'hero' | 'editorial' | 'detail' | 'product';
  aspectRatio: 'landscape' | 'portrait' | 'square';
}
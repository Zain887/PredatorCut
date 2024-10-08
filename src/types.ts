export interface HeaderImages {
  id: string;
  url: string;
  article: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  products:Product[];
}

export interface Product {
  id: string;
  name: string;
  shortDescription?: string;
  price: number;
  imageUrl: string[];
  productDetails?: ProductDetails;
  quantity: number;
  tag?: string[];
  subcategoryId?: string;
  comments?: ProductComment[];
}

export interface ProductDetails {
  description?: string;
  bladeLength?: string;
  bladeMaterial?: string;
  handleLength?: string;
  handleMaterial?: string;
  totalLength?: string;
}

export interface ProductComment {
  id: string;
  user: string;
  comment: string;
  rating?: number;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  total: number;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

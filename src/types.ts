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
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  shortDescription?: string;
  price: number;
  imageUrl: string[];
  productDetails?: ProductDetails;
  quantity: number; // Assuming this is for inventory tracking
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

// Updated CartItem interface
export interface CartItem {
  userId: string;
  product: Product; // Reference to the Product
  quantity: number; // Quantity of the product in the cart
  total: number; // Total price for this cart item (price * quantity)
}

// Updated Cart interface
export interface Cart {
  items: CartItem[]; // Array of CartItem
  totalQuantity: number; // Total number of items in the cart
  totalPrice: number; // Total price of all items in the cart
}

export interface User {
  id: string;
  email: string;
  password: string; // Ensure you handle this securely!
  isActive: boolean;
  isAdmin: boolean; // Add isAdmin property here
}

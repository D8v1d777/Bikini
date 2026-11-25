import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem, Product, ColorVariant, SizeVariant } from '../types/index.ts';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; color: ColorVariant; size: SizeVariant } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; colorId: string; sizeId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; colorId: string; sizeId: string; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  isOpen: false
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, color, size } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.productId === product.id && item.colorId === color.id && item.sizeId === size.id
      );

      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1
        };
        return { ...state, items: newItems, isOpen: true };
      }

      const newItem: CartItem = {
        productId: product.id,
        colorId: color.id,
        sizeId: size.id,
        quantity: 1,
        product,
        color,
        size
      };
      return { ...state, items: [...state.items, newItem], isOpen: true };
    }

    case 'REMOVE_ITEM': {
      const { productId, colorId, sizeId } = action.payload;
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.productId === productId && item.colorId === colorId && item.sizeId === sizeId)
        )
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, colorId, sizeId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.productId === productId && item.colorId === colorId && item.sizeId === sizeId)
          )
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === productId && item.colorId === colorId && item.sizeId === sizeId
            ? { ...item, quantity }
            : item
        )
      };
    }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'OPEN_CART':
      return { ...state, isOpen: true };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'HYDRATE':
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  addItem: (product: Product, color: ColorVariant, size: SizeVariant) => void;
  removeItem: (productId: string, colorId: string, sizeId: string) => void;
  updateQuantity: (productId: string, colorId: string, sizeId: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const stored = localStorage.getItem('solun-cart');
      return stored ? { ...initialState, items: JSON.parse(stored) } : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem('solun-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, color: ColorVariant, size: SizeVariant) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, color, size } });
  };

  const removeItem = (productId: string, colorId: string, sizeId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, colorId, sizeId } });
  };

  const updateQuantity = (productId: string, colorId: string, sizeId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, colorId, sizeId, quantity } });
  };

  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const subtotal = state.items.reduce(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
    0
  );
  const totalItems = state.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        toggleCart,
        openCart,
        closeCart,
        clearCart,
        subtotal,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
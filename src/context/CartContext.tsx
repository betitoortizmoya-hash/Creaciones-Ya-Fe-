import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, BaseProductType, QuoteCustomerInfo } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  totalAmount: number;
  totalItemsCount: number;
  currentNav: 'inicio' | 'catalogo' | 'personaliza' | 'contacto';
  setCurrentNav: (nav: 'inicio' | 'catalogo' | 'personaliza' | 'contacto') => void;
  selectedBaseForCustomizer: BaseProductType | null;
  startCustomizing: (baseProductId: BaseProductType, defaultText?: string) => void;
  customerInfo: QuoteCustomerInfo;
  updateCustomerInfo: (info: Partial<QuoteCustomerInfo>) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = 'yafe_creaciones_cart_v1';
const LOCAL_STORAGE_INFO_KEY = 'yafe_creaciones_info_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerInfo, setCustomerInfo] = useState<QuoteCustomerInfo>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_INFO_KEY);
      return saved ? JSON.parse(saved) : {
        name: '',
        phone: '',
        email: '',
        eventDate: '',
        deliveryType: 'pickup',
        deliveryAddress: '',
        specialInstructions: '',
      };
    } catch {
      return {
        name: '',
        phone: '',
        email: '',
        eventDate: '',
        deliveryType: 'pickup',
        deliveryAddress: '',
        specialInstructions: '',
      };
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentNav, setCurrentNav] = useState<'inicio' | 'catalogo' | 'personaliza' | 'contacto'>('inicio');
  const [selectedBaseForCustomizer, setSelectedBaseForCustomizer] = useState<BaseProductType | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart items to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_INFO_KEY, JSON.stringify(customerInfo));
    } catch (e) {
      console.warn('Could not save customer info to localStorage', e);
    }
  }, [customerInfo]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setItems((prev) => [newItem, ...prev]);
    setIsDrawerOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const startCustomizing = (baseProductId: BaseProductType) => {
    setSelectedBaseForCustomizer(baseProductId);
    setCurrentNav('personaliza');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCustomerInfo = (info: Partial<QuoteCustomerInfo>) => {
    setCustomerInfo((prev) => ({ ...prev, ...info }));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
        totalAmount,
        totalItemsCount,
        currentNav,
        setCurrentNav,
        selectedBaseForCustomizer,
        startCustomizing,
        customerInfo,
        updateCustomerInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

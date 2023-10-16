import { ReactNode, createContext, useState } from "react";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  defaultPriceId: string;
}

export interface CartItems {
  product: Product;
  amount: number;
}

export interface ShoppingCart {
  items: CartItems[];
}

interface ShoppingContextType {
  shoppingCart: ShoppingCart;
  addProduct: (product: Product, amount: number) => void;
  removeProduct: (productId: string) => void;
}

export const ShoppingContext = createContext({} as ShoppingContextType);

interface ShoppingContextProviderProps {
  children: ReactNode;
}

export function ShoppingContextProvider({ children }: ShoppingContextProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>(() => {
    return {
      items: []
    }
  });

  function addProduct(product: Product, amount: number) {
    const existItemInCart = shoppingCart.items.filter(item => item.product.id === product.id).length;

    setShoppingCart(state => {
      if (existItemInCart) {
        return {
          ...state,
          items: state.items.map(item => {
            if (item.product.id !== product.id) return item;

            return {
              ...item,
              amount: item.amount + amount
            }
          })
        }
      }

      return {
        ...state,
        items: [...state.items, {
          product,
          amount
        }]
      }
    });
  }

  function removeProduct(productId: string) {
    setShoppingCart(state => {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== productId)
      }
    });
  }

  return (
    <ShoppingContext.Provider value={{ shoppingCart, addProduct, removeProduct }}>
      {children}
    </ShoppingContext.Provider>
  );
}
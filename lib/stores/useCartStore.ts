import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'
import React from 'react'

interface CartState {
  items: CartItem[]
  resellerId: string | null
  addItem: (product: Product & { resellerPrice: number }, resellerId: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      resellerId: null,

      addItem: (product, resellerId) => {
        set((state) => {
          // If cart has items from different reseller, clear cart first
          if (state.resellerId && state.resellerId !== resellerId) {
            return {
              items: [{
                id: `${product.id}-${Date.now()}`,
                productId: product.id,
                product,
                quantity: 1,
                resellerId
              }],
              resellerId
            }
          }

          // Check if item already exists
          const existingItem = state.items.find(item => item.productId === product.id)
          
          if (existingItem) {
            return {
              ...state,
              items: state.items.map(item =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            }
          }

          return {
            resellerId,
            items: [...state.items, {
              id: `${product.id}-${Date.now()}`,
              productId: product.id,
              product,
              quantity: 1,
              resellerId
            }]
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId)
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [], resellerId: null })
      },

      getTotal: () => {
        const state = get()
        return state.items.reduce((total, item) => {
          return total + (item.product.resellerPrice * item.quantity)
        }, 0)
      },

      getItemCount: () => {
        const state = get()
        return state.items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)

// Client-side only hook to prevent hydration issues
export const useCartStoreClient = () => {
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  const store = useCartStore()
  
  if (!mounted) {
    return {
      items: [],
      resellerId: null,
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      getTotal: () => 0,
      getItemCount: () => 0
    }
  }
  
  return store
}
import { create } from 'zustand'
import { DashboardStats, Order, ResellerProduct } from '@/types'
import { getOrdersByReseller, getResellerStats } from '@/lib/mock/orders'
import { getResellerProducts } from '@/lib/mock/users'

interface AdminState {
  stats: DashboardStats | null
  recentOrders: Order[]
  products: ResellerProduct[]
  isLoading: boolean
  fetchDashboardData: (resellerId: string) => Promise<void>
  updateProductStatus: (productId: string, isActive: boolean) => void
  updateProductPrice: (productId: string, newPrice: number) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  stats: null,
  recentOrders: [],
  products: [],
  isLoading: false,

  fetchDashboardData: async (resellerId) => {
    set({ isLoading: true })
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const stats = getResellerStats(resellerId)
    const orders = getOrdersByReseller(resellerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
    const products = getResellerProducts(resellerId)
    
    set({
      stats,
      recentOrders: orders,
      products,
      isLoading: false
    })
  },

  updateProductStatus: (productId, isActive) => {
    set((state) => ({
      products: state.products.map(product =>
        product.id === productId
          ? { ...product, isActive }
          : product
      )
    }))
  },

  updateProductPrice: (productId, newPrice) => {
    set((state) => ({
      products: state.products.map(product =>
        product.id === productId
          ? { 
              ...product, 
              sellingPrice: newPrice,
              markup: newPrice - (product.product?.basePrice || 0)
            }
          : product
      )
    }))
  }
}))
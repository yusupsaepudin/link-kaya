import { CustomerInfo } from './user'
import { Product } from './product'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'
export type PaymentMethod = 'bank_transfer' | 'ewallet' | 'cod'

export interface OrderItem {
  id: string
  productId: string
  product?: Product
  quantity: number
  price: number // Reseller's selling price
  basePrice: number // Brand's base price
  commission: number // Commission amount
  total: number
}

export interface Order {
  id: string
  invoiceId: string
  resellerId: string
  resellerName?: string
  customerId?: string
  customerInfo: CustomerInfo
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  totalCommission: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod?: PaymentMethod
  paymentProof?: string
  trackingNumber?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderSummary {
  orderId: string
  total: number
  itemCount: number
  commission: number
}

export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalCommission: number
  pendingOrders: number
  completedOrders: number
  totalProducts: number
  viewsToday: number
  conversionRate: number
}
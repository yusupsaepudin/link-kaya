export interface Brand {
  id: string
  name: string
  slug: string
  description: string
  logo: string
  coverImage?: string
  website?: string
  email: string
  phone?: string
  address?: string
  socialMedia?: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
  categories: string[]
  totalProducts: number
  totalResellers: number
  totalSales: number
  rating: number
  verified: boolean
  commissionRate: number // Default commission for products
  joinedAt: Date
  updatedAt: Date
}

export interface BrandStats {
  totalRevenue: number
  totalOrders: number
  totalResellers: number
  topProducts: Array<{
    productId: string
    productName: string
    sales: number
    revenue: number
  }>
  topResellers: Array<{
    resellerId: string
    resellerName: string
    sales: number
    revenue: number
  }>
  revenueByMonth: Array<{
    month: string
    revenue: number
    orders: number
  }>
}

export interface ResellerPartnership {
  id: string
  brandId: string
  resellerId: string
  status: 'active' | 'pending' | 'suspended'
  customCommission?: number // Override brand default
  totalSales: number
  totalRevenue: number
  joinedAt: Date
}

export interface BrandPayoutRequest {
  id: string
  userId: string
  userType: 'reseller' | 'brand'
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'rejected'
  method: 'bank_transfer' | 'ewallet'
  details: Record<string, string>
  requestedAt: Date
  processedAt?: Date
  notes?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  images: string[]
  basePrice: number
  recommendedPrice: number
  commission: number // Percentage (e.g., 20 means 20%)
  brandId: string
  brandName: string
  categoryId: string
  categoryName: string
  tags: string[]
  stock: number
  sold: number
  isActive: boolean
  specifications?: Record<string, string>
  createdAt: Date
  updatedAt: Date
}

export interface ResellerProduct {
  id: string
  resellerId: string
  productId: string
  product?: Product // Populated product data
  sellingPrice: number
  markup: number // Amount added to base price
  isActive: boolean
  views: number
  clicks: number
  sales: number
  addedAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  options: string[]
  priceAdjustment: number
  stock: number
}

export interface CartItem {
  id: string
  productId: string
  product: Product & { resellerPrice: number }
  quantity: number
  variant?: ProductVariant
  resellerId: string
}
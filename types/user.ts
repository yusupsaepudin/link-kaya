export type UserRole = 'buyer' | 'reseller' | 'brand'

export interface SocialLink {
  id: string
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook' | 'whatsapp' | 'website'
  url: string
  label?: string
}

export interface ResellerInfo {
  tier: 'bronze' | 'silver' | 'gold'
  commission: number
  totalSales: number
  totalEarnings: number
  joinedAt: Date
  payoutMethod?: 'bank' | 'ewallet'
  payoutDetails?: Record<string, string>
}

export interface BrandInfo {
  companyName: string
  description: string
  logo: string
  website?: string
  establishedAt: Date
  totalProducts: number
  totalResellers: number
  verified: boolean
}

export interface UserProfile {
  id: string
  username: string
  displayName: string
  bio: string
  avatar: string
  coverImage?: string
  role: UserRole
  email: string
  phone?: string
  socialLinks: SocialLink[]
  resellerInfo?: ResellerInfo
  brandInfo?: BrandInfo
  createdAt: Date
  updatedAt: Date
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address?: string
  notes?: string
}
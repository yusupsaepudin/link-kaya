export type UserRole = 'buyer' | 'reseller' | 'brand'

export interface SocialLink {
  id: string
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook' | 'whatsapp' | 'website'
  url: string
  label?: string
}

export interface WalletInfo {
  balance: number
  pendingBalance: number
  totalEarnings: number
  totalWithdrawn: number
  lastActivity?: Date
}

export interface CommunityShare {
  id: string
  userId: string
  type: 'qr_voucher' | 'link_share' | 'social_share'
  productId?: string
  referralCode: string
  qrCode?: string
  shareUrl: string
  totalScans: number
  totalConversions: number
  totalEarnings: number
  createdAt: Date
  expiresAt?: Date
  metadata?: {
    platform?: string
    campaign?: string
    communityId?: string
  }
}

export interface PayoutRequest {
  id: string
  userId: string
  amount: number
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed' | 'failed'
  method: 'bank' | 'ewallet'
  accountDetails: Record<string, string>
  adminNotes?: string
  rejectionReason?: string
  requestedAt: Date
  processedAt?: Date
  completedAt?: Date
}

export interface CommissionDistribution {
  orderId: string
  totalAmount: number
  distributions: {
    reseller: { userId: string; amount: number; percentage: number }
    community?: { userId: string; amount: number; percentage: number }
    referrer?: { userId: string; amount: number; percentage: number }
    platform: { amount: number; percentage: number }
  }
  createdAt: Date
}

export interface ResellerInfo {
  tier: 'bronze' | 'silver' | 'gold'
  commission: number
  communityCommission: number
  totalSales: number
  totalEarnings: number
  totalCommunityEarnings: number
  joinedAt: Date
  payoutMethod?: 'bank' | 'ewallet'
  payoutDetails?: Record<string, string>
  referralCode?: string
  communityShares?: CommunityShare[]
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
  walletInfo?: WalletInfo
  referralCode?: string
  referredBy?: string
  communityId?: string
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
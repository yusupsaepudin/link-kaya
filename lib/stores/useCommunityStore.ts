import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CommunityShare } from '@/types/user'

interface CommunityVoucher {
  id: string
  code: string
  name: string
  description: string
  productId?: string
  productName?: string
  communityId: string
  communityName: string
  qrCode: string
  type: 'event' | 'product' | 'discount'
  isActive: boolean
  maxRedemptions?: number
  currentRedemptions: number
  commissionPercentage: number
  validFrom: Date
  validUntil?: Date
  createdBy: string
  createdAt: Date
}

interface ShareTracking {
  shareId: string
  url: string
  platform?: string
  clicks: number
  conversions: number
  earnings: number
  lastClicked?: Date
}

interface CommunityState {
  communityShares: CommunityShare[]
  vouchers: CommunityVoucher[]
  shareTracking: ShareTracking[]
  activeVoucher: CommunityVoucher | null
  
  // Actions
  createCommunityShare: (share: Omit<CommunityShare, 'id' | 'createdAt' | 'totalScans' | 'totalConversions' | 'totalEarnings'>) => CommunityShare
  createVoucher: (voucher: Omit<CommunityVoucher, 'id' | 'qrCode' | 'currentRedemptions' | 'createdAt'>) => CommunityVoucher
  trackShareClick: (shareId: string) => void
  trackShareConversion: (shareId: string, earnings: number) => void
  redeemVoucher: (voucherCode: string) => CommunityVoucher | null
  getShareByCode: (referralCode: string) => CommunityShare | undefined
  getVoucherByCode: (code: string) => CommunityVoucher | undefined
  updateVoucherStatus: (voucherId: string, isActive: boolean) => void
  generateShareUrl: (productId: string, userId: string, platform?: string) => string
  calculateCommunityEarnings: (userId: string) => number
  setActiveVoucher: (voucher: CommunityVoucher | null) => void
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      communityShares: [],
      vouchers: [],
      shareTracking: [],
      activeVoucher: null,

      createCommunityShare: (share) => {
        const newShare: CommunityShare = {
          ...share,
          id: `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          totalScans: 0,
          totalConversions: 0,
          totalEarnings: 0,
          createdAt: new Date()
        }
        
        set(state => ({
          communityShares: [newShare, ...state.communityShares]
        }))
        
        return newShare
      },

      createVoucher: (voucher) => {
        const voucherCode = voucher.code || `VCH${Date.now().toString(36).toUpperCase()}`
        const voucherId = `voucher_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        
        // Generate QR code data
        const qrData = JSON.stringify({
          type: 'community_voucher',
          id: voucherId,
          code: voucherCode,
          communityId: voucher.communityId,
          productId: voucher.productId
        })
        
        const newVoucher: CommunityVoucher = {
          ...voucher,
          id: voucherId,
          code: voucherCode,
          qrCode: qrData,
          currentRedemptions: 0,
          createdAt: new Date()
        }
        
        set(state => ({
          vouchers: [newVoucher, ...state.vouchers]
        }))
        
        return newVoucher
      },

      trackShareClick: (shareId) => {
        set(state => {
          const tracking = state.shareTracking.find(t => t.shareId === shareId)
          if (tracking) {
            return {
              shareTracking: state.shareTracking.map(t =>
                t.shareId === shareId
                  ? { ...t, clicks: t.clicks + 1, lastClicked: new Date() }
                  : t
              )
            }
          } else {
            return {
              shareTracking: [...state.shareTracking, {
                shareId,
                url: '',
                clicks: 1,
                conversions: 0,
                earnings: 0,
                lastClicked: new Date()
              }]
            }
          }
        })
        
        // Update the share itself
        set(state => ({
          communityShares: state.communityShares.map(share =>
            share.id === shareId
              ? { ...share, totalScans: share.totalScans + 1 }
              : share
          )
        }))
      },

      trackShareConversion: (shareId, earnings) => {
        set(state => {
          const tracking = state.shareTracking.find(t => t.shareId === shareId)
          if (tracking) {
            return {
              shareTracking: state.shareTracking.map(t =>
                t.shareId === shareId
                  ? { 
                      ...t, 
                      conversions: t.conversions + 1,
                      earnings: t.earnings + earnings
                    }
                  : t
              )
            }
          }
          return state
        })
        
        // Update the share itself
        set(state => ({
          communityShares: state.communityShares.map(share =>
            share.id === shareId
              ? { 
                  ...share, 
                  totalConversions: share.totalConversions + 1,
                  totalEarnings: share.totalEarnings + earnings
                }
              : share
          )
        }))
      },

      redeemVoucher: (voucherCode) => {
        const voucher = get().vouchers.find(v => 
          v.code === voucherCode && 
          v.isActive &&
          (!v.maxRedemptions || v.currentRedemptions < v.maxRedemptions) &&
          new Date() >= new Date(v.validFrom) &&
          (!v.validUntil || new Date() <= new Date(v.validUntil))
        )
        
        if (voucher) {
          set(state => ({
            vouchers: state.vouchers.map(v =>
              v.id === voucher.id
                ? { ...v, currentRedemptions: v.currentRedemptions + 1 }
                : v
            ),
            activeVoucher: voucher
          }))
          return voucher
        }
        
        return null
      },

      getShareByCode: (referralCode) => {
        return get().communityShares.find(share => share.referralCode === referralCode)
      },

      getVoucherByCode: (code) => {
        return get().vouchers.find(v => v.code === code)
      },

      updateVoucherStatus: (voucherId, isActive) => {
        set(state => ({
          vouchers: state.vouchers.map(v =>
            v.id === voucherId ? { ...v, isActive } : v
          )
        }))
      },

      generateShareUrl: (productId, userId, platform) => {
        const referralCode = `REF${userId.substring(0, 4)}${Date.now().toString(36).toUpperCase()}`
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
        const params = new URLSearchParams({
          ref: referralCode,
          ...(platform && { utm_source: platform })
        })
        return `${baseUrl}/produk/${productId}?${params.toString()}`
      },

      calculateCommunityEarnings: (userId) => {
        return get().communityShares
          .filter(share => share.userId === userId)
          .reduce((total, share) => total + share.totalEarnings, 0)
      },

      setActiveVoucher: (voucher) => {
        set({ activeVoucher: voucher })
      }
    }),
    {
      name: 'community-storage',
      partialize: (state) => ({
        communityShares: state.communityShares.slice(0, 100),
        vouchers: state.vouchers.slice(0, 50),
        shareTracking: state.shareTracking.slice(0, 200)
      })
    }
  )
)
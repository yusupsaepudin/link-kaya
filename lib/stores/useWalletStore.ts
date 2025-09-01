import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PayoutRequest, WalletInfo } from '@/types/user'

interface Transaction {
  id: string
  type: 'credit' | 'debit' | 'payout' | 'commission' | 'community_share' | 'referral'
  amount: number
  description: string
  orderId?: string
  referenceId?: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: Date
}

interface WalletState {
  walletInfo: WalletInfo | null
  transactions: Transaction[]
  payoutRequests: PayoutRequest[]
  pendingPayouts: PayoutRequest[]
  
  // Actions
  setWalletInfo: (info: WalletInfo) => void
  updateBalance: (amount: number, type: 'credit' | 'debit') => void
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void
  createPayoutRequest: (request: Omit<PayoutRequest, 'id' | 'requestedAt' | 'status'>) => PayoutRequest
  updatePayoutStatus: (requestId: string, status: PayoutRequest['status'], notes?: string) => void
  getTransactionHistory: (userId: string) => Transaction[]
  calculateAvailableBalance: () => number
  processCommission: (orderId: string, amounts: {
    reseller: number
    community?: number
    referrer?: number
  }) => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      walletInfo: {
        balance: 0,
        pendingBalance: 0,
        totalEarnings: 0,
        totalWithdrawn: 0,
        lastActivity: new Date()
      },
      transactions: [],
      payoutRequests: [],
      pendingPayouts: [],

      setWalletInfo: (info) => set({ walletInfo: info }),

      updateBalance: (amount, type) => set(state => ({
        walletInfo: state.walletInfo ? {
          ...state.walletInfo,
          balance: type === 'credit' 
            ? state.walletInfo.balance + amount 
            : Math.max(0, state.walletInfo.balance - amount),
          totalEarnings: type === 'credit' 
            ? state.walletInfo.totalEarnings + amount 
            : state.walletInfo.totalEarnings,
          lastActivity: new Date()
        } : null
      })),

      addTransaction: (transaction) => set(state => ({
        transactions: [{
          ...transaction,
          id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date()
        }, ...state.transactions]
      })),

      createPayoutRequest: (request) => {
        const newRequest: PayoutRequest = {
          ...request,
          id: `payout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          status: 'pending',
          requestedAt: new Date()
        }
        
        set(state => ({
          payoutRequests: [newRequest, ...state.payoutRequests],
          pendingPayouts: [newRequest, ...state.pendingPayouts]
        }))
        
        return newRequest
      },

      updatePayoutStatus: (requestId, status, notes) => set(state => ({
        payoutRequests: state.payoutRequests.map(req => 
          req.id === requestId 
            ? {
                ...req,
                status,
                adminNotes: notes,
                processedAt: ['approved', 'rejected'].includes(status) ? new Date() : req.processedAt,
                completedAt: status === 'completed' ? new Date() : req.completedAt
              }
            : req
        ),
        pendingPayouts: status !== 'pending' 
          ? state.pendingPayouts.filter(req => req.id !== requestId)
          : state.pendingPayouts
      })),

      getTransactionHistory: (userId) => {
        return get().transactions.filter(t => t.status === 'completed')
      },

      calculateAvailableBalance: () => {
        const state = get()
        if (!state.walletInfo) return 0
        
        const pendingWithdrawals = state.pendingPayouts
          .filter(p => p.status === 'pending' || p.status === 'processing')
          .reduce((sum, p) => sum + p.amount, 0)
        
        return Math.max(0, state.walletInfo.balance - pendingWithdrawals)
      },

      processCommission: (orderId, amounts) => {
        const state = get()
        
        // Add reseller commission
        if (amounts.reseller > 0) {
          state.addTransaction({
            type: 'commission',
            amount: amounts.reseller,
            description: `Commission from order #${orderId}`,
            orderId,
            status: 'completed'
          })
          state.updateBalance(amounts.reseller, 'credit')
        }
        
        // Add community share commission
        if (amounts.community && amounts.community > 0) {
          state.addTransaction({
            type: 'community_share',
            amount: amounts.community,
            description: `Community share from order #${orderId}`,
            orderId,
            status: 'completed'
          })
          state.updateBalance(amounts.community, 'credit')
        }
        
        // Add referral commission
        if (amounts.referrer && amounts.referrer > 0) {
          state.addTransaction({
            type: 'referral',
            amount: amounts.referrer,
            description: `Referral commission from order #${orderId}`,
            orderId,
            status: 'completed'
          })
          state.updateBalance(amounts.referrer, 'credit')
        }
      }
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        walletInfo: state.walletInfo,
        transactions: state.transactions.slice(0, 100), // Keep only last 100 transactions
        payoutRequests: state.payoutRequests.slice(0, 50) // Keep only last 50 payout requests
      })
    }
  )
)
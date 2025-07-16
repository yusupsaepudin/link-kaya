import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProfile } from '@/types'

interface UserState {
  currentUser: UserProfile | null
  isAuthenticated: boolean
  setUser: (user: UserProfile) => void
  logout: () => void
  getUserRole: () => 'buyer' | 'reseller' | 'brand' | null
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,

      setUser: (user) => {
        set({
          currentUser: user,
          isAuthenticated: true
        })
      },

      logout: () => {
        set({
          currentUser: null,
          isAuthenticated: false
        })
      },

      getUserRole: () => {
        const state = get()
        return state.currentUser?.role || null
      }
    }),
    {
      name: 'user-storage'
    }
  )
)
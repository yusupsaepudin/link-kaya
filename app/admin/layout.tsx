"use client"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { useUserStore } from "@/lib/stores/useUserStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { mockUsers } from "@/lib/mock"

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { currentUser, setUser } = useUserStore()

  useEffect(() => {
    // For demo: auto-login as a reseller if not logged in
    if (!currentUser) {
      const resellerUser = mockUsers.find(u => u.username === 'sarahbeauty')
      if (resellerUser) {
        setUser(resellerUser)
      }
    } else if (currentUser.role !== 'reseller') {
      // Redirect if not a reseller
      router.push('/')
    }
  }, [currentUser, setUser, router])

  if (!currentUser || currentUser.role !== 'reseller') {
    return null // Or loading spinner
  }

  return <AdminLayout>{children}</AdminLayout>
}
"use client"

import { BrandLayout } from "@/components/layouts/brand-layout"
import { useUserStore } from "@/lib/stores/useUserStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { mockUsers } from "@/lib/mock"

export default function BrandRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { currentUser, setUser } = useUserStore()

  useEffect(() => {
    // For demo: auto-login as a brand if not logged in
    if (!currentUser) {
      const brandUser = mockUsers.find(u => u.role === 'brand')
      if (brandUser) {
        setUser(brandUser)
      }
    } else if (currentUser.role !== 'brand') {
      // Redirect if not a brand
      router.push('/')
    }
  }, [currentUser, setUser, router])

  if (!currentUser || currentUser.role !== 'brand') {
    return null // Or loading spinner
  }

  return <BrandLayout>{children}</BrandLayout>
}
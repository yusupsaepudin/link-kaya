"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Search, ArrowLeft, Heart, User } from "lucide-react"
import { useCartStoreClient } from "@/lib/stores/useCartStore"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface SimpleHeaderProps {
  username: string
  onSearch?: (query: string) => void
  showBackButton?: boolean
  hideCartIcon?: boolean
  hideWishlistIcon?: boolean
}

export function SimpleHeader({ 
  username, 
  onSearch, 
  showBackButton = false, 
  hideCartIcon = false, 
  hideWishlistIcon = false 
}: SimpleHeaderProps) {
  const { getItemCount } = useCartStoreClient()
  const itemCount = getItemCount()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container-mobile py-4">
        {/* Top row - Navigation and actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full h-9 w-9 p-0"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-mediakaya-gradient-1 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">{username}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full h-9 w-9 p-0"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            {!hideWishlistIcon && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full h-9 w-9 p-0"
              >
                <Heart className="h-4 w-4" />
              </Button>
            )}
            
            {!hideCartIcon && (
              <Button
                variant="ghost"
                size="sm"
                className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full h-9 w-9 p-0"
                asChild
              >
                <Link href={`/${username}/cart`}>
                  <ShoppingBag className="h-4 w-4" />
                  {itemCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-[10px] font-medium min-w-[20px] rounded-full"
                    >
                      {itemCount > 99 ? '99+' : itemCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Search bar - conditionally shown */}
        {showSearch && (
          <div className="mt-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 text-sm bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-mediakaya-blue/20 focus:border-mediakaya-blue"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, ShoppingBag, Search } from "lucide-react"
import { useCartStore } from "@/lib/stores/useCartStore"
import Link from "next/link"
import { toast } from "sonner"

interface SimpleHeaderProps {
  username: string
}

export function SimpleHeader({ username }: SimpleHeaderProps) {
  const itemCount = useCartStore((state) => state.getItemCount())

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `@${username}`,
          text: `Check out @${username}'s products`,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container-mobile py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">@{username}</h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              asChild
            >
              <Link href={`/${username}/cart`}>
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-green-500 text-white border-2 border-white"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
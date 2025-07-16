"use client"

import { UserProfile } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Share2, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/stores/useCartStore"
import Link from "next/link"
import { toast } from "sonner"

interface BioHeaderProps {
  user: UserProfile
}

export function BioHeader({ user }: BioHeaderProps) {
  const itemCount = useCartStore((state) => state.getItemCount())

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: user.displayName,
          text: `Check out ${user.displayName}'s products`,
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
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container-mobile py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback>
                {user.displayName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-lg">{user.displayName}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Jakarta
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              asChild
            >
              <Link href={`/${user.username}/cart`}>
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
                    variant="destructive"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-3">
          {user.bio}
        </p>
      </div>
    </div>
  )
}
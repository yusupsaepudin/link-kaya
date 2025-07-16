"use client"

import { UserProfile } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share2, MoreVertical } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface ProfileHeaderProps {
  user: UserProfile
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: user.displayName,
          text: user.bio,
          url: window.location.href,
        })
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  return (
    <div className="mb-8">
      {/* Cover Image */}
      {user.coverImage && (
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
          <Image
            src={user.coverImage}
            alt={`${user.displayName} cover`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-background">
          <AvatarImage src={user.avatar} alt={user.displayName} />
          <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            {user.resellerInfo && (
              <Badge variant="secondary" className="capitalize">
                {user.resellerInfo.tier} Reseller
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mb-2">@{user.username}</p>
          <p className="text-sm">{user.bio}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            className="rounded-full"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
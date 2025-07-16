"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Share2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ProfileHeaderProps {
  profile: {
    username: string
    name: string
    bio: string
    avatar: string
  }
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: profile.bio,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="flex justify-end gap-2 mb-8">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <Avatar className="w-24 h-24 mx-auto mb-4">
        <AvatarImage src={profile.avatar} alt={profile.name} />
        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
      <p className="text-muted-foreground max-w-md mx-auto">{profile.bio}</p>
    </motion.div>
  )
}
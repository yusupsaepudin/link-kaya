"use client"

import { UserProfile } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook, 
  Globe, 
  ExternalLink
} from "lucide-react"
import { FaTiktok, FaWhatsapp } from "react-icons/fa"

interface ProfileSectionProps {
  user: UserProfile
}

const iconMap = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  facebook: Facebook,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
  website: Globe,
}

export function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="py-8">
      <div className="flex flex-col items-center text-center max-w-md mx-auto">
        <Avatar className="h-20 w-20 mb-4 bg-green-500">
          <AvatarImage src={user.avatar} alt={user.displayName} />
          <AvatarFallback className="bg-green-500 text-white text-xl font-semibold">
            {user.displayName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-xl font-bold mb-2">@{user.username}</h2>
        
        {user.bio && (
          <p className="text-gray-600 mb-4 max-w-sm">
            {user.bio}
          </p>
        )}
        
        {user.socialLinks.length > 0 && (
          <div className="flex justify-center gap-3 mb-4">
            {user.socialLinks.map((link) => {
              const Icon = iconMap[link.platform] || ExternalLink
              
              return (
                <Button
                  key={link.id}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 border-gray-300 hover:bg-gray-50"
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label || link.platform}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
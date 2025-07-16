"use client"

import { SocialLink } from "@/types"
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

interface SocialLinksProps {
  links: SocialLink[]
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

export function SocialLinks({ links }: SocialLinksProps) {
  if (links.length === 0) return null

  return (
    <div className="py-6 border-t">
      <div className="flex justify-center gap-4">
        {links.map((link) => {
          const Icon = iconMap[link.platform] || ExternalLink
          
          return (
            <Button
              key={link.id}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
              asChild
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label || link.platform}
              >
                <Icon className="h-5 w-5" />
              </a>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
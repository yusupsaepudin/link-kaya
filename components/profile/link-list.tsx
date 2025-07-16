"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Globe, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin,
  Github,
  Facebook,
  Mail,
  ExternalLink
} from "lucide-react"
import { FaTiktok, FaSpotify, FaDiscord, FaTwitch } from "react-icons/fa"

interface Link {
  id: string
  title: string
  url: string
  icon: string
  clicks: number
}

interface LinkListProps {
  links: Link[]
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  globe: Globe,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  facebook: Facebook,
  mail: Mail,
  tiktok: FaTiktok,
  spotify: FaSpotify,
  discord: FaDiscord,
  twitch: FaTwitch,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function LinkList({ links }: LinkListProps) {
  const handleClick = (link: Link) => {
    // In a real app, this would track the click
    window.open(link.url, "_blank", "noopener,noreferrer")
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 mb-12"
    >
      {links.map((link) => {
        const Icon = iconMap[link.icon] || ExternalLink
        
        return (
          <motion.div key={link.id} variants={item}>
            <Button
              variant="outline"
              className="w-full h-16 justify-between group hover:scale-[1.02] transition-all duration-200"
              onClick={() => handleClick(link)}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.title}</span>
              </div>
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
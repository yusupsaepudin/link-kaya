"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Link2, 
  Package, 
  BarChart3, 
  Palette, 
  Settings,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Links", href: "/admin/links", icon: Link2 },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Appearance", href: "/admin/appearance", icon: Palette },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 rounded-lg gradient-bg-1 animate-gradient" />
          <span className="font-bold text-xl">Lynk Admin</span>
        </Link>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/johndoe">
              <Eye className="w-4 h-4 mr-2" />
              View Profile
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
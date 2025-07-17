"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  ShoppingCart, 
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useUserStore } from "@/lib/stores/useUserStore"

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Catalog', href: '/admin/catalog', icon: ShoppingBag },
  { name: 'My Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Payouts', href: '/admin/payouts', icon: DollarSign },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentUser, logout } = useUserStore()

  return (
    <div className="min-h-screen flex">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 w-64 bg-card border-r transform transition-transform z-50",
        "md:translate-x-0", // Always show on desktop
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
            <Link href="/admin/dashboard" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <span className="font-bold text-xl text-foreground">Reseller Hub</span>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold shadow-md">
                {currentUser?.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{currentUser?.displayName}</p>
                <p className="text-xs text-muted-foreground">@{currentUser?.username}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Main Menu
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "hover:bg-muted/60 hover:shadow-sm"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  pathname === item.href ? "scale-110" : "group-hover:scale-105"
                )} />
                <span className="flex-1">{item.name}</span>
                {pathname === item.href && (
                  <div className="h-2 w-2 bg-primary-foreground rounded-full opacity-80" />
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t bg-muted/20">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={() => {
                logout()
                window.location.href = '/'
              }}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
            <p className="text-xs text-muted-foreground mt-2 px-3">
              Version 1.0.0
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden border-b bg-background/95 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600" />
              <span className="font-bold">Reseller</span>
            </Link>
            <div className="w-10" /> {/* Spacer for balance */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
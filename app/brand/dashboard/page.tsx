"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  ArrowUpRight
} from "lucide-react"
import { formatCurrency } from "@/lib/utils/formatters"
import Link from "next/link"
import { getBrandProducts } from "@/lib/mock"
import { useUserStore } from "@/lib/stores/useUserStore"

export default function BrandDashboardPage() {
  const currentUser = useUserStore((state) => state.currentUser)
  const brandProducts = currentUser ? getBrandProducts(currentUser.id) : []

  const stats = {
    totalProducts: brandProducts.length,
    activeProducts: brandProducts.filter(p => p.isActive).length,
    totalResellers: 15,
    totalRevenue: 5250000,
    revenueChange: 12.5,
    resellersChange: 8.3,
    topProducts: brandProducts.slice(0, 5)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/brand/products">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProducts} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resellers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResellers}</div>
            <div className="flex items-center text-xs">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">{stats.resellersChange}%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <div className="flex items-center text-xs">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">{stats.revenueChange}%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Commission</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20%</div>
            <p className="text-xs text-muted-foreground">
              Per sale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(product.basePrice)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">24</p>
                    <p className="text-sm text-muted-foreground">sales</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">INV-001234</p>
                  <p className="text-sm text-muted-foreground">
                    2 items • Sarah Beauty Shop
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(125000)}</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">INV-001233</p>
                  <p className="text-sm text-muted-foreground">
                    1 item • TechDeals Store
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(75000)}</p>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">INV-001232</p>
                  <p className="text-sm text-muted-foreground">
                    3 items • Healthy Living
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(200000)}</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
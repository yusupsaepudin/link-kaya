"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  DollarSign, 
  Package, 
  ShoppingCart,
  TrendingUp,
  Eye,
  ArrowUpRight
} from "lucide-react"
import { useAdminStore } from "@/lib/stores/useAdminStore"
import { useUserStore } from "@/lib/stores/useUserStore"
import { formatCurrency, formatNumber } from "@/lib/utils/formatters"
import { DashboardStatsSkeleton } from "@/components/shared/loading-states"
import Link from "next/link"
import { RecentOrders } from "@/components/features/orders/recent-orders"
import { SalesChart } from "@/components/features/analytics/sales-chart"

export default function AdminDashboardPage() {
  const { currentUser } = useUserStore()
  const { stats, recentOrders, isLoading, fetchDashboardData } = useAdminStore()

  useEffect(() => {
    if (currentUser) {
      fetchDashboardData(currentUser.id)
    }
  }, [currentUser, fetchDashboardData])

  if (isLoading || !stats) {
    return <DashboardStatsSkeleton />
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      description: "All time earnings",
      trend: "+12.5%"
    },
    {
      title: "Total Commission",
      value: formatCurrency(stats.totalCommission),
      icon: TrendingUp,
      description: "Your earnings",
      trend: "+8.2%"
    },
    {
      title: "Total Orders",
      value: formatNumber(stats.totalOrders),
      icon: ShoppingCart,
      description: `${stats.pendingOrders} pending`,
      trend: "+15.3%"
    },
    {
      title: "Views Today",
      value: formatNumber(stats.viewsToday),
      icon: Eye,
      description: `${stats.conversionRate}% conversion`,
      trend: "+5.1%"
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {currentUser?.displayName}! Here&apos;s your store overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.trend} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Your sales performance this month</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">
                View All
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <RecentOrders orders={recentOrders} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/catalog">
                <Package className="h-4 w-4 mr-2" />
                Browse Catalog
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/products">
                <BarChart3 className="h-4 w-4 mr-2" />
                Manage Products
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/orders">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Orders
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/${currentUser?.username}`}>
                <Eye className="h-4 w-4 mr-2" />
                View My Store
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  MessageCircle
} from "lucide-react"
import { formatCurrency } from "@/lib/utils/formatters"
import { format } from "date-fns"
import { getResellerOrders } from "@/lib/mock/orders"
import { useUserStore } from "@/lib/stores/useUserStore"

export default function AdminOrdersPage() {
  const currentUser = useUserStore((state) => state.currentUser)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  // Get reseller's orders
  const orders = currentUser ? getResellerOrders(currentUser.id) : []

  // Filter orders based on tab
  const pendingOrders = orders.filter(o => o.status === "pending")
  const processingOrders = orders.filter(o => o.status === "processing")
  const shippedOrders = orders.filter(o => o.status === "shipped")
  const deliveredOrders = orders.filter(o => o.status === "delivered")

  const stats = {
    totalOrders: orders.length,
    pendingOrders: pendingOrders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    totalCommission: orders.reduce((sum, o) => sum + o.totalCommission, 0)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return Clock
      case "processing":
        return Package
      case "shipped":
        return Truck
      case "delivered":
        return CheckCircle
      default:
        return Package
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "processing":
        return "default"
      case "shipped":
        return "default"
      case "delivered":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingOrders} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalCommission)}</div>
            <p className="text-xs text-muted-foreground">
              Your earnings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalRevenue / (stats.totalOrders || 1))}
            </div>
            <p className="text-xs text-muted-foreground">
              Per order
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by order ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
              <TabsTrigger value="processing">Processing ({processingOrders.length})</TabsTrigger>
              <TabsTrigger value="shipped">Shipped ({shippedOrders.length})</TabsTrigger>
              <TabsTrigger value="delivered">Delivered ({deliveredOrders.length})</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(selectedTab === "all" ? orders : 
              selectedTab === "pending" ? pendingOrders :
              selectedTab === "processing" ? processingOrders :
              selectedTab === "shipped" ? shippedOrders :
              deliveredOrders
            ).map((order) => {
              const StatusIcon = getStatusIcon(order.status)
              return (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      order.status === "delivered" ? "bg-green-100 dark:bg-green-900/20" :
                      order.status === "shipped" ? "bg-blue-100 dark:bg-blue-900/20" :
                      order.status === "processing" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                      "bg-gray-100 dark:bg-gray-900/20"
                    }`}>
                      <StatusIcon className={`h-5 w-5 ${
                        order.status === "delivered" ? "text-green-600" :
                        order.status === "shipped" ? "text-blue-600" :
                        order.status === "processing" ? "text-yellow-600" :
                        "text-gray-600"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{order.invoiceId}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerInfo.name} • {format(order.createdAt, "dd MMM yyyy, HH:mm")}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm font-medium">{formatCurrency(order.total)}</span>
                        <Badge variant="secondary" className="text-xs">
                          Commission: {formatCurrency(order.totalCommission)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
            
            {orders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Share your bio link to start receiving orders
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
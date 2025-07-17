"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  Package,
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils/formatters"
import { getResellerProducts } from "@/lib/mock"
import { useUserStore } from "@/lib/stores/useUserStore"
import { toast } from "sonner"

export default function AdminProductsPage() {
  const currentUser = useUserStore((state) => state.currentUser)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("active")

  // Get reseller's products
  const resellerProducts = currentUser ? getResellerProducts(currentUser.id) : []
  
  // Filter products based on tab
  const activeProducts = resellerProducts.filter(p => p.isActive)
  const inactiveProducts = resellerProducts.filter(p => !p.isActive)

  const handleToggleStatus = (_productId: string) => {
    toast.success("Product status updated")
  }

  const handleRemoveProduct = (_productId: string) => {
    toast.success("Product removed from your store")
  }

  const stats = {
    totalProducts: resellerProducts.length,
    activeProducts: activeProducts.length,
    totalViews: resellerProducts.reduce((sum, p) => sum + (p.views || 0), 0),
    totalSales: resellerProducts.reduce((sum, p) => sum + (p.sales || 0), 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Products</h1>
        <Button asChild>
          <Link href="/admin/catalog">
            <Plus className="mr-2 h-4 w-4" />
            Add Products
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
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
            <p className="text-xs text-muted-foreground">
              Units sold
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Markup</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25%</div>
            <p className="text-xs text-muted-foreground">
              Above base price
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="active">
                Active ({activeProducts.length})
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive ({inactiveProducts.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab}>
            <TabsContent value="active" className="space-y-4">
              {activeProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active products</p>
                  <Button className="mt-4" asChild>
                    <Link href="/admin/catalog">Browse Catalog</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeProducts.map((resellerProduct) => (
                    <div key={resellerProduct.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={resellerProduct.product?.images[0] || ""}
                          alt={resellerProduct.product?.name || ""}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{resellerProduct.product?.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {resellerProduct.product?.brandName}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span>Base: {formatCurrency(resellerProduct.product?.basePrice || 0)}</span>
                          <span className="text-primary font-medium">
                            Selling: {formatCurrency(resellerProduct.sellingPrice)}
                          </span>
                          <Badge variant="secondary">
                            +{Math.round(((resellerProduct.sellingPrice - (resellerProduct.product?.basePrice || 0)) / (resellerProduct.product?.basePrice || 1)) * 100)}%
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-2xl font-bold">{resellerProduct.views || 0}</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-2xl font-bold">{resellerProduct.sales || 0}</p>
                        <p className="text-xs text-muted-foreground">Sales</p>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Pricing
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(resellerProduct.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Make Inactive
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleRemoveProduct(resellerProduct.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="inactive" className="space-y-4">
              {inactiveProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No inactive products</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inactiveProducts.map((resellerProduct) => (
                    <div key={resellerProduct.id} className="flex items-center gap-4 p-4 border rounded-lg opacity-60">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={resellerProduct.product?.images[0] || ""}
                          alt={resellerProduct.product?.name || ""}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{resellerProduct.product?.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {resellerProduct.product?.brandName}
                        </p>
                        <Badge variant="secondary" className="mt-2">Inactive</Badge>
                      </div>
                      
                      <Button 
                        variant="outline"
                        onClick={() => handleToggleStatus(resellerProduct.id)}
                      >
                        Activate
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
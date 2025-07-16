"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Users, 
  TrendingUp,
  Star,
  MessageCircle,
  MoreHorizontal,
  ExternalLink
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/lib/utils/formatters"
import { getAllResellers } from "@/lib/mock"
import Link from "next/link"

export default function BrandResellersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Get all resellers (in real app, would filter by brand partnership)
  const resellers = getAllResellers()

  const stats = {
    totalResellers: resellers.length,
    activeResellers: 12,
    totalSales: 245,
    totalRevenue: 12500000
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reseller Partners</h1>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resellers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResellers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeResellers} active this month
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
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Sales/Reseller</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(stats.totalSales / stats.activeResellers)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per active reseller
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search resellers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Resellers List */}
      <Card>
        <CardHeader>
          <CardTitle>All Resellers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resellers.map((reseller) => (
              <div key={reseller.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={reseller.avatar} alt={reseller.displayName} />
                    <AvatarFallback>
                      {reseller.displayName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{reseller.displayName}</p>
                      <Badge variant="outline" className="text-xs">
                        @{reseller.username}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Joined {reseller.resellerInfo?.joinedAt ? 
                        new Date(reseller.resellerInfo.joinedAt).toLocaleDateString() : 
                        'Recently'}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-sm">
                      <span>
                        <span className="font-medium">15</span> products
                      </span>
                      <span>
                        <span className="font-medium">32</span> sales
                      </span>
                      <span>
                        <span className="font-medium">{formatCurrency(450000)}</span> revenue
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/${reseller.username}`} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Store
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        View Performance
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        View Products
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
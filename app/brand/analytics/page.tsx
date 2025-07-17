"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  Users,
  Package,
  DollarSign,
  Target,
  Award
} from "lucide-react"
import { formatCurrency } from "@/lib/utils/formatters"

export default function BrandAnalyticsPage() {
  const analyticsData = [
    {
      title: "Total Revenue",
      value: formatCurrency(12450000),
      change: "+18.2%",
      icon: DollarSign,
      description: "Revenue from all resellers"
    },
    {
      title: "Active Resellers",
      value: "47",
      change: "+12.5%", 
      icon: Users,
      description: "Partners selling your products"
    },
    {
      title: "Products Sold",
      value: "1,847",
      change: "+23.1%",
      icon: Package,
      description: "Units sold this month"
    },
    {
      title: "Avg. Commission",
      value: "22%",
      change: "+2.1%",
      icon: Target,
      description: "Average commission rate"
    }
  ]

  const topResellers = [
    { name: "Sarah Beauty Shop", orders: 156, revenue: 3240000, commission: 648000 },
    { name: "TechDeals Store", orders: 142, revenue: 2890000, commission: 578000 },
    { name: "Healthy Living", orders: 128, revenue: 2650000, commission: 530000 },
    { name: "Fashion Forward", orders: 98, revenue: 2100000, commission: 420000 },
    { name: "Beauty Haven", orders: 87, revenue: 1850000, commission: 370000 }
  ]

  const topProducts = [
    { name: "Vitamin C Serum", sold: 342, revenue: 6840000, resellers: 23 },
    { name: "Anti-Aging Moisturizer", sold: 287, revenue: 5740000, resellers: 19 },
    { name: "Sunscreen SPF 50", sold: 251, revenue: 3765000, resellers: 16 },
    { name: "Cleansing Foam", sold: 198, revenue: 2970000, resellers: 14 },
    { name: "Night Repair Cream", sold: 176, revenue: 4400000, resellers: 12 }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Brand Analytics</h1>
        <p className="text-muted-foreground">
          Track your brand performance and partner network insights.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Performing Resellers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performing Resellers
            </CardTitle>
            <CardDescription>Partners with highest sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topResellers.map((reseller, index) => (
                <div key={reseller.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{reseller.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {reseller.orders} orders • {formatCurrency(reseller.commission)} commission
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(reseller.revenue)}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Best Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Best Selling Products
            </CardTitle>
            <CardDescription>Products with highest sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.sold} sold • {product.resellers} resellers
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(product.revenue)}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>By product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Skincare", percentage: 45, revenue: 5602500 },
                { category: "Beauty", percentage: 30, revenue: 3735000 },
                { category: "Wellness", percentage: 15, revenue: 1867500 },
                { category: "Accessories", percentage: 10, revenue: 1245000 }
              ].map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-blue-600 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(item.revenue)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission Payouts</CardTitle>
            <CardDescription>Monthly commission distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: "January", amount: 2450000, resellers: 42 },
                { month: "February", amount: 2680000, resellers: 44 },
                { month: "March", amount: 2890000, resellers: 47 },
                { month: "April", amount: 3120000, resellers: 47 }
              ].map((item) => (
                <div key={item.month} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.month}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.resellers} resellers
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(item.amount)}</p>
                    <p className="text-xs text-muted-foreground">Paid out</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: "Partner Growth", value: "+23%", description: "New resellers this quarter" },
                { metric: "Avg Order Value", value: formatCurrency(285000), description: "Per reseller order" },
                { metric: "Retention Rate", value: "94%", description: "Active partner retention" },
                { metric: "Product Adoption", value: "8.2", description: "Avg products per reseller" }
              ].map((item) => (
                <div key={item.metric} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.metric}</span>
                    <span className="text-sm font-bold text-primary">{item.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Performance</CardTitle>
          <CardDescription>Revenue and orders over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between gap-4">
            {[
              { month: "Nov", revenue: 8500000, orders: 420 },
              { month: "Dec", revenue: 9200000, orders: 485 },
              { month: "Jan", revenue: 10100000, orders: 532 },
              { month: "Feb", revenue: 10800000, orders: 578 },
              { month: "Mar", revenue: 11600000, orders: 634 },
              { month: "Apr", revenue: 12450000, orders: 689 }
            ].map((data) => (
              <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex flex-col gap-1">
                  <div 
                    className="bg-blue-600 rounded-t w-full"
                    style={{ height: `${(data.revenue / 12450000) * 200}px` }}
                  />
                  <div 
                    className="bg-blue-300 rounded-b w-full"
                    style={{ height: `${(data.orders / 689) * 60}px` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{data.month}</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(data.revenue / 1000000)}M</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded" />
              <span>Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-300 rounded" />
              <span>Orders</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
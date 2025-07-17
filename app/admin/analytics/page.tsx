"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  Eye,
  Users,
  DollarSign
} from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/utils/formatters"

export default function AnalyticsPage() {

  const analyticsData = [
    {
      title: "Page Views",
      value: "2,847",
      change: "+12.5%",
      icon: Eye,
      description: "Total bio-link visits this month"
    },
    {
      title: "Unique Visitors",
      value: "1,924",
      change: "+8.3%", 
      icon: Users,
      description: "Individual users who visited"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      icon: TrendingUp,
      description: "Visitors who made purchases"
    },
    {
      title: "Revenue per Visit",
      value: formatCurrency(15420),
      change: "+15.2%",
      icon: DollarSign,
      description: "Average revenue per visitor"
    }
  ]

  const topProducts = [
    { name: "Serum Vitamin C", views: 342, sales: 28, revenue: 1540000 },
    { name: "Moisturizer Anti-Aging", views: 287, sales: 21, revenue: 1260000 },
    { name: "Sunscreen SPF 50", views: 251, sales: 19, revenue: 950000 },
    { name: "Cleansing Foam", views: 198, sales: 15, revenue: 675000 },
    { name: "Night Cream", views: 176, sales: 12, revenue: 480000 }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Track your store performance and customer insights.
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
        {/* Top Performing Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Products with highest engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.views} views • {product.sales} sales
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

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: "Instagram", percentage: 45, visitors: 1281 },
                { source: "TikTok", percentage: 28, visitors: 798 },
                { source: "Direct Link", percentage: 15, visitors: 427 },
                { source: "WhatsApp", percentage: 8, visitors: 228 },
                { source: "Other", percentage: 4, visitors: 114 }
              ].map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{source.source}</span>
                    <span className="text-muted-foreground">{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatNumber(source.visitors)} visitors
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time-based Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Activity</CardTitle>
          <CardDescription>Visitor activity over the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between gap-2">
            {[
              { day: "Mon", views: 245, sales: 12 },
              { day: "Tue", views: 289, sales: 15 },
              { day: "Wed", views: 198, sales: 8 },
              { day: "Thu", views: 356, sales: 22 },
              { day: "Fri", views: 412, sales: 28 },
              { day: "Sat", views: 387, sales: 25 },
              { day: "Sun", views: 298, sales: 18 }
            ].map((data) => (
              <div key={data.day} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex flex-col gap-1">
                  <div 
                    className="bg-primary rounded-t w-full"
                    style={{ height: `${(data.views / 412) * 200}px` }}
                  />
                  <div 
                    className="bg-primary/40 rounded-b w-full"
                    style={{ height: `${(data.sales / 28) * 50}px` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{data.day}</p>
                  <p className="text-xs text-muted-foreground">{data.views}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded" />
              <span>Page Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary/40 rounded" />
              <span>Sales</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DollarSign, 
  Download,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import { formatCurrency } from "@/lib/utils/formatters"
import { format } from "date-fns"

// Mock payout data
const mockPayouts = [
  {
    id: "1",
    amount: 250000,
    status: "completed",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ordersCount: 5,
    bankAccount: "BCA ****7890"
  },
  {
    id: "2",
    amount: 350000,
    status: "completed",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    ordersCount: 8,
    bankAccount: "BCA ****7890"
  },
  {
    id: "3",
    amount: 175000,
    status: "pending",
    date: new Date(),
    ordersCount: 4,
    bankAccount: "BCA ****7890"
  }
]

export default function AdminPayoutsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const stats = {
    totalEarnings: 775000,
    pendingPayout: 175000,
    lastPayout: 250000,
    nextPayoutDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }

  const monthlyEarnings = [
    { month: "Jan", amount: 450000 },
    { month: "Feb", amount: 525000 },
    { month: "Mar", amount: 775000 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payouts</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Statement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.pendingPayout)}</div>
            <p className="text-xs text-muted-foreground">
              Processing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Payout</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.lastPayout)}</div>
            <p className="text-xs text-muted-foreground">
              7 days ago
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {format(stats.nextPayoutDate, "dd MMM")}
            </div>
            <p className="text-xs text-muted-foreground">
              In 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Payout History</TabsTrigger>
              <TabsTrigger value="settings">Bank Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab}>
            <TabsContent value="overview" className="space-y-6">
              {/* Earnings Chart */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Monthly Earnings</h3>
                <div className="space-y-4">
                  {monthlyEarnings.map((month) => (
                    <div key={month.month} className="flex items-center gap-4">
                      <span className="w-12 text-sm text-muted-foreground">{month.month}</span>
                      <div className="flex-1">
                        <div className="h-8 bg-muted rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${(month.amount / 800000) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium">{formatCurrency(month.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payout Schedule */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Payout Schedule</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm">
                        Payouts are processed automatically every <strong>Monday</strong>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Minimum payout amount: {formatCurrency(100000)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Funds typically arrive within 1-2 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {mockPayouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      payout.status === "completed" ? "bg-green-100 dark:bg-green-900/20" : "bg-yellow-100 dark:bg-yellow-900/20"
                    }`}>
                      {payout.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{formatCurrency(payout.amount)}</p>
                      <p className="text-sm text-muted-foreground">
                        {payout.ordersCount} orders • {format(payout.date, "dd MMM yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{payout.bankAccount}</span>
                    <Badge variant={payout.status === "completed" ? "default" : "secondary"}>
                      {payout.status === "completed" ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Bank Account</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">BCA</p>
                        <p className="text-sm text-muted-foreground">****7890</p>
                        <p className="text-sm text-muted-foreground">Sarah Kusuma</p>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Change Bank Account
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Tax Information</h3>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Add your tax information to ensure compliance with local regulations.
                    </p>
                    <Button variant="outline">Add Tax Info</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
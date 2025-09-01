'use client'

import { useState } from 'react'
import { Wallet, TrendingUp, ArrowUpRight, Clock, DollarSign, CreditCard } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { formatRupiah } from '@/lib/utils'
import { useWalletStore } from '@/lib/stores/useWalletStore'
import { PayoutRequestModal } from '@/components/features/wallet/PayoutRequestModal'
import { TransactionHistory } from '@/components/features/wallet/TransactionHistory'

export default function WalletPage() {
  const [showPayoutModal, setShowPayoutModal] = useState(false)
  const { 
    walletInfo, 
    transactions, 
    payoutRequests,
    calculateAvailableBalance 
  } = useWalletStore()

  const availableBalance = calculateAvailableBalance()
  const pendingPayouts = payoutRequests.filter(p => p.status === 'pending' || p.status === 'processing')
  const completedPayouts = payoutRequests.filter(p => p.status === 'completed')

  // Calculate statistics
  const totalEarnings = walletInfo?.totalEarnings || 0
  const totalWithdrawn = walletInfo?.totalWithdrawn || 0
  const currentBalance = walletInfo?.balance || 0
  const pendingBalance = walletInfo?.pendingBalance || 0

  // Recent transactions
  const recentTransactions = transactions.slice(0, 10)
  const commissionTransactions = transactions.filter(t => t.type === 'commission')
  const communityTransactions = transactions.filter(t => t.type === 'community_share')
  const referralTransactions = transactions.filter(t => t.type === 'referral')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">Manage your earnings and payouts</p>
        </div>
        <Button onClick={() => setShowPayoutModal(true)} disabled={availableBalance < 50000}>
          <Wallet className="mr-2 h-4 w-4" />
          Request Payout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(currentBalance)}</div>
            <p className="text-xs text-muted-foreground">
              Available: {formatRupiah(availableBalance)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(pendingBalance)}</div>
            <p className="text-xs text-muted-foreground">
              {pendingPayouts.length} pending payouts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(totalWithdrawn)}</div>
            <p className="text-xs text-muted-foreground">
              {completedPayouts.length} successful payouts
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="community">Community Share</TabsTrigger>
          <TabsTrigger value="referral">Referral</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest earning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionHistory transactions={recentTransactions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Earnings</CardTitle>
              <CardDescription>Earnings from product sales</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionHistory transactions={commissionTransactions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Share Earnings</CardTitle>
              <CardDescription>Earnings from community shares and vouchers</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionHistory transactions={communityTransactions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Referral Earnings</CardTitle>
              <CardDescription>Earnings from referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionHistory transactions={referralTransactions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>Your withdrawal requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutRequests.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{formatRupiah(payout.amount)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payout.requestedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        payout.status === 'completed' ? 'default' :
                        payout.status === 'pending' ? 'secondary' :
                        payout.status === 'processing' ? 'outline' :
                        payout.status === 'rejected' ? 'destructive' : 'secondary'
                      }>
                        {payout.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{payout.method}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <PayoutRequestModal 
        isOpen={showPayoutModal} 
        onClose={() => setShowPayoutModal(false)}
        availableBalance={availableBalance}
      />
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Users, Share2, QrCode, TrendingUp, Plus, Eye, DollarSign, UserPlus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatRupiah } from '@/lib/utils'
import { useCommunityStore } from '@/lib/stores/useCommunityStore'
import { useWalletStore } from '@/lib/stores/useWalletStore'
import { VoucherCard } from '@/components/features/community/VoucherCard'
import { CreateVoucherModal } from '@/components/features/community/CreateVoucherModal'
import { ShareStatsCard } from '@/components/features/community/ShareStatsCard'

export default function CommunityPage() {
  const [showCreateVoucherModal, setShowCreateVoucherModal] = useState(false)
  const { 
    communityShares, 
    vouchers, 
    shareTracking,
    calculateCommunityEarnings,
    updateVoucherStatus 
  } = useCommunityStore()
  const { walletInfo } = useWalletStore()

  // Calculate statistics
  const totalShares = communityShares.length
  const totalVouchers = vouchers.length
  const activeVouchers = vouchers.filter(v => v.isActive).length
  const totalCommunityEarnings = calculateCommunityEarnings('current-user-id')
  
  const totalScans = communityShares.reduce((sum, share) => sum + share.totalScans, 0)
  const totalConversions = communityShares.reduce((sum, share) => sum + share.totalConversions, 0)
  const conversionRate = totalScans > 0 ? (totalConversions / totalScans) * 100 : 0

  // Group shares by type
  const qrShares = communityShares.filter(s => s.type === 'qr_voucher')
  const linkShares = communityShares.filter(s => s.type === 'link_share')
  const socialShares = communityShares.filter(s => s.type === 'social_share')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">Manage community shares and vouchers</p>
        </div>
        <Button onClick={() => setShowCreateVoucherModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Voucher
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(totalCommunityEarnings)}</div>
            <p className="text-xs text-muted-foreground">
              From {totalConversions} conversions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShares}</div>
            <p className="text-xs text-muted-foreground">
              {totalScans} total scans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vouchers</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeVouchers}</div>
            <p className="text-xs text-muted-foreground">
              Of {totalVouchers} total vouchers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Click to purchase rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vouchers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
          <TabsTrigger value="qr-shares">QR Shares</TabsTrigger>
          <TabsTrigger value="link-shares">Link Shares</TabsTrigger>
          <TabsTrigger value="social-shares">Social Shares</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="vouchers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vouchers.map((voucher) => (
              <VoucherCard
                key={voucher.id}
                voucher={voucher}
                onToggleStatus={updateVoucherStatus}
                showQR={true}
              />
            ))}
          </div>
          {vouchers.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <QrCode className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No vouchers created yet</p>
                <Button onClick={() => setShowCreateVoucherModal(true)}>
                  Create Your First Voucher
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="qr-shares" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {qrShares.map((share) => (
              <ShareStatsCard key={share.id} share={share} />
            ))}
          </div>
          {qrShares.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No QR code shares yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="link-shares" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {linkShares.map((share) => (
              <ShareStatsCard key={share.id} share={share} />
            ))}
          </div>
          {linkShares.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No link shares yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="social-shares" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {socialShares.map((share) => (
              <ShareStatsCard key={share.id} share={share} />
            ))}
          </div>
          {socialShares.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No social media shares yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Share Performance</CardTitle>
                <CardDescription>Breakdown by share type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">QR Vouchers</span>
                    <span className="font-medium">{qrShares.length} shares</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(qrShares.length / totalShares) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Link Shares</span>
                    <span className="font-medium">{linkShares.length} shares</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(linkShares.length / totalShares) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Social Shares</span>
                    <span className="font-medium">{socialShares.length} shares</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${(socialShares.length / totalShares) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Shares</CardTitle>
                <CardDescription>By conversion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityShares
                    .sort((a, b) => {
                      const aRate = a.totalScans > 0 ? a.totalConversions / a.totalScans : 0
                      const bRate = b.totalScans > 0 ? b.totalConversions / b.totalScans : 0
                      return bRate - aRate
                    })
                    .slice(0, 5)
                    .map((share) => {
                      const rate = share.totalScans > 0 ? (share.totalConversions / share.totalScans) * 100 : 0
                      return (
                        <div key={share.id} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {share.type.replace(/_/g, ' ').toUpperCase()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {share.totalScans} scans • {share.totalConversions} conversions
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{rate.toFixed(1)}%</p>
                            <p className="text-xs text-muted-foreground">
                              {formatRupiah(share.totalEarnings)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <CreateVoucherModal
        isOpen={showCreateVoucherModal}
        onClose={() => setShowCreateVoucherModal(false)}
      />
    </div>
  )
}
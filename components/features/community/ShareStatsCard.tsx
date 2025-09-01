'use client'

import { Eye, ShoppingBag, TrendingUp, Share2, QrCode, Link } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatRupiah } from '@/lib/utils'
import { CommunityShare } from '@/types/user'

interface ShareStatsCardProps {
  share: CommunityShare
}

export function ShareStatsCard({ share }: ShareStatsCardProps) {
  const conversionRate = share.totalScans > 0 
    ? (share.totalConversions / share.totalScans) * 100 
    : 0

  const getShareIcon = () => {
    switch (share.type) {
      case 'qr_voucher':
        return <QrCode className="h-4 w-4" />
      case 'link_share':
        return <Link className="h-4 w-4" />
      case 'social_share':
        return <Share2 className="h-4 w-4" />
      default:
        return <Share2 className="h-4 w-4" />
    }
  }

  const getShareTypeBadge = () => {
    const types = {
      qr_voucher: { label: 'QR Voucher', variant: 'default' as const },
      link_share: { label: 'Link Share', variant: 'secondary' as const },
      social_share: { label: 'Social Share', variant: 'outline' as const }
    }
    const type = types[share.type]
    return <Badge variant={type.variant}>{type.label}</Badge>
  }

  const isActive = !share.expiresAt || new Date() < new Date(share.expiresAt)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {getShareIcon()}
              {share.referralCode.substring(0, 8)}...
            </CardTitle>
            <CardDescription>
              Created {new Date(share.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {getShareTypeBadge()}
            {isActive ? (
              <Badge variant="outline" className="text-green-600">Active</Badge>
            ) : (
              <Badge variant="destructive">Expired</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {share.metadata?.platform && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Platform</span>
            <span className="font-medium capitalize">{share.metadata.platform}</span>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Scans/Clicks
            </p>
            <p className="font-medium text-lg">{share.totalScans}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-muted-foreground flex items-center gap-1">
              <ShoppingBag className="h-3 w-3" />
              Conversions
            </p>
            <p className="font-medium text-lg">{share.totalConversions}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Conversion Rate
            </span>
            <span className="font-medium">{conversionRate.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${Math.min(conversionRate, 100)}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-muted-foreground">Total Earnings</span>
          <span className="font-semibold text-green-600">
            {formatRupiah(share.totalEarnings)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
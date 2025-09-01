'use client'

import { useState } from 'react'
import { QrCode, Calendar, Users, Percent, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { QRCodeGenerator } from './QRCodeGenerator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatRupiah } from '@/lib/utils'

interface VoucherCardProps {
  voucher: {
    id: string
    code: string
    name: string
    description: string
    type: 'event' | 'product' | 'discount'
    isActive: boolean
    maxRedemptions?: number
    currentRedemptions: number
    commissionPercentage: number
    validFrom: Date
    validUntil?: Date
    qrCode: string
    communityName: string
    productName?: string
  }
  onToggleStatus?: (voucherId: string, isActive: boolean) => void
  showQR?: boolean
}

export function VoucherCard({ voucher, onToggleStatus, showQR = false }: VoucherCardProps) {
  const [showQRDialog, setShowQRDialog] = useState(false)
  
  const isExpired = voucher.validUntil && new Date() > new Date(voucher.validUntil)
  const isUpcoming = new Date() < new Date(voucher.validFrom)
  const redemptionProgress = voucher.maxRedemptions 
    ? (voucher.currentRedemptions / voucher.maxRedemptions) * 100
    : 0

  const getStatusBadge = () => {
    if (!voucher.isActive) return <Badge variant="secondary">Inactive</Badge>
    if (isExpired) return <Badge variant="destructive">Expired</Badge>
    if (isUpcoming) return <Badge variant="outline">Upcoming</Badge>
    if (voucher.maxRedemptions && voucher.currentRedemptions >= voucher.maxRedemptions) {
      return <Badge variant="secondary">Fully Redeemed</Badge>
    }
    return <Badge variant="default">Active</Badge>
  }

  const getTypeBadge = () => {
    const types = {
      event: { label: 'Event', variant: 'default' as const },
      product: { label: 'Product', variant: 'secondary' as const },
      discount: { label: 'Discount', variant: 'outline' as const }
    }
    const type = types[voucher.type]
    return <Badge variant={type.variant}>{type.label}</Badge>
  }

  return (
    <>
      <Card className="relative overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-lg">{voucher.name}</CardTitle>
              <CardDescription>{voucher.description}</CardDescription>
            </div>
            <div className="flex gap-2">
              {getTypeBadge()}
              {getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Code</span>
            <span className="font-mono font-semibold">{voucher.code}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Community</span>
            <span className="font-medium">{voucher.communityName}</span>
          </div>
          
          {voucher.productName && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Product</span>
              <span className="font-medium">{voucher.productName}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Percent className="h-3 w-3" />
              Commission
            </span>
            <span className="font-medium">{voucher.commissionPercentage}%</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              Redemptions
            </span>
            <span className="font-medium">
              {voucher.currentRedemptions}
              {voucher.maxRedemptions && ` / ${voucher.maxRedemptions}`}
            </span>
          </div>
          
          {voucher.maxRedemptions && (
            <div className="space-y-1">
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${Math.min(redemptionProgress, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right">
                {redemptionProgress.toFixed(0)}% redeemed
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Valid Period
            </span>
            <span className="font-medium text-xs">
              {new Date(voucher.validFrom).toLocaleDateString()}
              {voucher.validUntil && ` - ${new Date(voucher.validUntil).toLocaleDateString()}`}
            </span>
          </div>
          
          <div className="flex gap-2 pt-2">
            {showQR && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setShowQRDialog(true)}
              >
                <QrCode className="h-4 w-4 mr-2" />
                View QR
              </Button>
            )}
            
            {onToggleStatus && (
              <Button
                variant={voucher.isActive ? 'destructive' : 'default'}
                size="sm"
                className="flex-1"
                onClick={() => onToggleStatus(voucher.id, !voucher.isActive)}
                disabled={isExpired}
              >
                {voucher.isActive ? (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{voucher.name}</DialogTitle>
          </DialogHeader>
          <QRCodeGenerator
            value={voucher.qrCode}
            title={`Voucher: ${voucher.code}`}
            description={`Scan to redeem this ${voucher.type} voucher`}
            size={320}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
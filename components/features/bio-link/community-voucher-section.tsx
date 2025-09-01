'use client'

import { useState, useEffect } from 'react'
import { QrCode, Users, Gift, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { QRCodeGenerator } from '@/components/features/community/QRCodeGenerator'
import { useCommunityStore } from '@/lib/stores/useCommunityStore'

interface CommunityVoucherSectionProps {
  resellerId: string
}

export function CommunityVoucherSection({ resellerId }: CommunityVoucherSectionProps) {
  const [showQRDialog, setShowQRDialog] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState<{
    id: string
    code: string
    name: string
    description: string
    type: string
    communityId: string
    communityName: string
    commissionPercentage: number
    validFrom: Date
    validUntil?: Date | string
    createdBy: string
    isActive: boolean
    maxRedemptions?: number
    currentRedemptions: number
  } | null>(null)
  const { vouchers, createVoucher } = useCommunityStore()
  
  // Get or create a demo community voucher
  useEffect(() => {
    const existingVouchers = vouchers.filter(v => v.createdBy === resellerId)
    
    if (existingVouchers.length === 0) {
      // Create a demo community voucher
      createVoucher({
        code: 'COMMUNITY2024',
        name: 'Jakarta Beauty Community Special',
        description: 'Exclusive discount for Jakarta Beauty Community members. Show this at our events!',
        type: 'event',
        communityId: 'jakarta_beauty_community',
        communityName: 'Jakarta Beauty Community',
        commissionPercentage: 15,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        createdBy: resellerId,
        isActive: true
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resellerId, vouchers.length])
  
  const activeVouchers = vouchers.filter(v => 
    v.createdBy === resellerId && 
    v.isActive &&
    (!v.validUntil || new Date() < new Date(v.validUntil))
  ).slice(0, 3) // Show max 3 vouchers
  
  if (activeVouchers.length === 0) {
    return null
  }
  
  const handleShowQR = (voucher: {
    id: string
    code: string
    name: string
    description: string
    type: string
    communityId: string
    communityName: string
    commissionPercentage: number
    validFrom: Date
    validUntil?: Date | string
    createdBy: string
    isActive: boolean
    maxRedemptions?: number
    currentRedemptions: number
  }) => {
    setSelectedVoucher(voucher)
    setShowQRDialog(true)
  }
  
  return (
    <>
      <div className="py-6 border-t">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Community Specials</h2>
        </div>
        
        <div className="space-y-3">
          {activeVouchers.map((voucher) => (
            <Card key={voucher.id} className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-4 w-4 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {voucher.type === 'event' ? 'Event' : 'Special Offer'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{voucher.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {voucher.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs">
                      <span className="text-green-600 font-medium">
                        {voucher.commissionPercentage}% Community Bonus
                      </span>
                      <span className="text-muted-foreground">
                        Code: {voucher.code}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleShowQR(voucher)}
                    className="ml-2"
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
                
                {voucher.maxRedemptions && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">
                        {voucher.currentRedemptions}/{voucher.maxRedemptions} claimed
                      </span>
                      <span className="text-muted-foreground">
                        {Math.round((voucher.currentRedemptions / voucher.maxRedemptions) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ 
                          width: `${Math.min((voucher.currentRedemptions / voucher.maxRedemptions) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-muted-foreground">
                    Valid until {new Date(voucher.validUntil || '').toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7 text-primary"
                    onClick={() => handleShowQR(voucher)}
                  >
                    Scan QR
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="mt-4 bg-gray-50 border-dashed">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Users className="h-8 w-8 mx-auto text-primary" />
              <p className="text-sm font-medium">Join Our Community</p>
              <p className="text-xs text-muted-foreground">
                Get exclusive vouchers and earn rewards by sharing with your network
              </p>
              <Button size="sm" className="mt-3">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedVoucher?.name}</DialogTitle>
          </DialogHeader>
          {selectedVoucher && (
            <QRCodeGenerator
              value={`${typeof window !== 'undefined' ? window.location.origin : ''}/scan/${selectedVoucher.code}`}
              title={`Voucher: ${selectedVoucher.code}`}
              description="Scan this QR code to redeem the voucher"
              size={320}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}